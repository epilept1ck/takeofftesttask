import {IUser} from "./types";
import {makeAutoObservable, runInAction} from "mobx";
import {keys} from "./api/key";
import {TLoginBody} from "./api/user/types";
import {instance} from "./api";
import {ROUTE_PATHS} from "../routers/paths.main";

function loginRedirect() {
    if (!window.location.pathname.includes('/login')) {
        window.location.pathname = '/login'
    }
}

class User {
    userInfo: IUser | null = null

    loadings = {
        userInfoLoading: false,
        appLoading: false,
        loginLoading: false,
    }


    constructor() {
        makeAutoObservable(this)
    }

    initApp = async () => {
        runInAction(() => {
            this.loadings = {
                ...this.loadings,
                appLoading: true
            }
        })
        const main = keys.main
        const isAuth = localStorage.getItem(main)
        console.log(isAuth)
        if (!isAuth) {
            loginRedirect();
            runInAction(() => {
                this.loadings = {
                    ...this.loadings,
                    appLoading: false
                }
            })
            return
        }
        await this.getUserInfo()
            .finally(() => {
                runInAction(() => {
                    this.loadings = {
                        ...this.loadings,
                        appLoading: false
                    }
                })
            })
    }

    login = async (body: TLoginBody) => {
        runInAction(() => {
            this.loadings = {
                ...this.loadings,
                loginLoading: true
            }
        })
        await instance().open().login(body)
            .then(res => {
                console.log(res)
                if (res.data?.length === 0) {
                    throw new Error("Пользователь не найден!")
                } else {
                    const main = keys.main
                    localStorage.setItem(main, res.data[0]?.id)
                    window.location.pathname = ROUTE_PATHS.contacts
                }
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                runInAction(() => {
                    this.loadings = {
                        ...this.loadings,
                        loginLoading: false
                    }
                })
            })
    }

    signUp = async (body: IUser) => {
        await instance().open().signUp(body)
            .then(() => {
                this.login({login: body.login, password: body.password})
            })
            .catch(err => {
                console.log(err)
            })
    }

    getUserInfo = async () => {
        runInAction(() => {
            this.loadings = {
                ...this.loadings,
                userInfoLoading: true
            }
        })
        await instance().close().getUserInfo()
            .then(res => {
                if (!res.data) {
                    throw new Error("Произошла ошибка1")
                }
                runInAction(() => {
                    this.userInfo = res.data[0]
                })
            })
            .catch(err => {
                console.log(err)
            })

            .finally(() => {
                runInAction(() => {
                    this.loadings = {
                        ...this.loadings,
                        userInfoLoading: false
                    }
                })
            })
    }
}

export const userStore = new User()
