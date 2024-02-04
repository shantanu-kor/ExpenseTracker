import React, { useContext } from "react";
import { Button } from "react-bootstrap";

import AuthContext from "../store/authContext";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
  const authCtx = useContext(AuthContext);

  const verifyHandler = async (event) => {
    event.preventDefault();
    await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD73Oj20xEgcVTp_n7OuZuKlYiMVjXQy-8",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: authCtx.idToken,
        }),
        headers: {
            "Content-Type": "application/json",
        }
      }
    );
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Button onClick={verifyHandler}>Verify Email</Button>
      <br />
      <span>Check the link in your email!</span>
      <br />
      <Link to="/">To home</Link>
    </div>
  );
};

export default VerifyEmail;
