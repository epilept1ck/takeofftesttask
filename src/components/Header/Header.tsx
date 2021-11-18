import React from "react";
import {observer} from "mobx-react-lite";
import {userStore} from "../../store/user";
import {Button} from "antd";
import {ROUTE_PATHS} from "../../routers/paths.main";
import {keys} from "../../store/api/key";

const s = require('./style.module.scss')

export const Header = observer(({}) => {
    const {userInfo} = userStore
    return (
        <nav className={s.navbar}>
            <div className={s.logo}>
                TAKEOFFSTAFF
            </div>
            <div className={s.navbar_actions}>
                <div className={s.user} style={{color: '#fff'}}>{userInfo?.name}</div>
                <Button onClick={() => {
                    localStorage.removeItem(keys.main)
                    window.location.pathname = ROUTE_PATHS.login
                }}>
                    Выйти
                </Button>
            </div>
        </nav>
    )
})
