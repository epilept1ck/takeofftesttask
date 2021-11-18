import {keys} from "./key";
import {userRequests} from "./user/user";
import {contactsRequests} from "./contacts/contacts";

export const instance = () => {
    const mainKey = keys.main
    const id = localStorage.getItem(mainKey)

    return {
        open: () => ({
            ...userRequests().open(),
            ...contactsRequests().open() 
        }),
        close: () => ({
            ...userRequests().close(id),
            ...contactsRequests().close(id)
        }),
    }
}
