export type TEnumItem = {
    id: number
    name: string
}

export interface IModal {
    open: boolean
    closeHandler: any
    title: string
}
