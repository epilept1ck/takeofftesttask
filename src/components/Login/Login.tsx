import React, {FC, useEffect, useState} from "react";
import {useKeyPress} from "../../hooks/useKeyPress";
import {ROUTE_PATHS} from "../../routers/paths.main";
import {Input, Button} from "antd";
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {userStore} from "../../store/user";

const s = require('./style.module.scss')

export const LoginPage: FC = observer(({}) => {
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const loginHandler = () => {
        userStore.login({
            login,
            password,
        })
    }

    const enterPress = useKeyPress('Enter')

    useEffect(() => {
        if (enterPress) {
            loginHandler()
        }
    }, [enterPress])

    return (
        <div className={s.login_wrap}>
            <div className={s.login_form}>
                <div className={s.title}>Добро пожаловать!</div>

                <div className={s.field}>
                    <Input value={login}
                           onChange={event => setLogin(event.target.value)}
                           placeholder={"Введите логин"}
                    />
                </div>
                <div className={s.field}>
                    <Input value={password}
                           onChange={event => setPassword(event.target.value)}
                           type={'password'}
                           placeholder={"Введите пароль"}
                    />
                </div>
                <Button onClick={loginHandler}
                        className={s.btn}
                        type={"primary"}
                        size={"large"}>
                        Войти
                </Button>

                <Link to={ROUTE_PATHS.signUp}>
                    <div className={s.signUp}>Регистрация</div>
                </Link>
            </div>
        </div>
    )
})
