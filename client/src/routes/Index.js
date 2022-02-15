import React, {useEffect, useContext} from "react";

import { Switch } from "react-router-dom";
import Route from "./Route";

import { GlobalContext } from '../context/GlobalState';

import { Login } from "../pages/Login";
import { Admin } from "../pages/Admin";
import { Employee } from "../pages/Employee";
import { Client } from "../pages/Client";

export default function Routes() {
    const { loadCache } = useContext(GlobalContext);

    useEffect(() => {
        loadCache();
    }, []);

    return (
        <Switch>
            <Route path="/" exact component={Login} />

            <Route path="/admin" component={Admin} isPrivate/>

            <Route path="/employee" component={Employee} isPrivate />

            <Route path="/client" component={Client} isPrivate />

            {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
            <Route component={Login} />
        </Switch>
    );
}
