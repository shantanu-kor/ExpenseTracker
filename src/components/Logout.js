import React from "react";
import { Button } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { removeToken } from "../store/token";

const Logout = () => {
  const dispatch = useDispatch();

  const logoutHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.logout());
    removeToken();
  };

  return <Button onClick={logoutHandler}>Logout</Button>;
};

export default Logout;
