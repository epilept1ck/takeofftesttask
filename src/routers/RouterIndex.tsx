import React, {Suspense} from "react";
import {observer} from "mobx-react-lite";
import {userStore} from "../store/user";
import {Loader} from "../components/common/Loader/Loader";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {ROUTE_PATHS} from "./paths.main";
import {LoginPage} from "../components/Login/Login";
import {SignUp} from "../components/Login/SignUp";
import {ContactsPage} from "../components/Contacts/ContactsPage";
import {NotFoundPage} from "../components/NotFoundPage/NotFoundPage";

export const RouterIndex = observer(({}) => {
    const {userInfo, loadings} = userStore
    if (loadings.appLoading) {
        return <Loader fullScreen/>
    }
    return (
        <BrowserRouter>
            <Suspense fallback={Loader}>
                <Switch>
                    <Route exact
                           path={'/'}
                           component={() => <Redirect to={ROUTE_PATHS.contacts}/>}
                    />
                    <Route exact
                           path={ROUTE_PATHS.login}
                           component={LoginPage}
                    />
                    <Route exact
                           path={ROUTE_PATHS.signUp}
                           component={SignUp}
                    />
                    <Route exact
                           path={ROUTE_PATHS.contacts}
                           component={ContactsPage}
                    />
                    <Route exact
                           component={NotFoundPage}
                    />
                </Switch>
            </Suspense>
        </BrowserRouter>
    )
})
