import {instanceAxiosClose, instanceAxiosOpen} from "../instance.axios";
import {IUser} from "../../types";
import {TLoginBody} from "./types";
import {paths} from "../paths";

export const userRequests = () => ({
    open: () => ({
        signUp: (body: IUser) => {
            return instanceAxiosOpen().post(paths.users, body)
        },
        login: (body: TLoginBody) => {
            const {login, password} = body
            const query = `?login=${login}&password=${password}`
            return instanceAxiosOpen().get(paths.users + query)
        }
    }),
    close: (id: string | null) => ({
        getUserInfo: () => {
            console.log(id)
            const query = `?id=${id}`
            return instanceAxiosClose(id).get(paths.users + query)
        }
    }),
})
