import React, {FC, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {contactsStore} from "../../store/contacts";
import {Header} from "../Header/Header";
import {Input, Row, Tooltip} from "antd";
import {Loader} from "../common/Loader/Loader";
import {Contact} from "./Contact";
import {NoData} from "../common/NoData/NoData";
import {UserAddOutlined} from "@ant-design/icons";
import {ContactModal} from "./ContactModal";
import {IContact} from "../../store/types";
import {filterPhone} from "../../helpers/inputHelpers";

const s = require('./style.module.scss')

export const ContactsPage: FC = observer(({}) => {
        const {contactsList, contactsListLoading} = contactsStore

        useEffect(() => {
            contactsStore.getContactsList()
        }, [])

        const [searchText, setSearchText] = useState<string>("")
        const [contactModalActive, setContactModalActive] = useState<boolean>(false)

        // тк сервера нет, решил использовать локальный стэйт
        const [filteredList, setFilteredList] = useState<IContact[]>(contactsList)
        useEffect(() => {
            setFilteredList(contactsList)
        }, [contactsList])
        useEffect(() => {
            setFilteredList(contactsList.filter(contact => {
                const lowerSearchText = searchText?.toLocaleLowerCase()
                return contact?.name.toLocaleLowerCase().includes(lowerSearchText)
                    || filterPhone(contact?.phone).toLocaleLowerCase().includes(lowerSearchText)
                    || contact?.group.name.toLocaleLowerCase().includes(lowerSearchText)
            }))
        }, [searchText])

        return (
            <div className={s.root}>
                <Header/>
                <div className={s.title}>Ваши контакты!</div>
                <div className={s.search_field}>
                    <Input value={searchText}
                           onChange={event => setSearchText(event.target.value)}
                           placeholder={"Введите имя, группу или телефонный номер..."}
                    />
                </div>
                <div className={s.contacts_list}>
                    {contactsListLoading
                        ? <Loader/>
                        : <Row gutter={16}>
                            {filteredList && filteredList.length > 0 && filteredList.map(item => {
                                return <Contact key={item.id} contact={item}/>
                            }) || <NoData/>}
                            <Tooltip placement={'top'} title={"Добавить контакт"}>
                                <div className={s.add_icon}
                                     onClick={() => setContactModalActive(true)}
                                >
                                    <UserAddOutlined/>
                                </div>
                            </Tooltip>
                        </Row>}
                </div>

                <ContactModal open={contactModalActive}
                              closeHandler={() => setContactModalActive(false)}
                              title={`Добавить новый контакт`}
                              edit={false}
                />

            </div>
        )
    }
)
