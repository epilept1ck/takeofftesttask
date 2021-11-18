import React, {FC, useState} from "react";
import {observer} from "mobx-react-lite";
import {Button, Input} from "antd";
import {ROUTE_PATHS} from "../../routers/paths.main";
import {Link} from "react-router-dom";
import {userStore} from "../../store/user";
import {getRandomNumber} from "../../helpers/numberHelpers";

const s = require('./style.module.scss')

export const SignUp: FC = observer(({}) => {
    const {signUp} = userStore

    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [name, setName] = useState<string>('')

    const signUpHandler = () => {
        signUp({
            id: getRandomNumber(10000),
            name,
            login,
            password,
        })
    }

    return (
        <div className={s.login_wrap}>
            <div className={s.login_form}>
                <div className={s.title}>Регистрация</div>
                <div className={s.field}>
                    <Input value={name}
                           onChange={event => setName(event.target.value)}
                           placeholder={"Ваше имя"}
                    />
                </div>
                <div className={s.field}>
                    <Input value={login}
                           onChange={event => setLogin(event.target.value)}
                           placeholder={"Ваш логин"}
                    />
                </div>
                <div className={s.field}>
                    <Input value={password}
                           onChange={event => setPassword(event.target.value)}
                           placeholder={"Пароль"}
                    />
                </div>

                <Button onClick={signUpHandler}
                        type={"primary"}
                        className={s.btn}
                        size={"large"}>
                    Зарегистрироваться!
                </Button>

                <Button type={"ghost"}
                        size={"middle"}>
                    <Link to={ROUTE_PATHS.login}>
                        Назад
                    </Link>
                </Button>

            </div>
        </div>
    )
})
