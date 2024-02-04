import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const emailRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD73Oj20xEgcVTp_n7OuZuKlYiMVjXQy-8", {
        method: "POST",
        body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: emailRef.current.value,
        }),
        headers: {
            "Content-Type": "application/json",
        }
    })
    emailRef.current.value = '';

  };

  return (
    <form style={{ textAlign: "center" }} onSubmit={submitHandler}>
      <label htmlFor="email">Email</label>
      <br />
      <input type="email" id="email" ref={emailRef} required />
      <br />
      <Button variant="warning" className="my-3" type="submit">
        Send Link
      </Button>
      <br />
      <Link to="/">To SignUp</Link>
    </form>
  );
};

export default ForgotPassword;
