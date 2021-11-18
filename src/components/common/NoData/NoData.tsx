import React, {FC} from "react";
import {NoDataIcon} from "../../../icons/icon";

const s = require('./style.module.scss')

interface INoDataProps {
    label?: string
}

export const NoData: FC<INoDataProps> = ({
                                             label = 'Нет данных'
                                         }) => {
    return (
        <div className={s.nodata}>
            <div className={s.nodata_icon}>
                <NoDataIcon />
            </div>
            <div className={s.nodata_label}>
                {label}
            </div>
        </div>
    )
}
