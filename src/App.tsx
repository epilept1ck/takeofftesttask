import React, {useEffect} from 'react';
import {RouterIndex} from './routers/RouterIndex';
import {observer} from "mobx-react-lite";
import {userStore} from "./store/user";

export const App = observer(({}) => {
    const {initApp} = userStore
    useEffect(() => {
        initApp()
    },[ ])
    return (
        <RouterIndex/>
    )
})
