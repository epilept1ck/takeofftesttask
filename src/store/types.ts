import {TEnumItem} from "../globalTypes";

export interface IUser {
    id: number
    name: string
    login: string
    password: string
}

export interface IContact {
    id: number
    name: string
    phone: string
    group: TEnumItem
    userId: number
}