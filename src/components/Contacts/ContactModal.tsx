import React, {FC, useState} from "react";
import {IModal, TEnumItem} from "../../globalTypes";
import {IContact} from "../../store/types";
import {observer} from "mobx-react-lite";
import {Input, Modal, Select} from "antd";
import {contactsStore} from "../../store/contacts";
import {getRandomNumber} from "../../helpers/numberHelpers";
import {keys} from "../../store/api/key";
import {contactGroupsMock} from "./mock";
import {formatPhoneByPattern} from "../../helpers/inputHelpers";

const {Option} = Select

const s = require('./style.module.scss')

interface IContactModalProps extends IModal {
    edit: boolean
    contact?: IContact
}

export const ContactModal: FC<IContactModalProps> = observer(({
                                                                  open,
                                                                  closeHandler,
                                                                  title,
                                                                  edit,
                                                                  contact,
                                                              }) => {
    const {addContact, editContact} = contactsStore

    const [name, setName] = useState<string>(contact?.name || "")
    const [phone, setPhone] = useState<string>(contact?.phone || "")
    const [groupId, setGroupId] = useState<number>(contact?.group.id || 1)

    const main = keys.main

    const addContactHandler = () => {
        const userId = localStorage.getItem(main) || 0
        addContact({
            id: getRandomNumber(10000),
            group: contactGroupsMock.find(group => group.id === groupId)!,
            phone,
            name,
            userId: +userId,
        })
    }
    const editContactHandler = () => {
        const userId = localStorage.getItem(main) || 0
        editContact({
            id: contact!.id,
            group: contactGroupsMock.find(group => group.id === groupId)!,
            name,
            phone,
            userId: +userId,
        })
    }

    return (
        <Modal visible={open}
               title={title}
               onCancel={closeHandler}
               onOk={() => {
                   edit
                       ? editContactHandler()
                       : addContactHandler()
               }}
        >
            <div className={s.field}>
                <Input value={name}
                       onChange={event => setName(event.target.value)}
                       placeholder={"Введите имя контакта"}
                />
            </div>

            <div className={s.field}>
                <Select value={groupId}
                        onChange={setGroupId}
                        placeholder={"Выберите группу контакта"}
                        style={{width: '100%'}} size={"large"} showArrow={false}>
                    {contactGroupsMock.map(group => <Option key={group.id} value={group.id}>{group.name}</Option>)}
                </Select>
            </div>

            <div className={s.field}>
                <Input value={phone}
                       onChange={event => setPhone(formatPhoneByPattern(event.target.value))}
                       placeholder={"Введите телефон контакта"}
                />
            </div>

        </Modal>
    )
})
