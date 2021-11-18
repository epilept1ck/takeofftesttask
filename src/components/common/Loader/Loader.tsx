import React from "react";
import clsx from "clsx";

const s = require('./style.module.scss')

interface ILoaderProps {
    label?: string
    fullScreen?: boolean
}

export const Loader: React.FC<ILoaderProps> = ({
                                                   label,
                                                   fullScreen = false,
                                               }) => {
    return (
        <div className={clsx(s.loader, fullScreen && s.loader_full_screen)}>
            <div className={s.loader_lines}>
                <div className={s.loader_item}/>
                <div className={s.loader_item}/>
                <div className={s.loader_item}/>
            </div>
            {label && <div className={s.loader_label}>{label}</div>}
        </div>
    )
}

