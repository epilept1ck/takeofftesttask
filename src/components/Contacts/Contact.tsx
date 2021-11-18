import React, {FC, useState} from "react";
import {observer} from "mobx-react-lite";
import {Card, Col} from "antd";
import {IContact} from "../../store/types";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {contactsStore} from "../../store/contacts";
import {ContactModal} from "./ContactModal";

const s = require('./style.module.scss')

interface IContactProps {
    contact: IContact
}

export const Contact: FC<IContactProps> = observer(({
                                                        contact,
                                                    }) => {
    const {id, name, group, phone, userId} = contact
    const {removeContact} = contactsStore
    const [contactModalActive, setContactModalActive] = useState<boolean>(false)

    return (
        <Col span={4} style={{marginBottom: 12}}>
            <Card title={name} actions={[
                <div onClick={() => setContactModalActive(true)}>
                    <EditOutlined/>
                </div>,
                <div onClick={() => removeContact(id)}>
                    <DeleteOutlined/>
                </div>,
            ]} bordered>
                <div>{group.name}</div>
                <div>{phone}</div>
            </Card>

            <ContactModal open={contactModalActive}
                          closeHandler={() => setContactModalActive(false)}
                          title={`Редактировать контакт ${contact.name}`}
                          edit
                          contact={contact}
            />

        </Col>
    )
})
