import {IContact} from "./types";
import {makeAutoObservable, runInAction} from "mobx";
import {instance} from "./api";

class Contacts {
    contactsList: IContact[] = []
    contactsListLoading: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    getContactsList = async () => {
        runInAction(() => this.contactsListLoading = true)
        await instance().close().getContactsList()
            .then(res => {
                runInAction(() => {
                    this.contactsList = res.data || []
                })
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                runInAction(() => this.contactsListLoading = false)
            })
    }

    addContact = async (body: IContact) => {
        return instance().close().addContact(body)
            .then(() => {
                runInAction(() => {
                    this.contactsList = [...this.contactsList, body]
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    editContact = async (body: IContact) => {
        return instance().close().editContact(body)
            .then(() => {
                runInAction(() => {
                    this.contactsList = this.contactsList.map(item => {
                        if (item.id === body.id) {
                            return {
                                ...item,
                                ...body,
                            }
                        }
                        return item
                    })
                })
            })
    }

    removeContact = async (contactId: number) => {
        return instance().close().removeContact(contactId)
            .then(() => {
                this.contactsList = this.contactsList.filter(item => item.id !== contactId)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const contactsStore = new Contacts()
