import {instanceAxiosClose} from "../instance.axios";
import {paths} from "../paths";
import {IContact} from "../../types";

export const contactsRequests = () => ({
    open: () => ({}),
    close: (id: string | null) => ({
        getContactsList: () => {
            const query = `?userId=${id}`
            return instanceAxiosClose(id).get(paths.contacts + query)
        },
        addContact: (body: IContact) => {
            return instanceAxiosClose(id).post(paths.contacts, body)
        },
        editContact: (body: IContact) => {
            return instanceAxiosClose(id).put(paths.contacts + `/${body.id}`, body)
        },
        removeContact: (contactId: number) => {
            return instanceAxiosClose(id).delete(paths.contacts + `/${contactId}`)
        },
    })
})
