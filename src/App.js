import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import AuthenticationPage from "./pages/Authentication";
import HomePage from "./pages/Home";
import ProfilePage from "./pages/Profile";
import VerifyEmailPage from "./pages/VerifyEmail";

import { getToken } from "./store/token";
import { authActions } from "./store/auth";

import "./App.css";
import ForgotPasswordPage from "./pages/ForgotPassword";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  if (getToken() !== null) {
    dispatch(authActions.login())
  }
  
  return (
    <Switch>
      <Route path="/" exact>
        {isAuth && <HomePage />}
        {!isAuth && <AuthenticationPage />}
      </Route>
      <Route path="/profile" exact>
        {isAuth && <ProfilePage />}
        {!isAuth && <Redirect to="/" />}
      </Route>
      <Route path="/verifyEmail">
        {isAuth && <VerifyEmailPage />}
        {!isAuth && <Redirect to="/" />}
      </Route>
      <Route path="/forgotPassword">
        <ForgotPasswordPage />
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default App;
