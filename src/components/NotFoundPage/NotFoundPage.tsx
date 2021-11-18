import React, {FC} from "react";
import {ErrorIcon} from "../../icons/icon";

const s = require('./style.module.scss')

export const NotFoundPage: FC = ({}) => {
    return (
        <div className={s.page}>
            <div>
                <ErrorIcon/>
            </div>
            <div>
                <h1>404</h1>
                <h2>Страница не найдена!</h2>
            </div>
        </div>
    )
}