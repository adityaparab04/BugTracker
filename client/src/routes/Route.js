import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { GlobalContext } from '../context/GlobalState';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
    const { LoggedIn, type } = useContext(GlobalContext);

  /**
   * Redirect user to SignIn page if he tries to access a private route
   * without authentication.
   */
    if (isPrivate && !LoggedIn) {
        return <Redirect to="/" />;
    }

    if(!isPrivate && LoggedIn) {
        if(type === 'admin') {
            return <Redirect to='/admin'/>;
        }else if(type === 'employee') {
            return <Redirect to='/employee'/>;
        } else if(type === 'client') {
            return <Redirect to='/client' />;
        }
    }

  /**
   * Redirect user to Main page if he tries to access a non private route
   * (SignIn or SignUp) after being authenticated.
   */

  /**
   * If not included on both previous cases, redirect user to the desired route.
   */
    return <Route {...rest} component={Component} />;
}
