import React, { useRef } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { setEmail, setToken } from "../store/token";

const LogIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();

  const submitHandler = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_LOGIN_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (res.ok) {
      setToken(data.idToken);
      dispatch(authActions.login());
      setEmail(email);
    } else {
      let errMessage = "Authentication Failed...";
      if (data && data.error && data.error.message) {
        errMessage = data.error.message;
      }
      alert(errMessage);
    }

    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <Container className="border border-5 w-25 rounded-3 border-secondary mt-3">
      <h2 style={{ textAlign: "center" }}>LogIn</h2>
      <form
        style={{ textAlign: "center" }}
        className="border border-secondary rounded-4"
        onSubmit={submitHandler}
      >
        <label htmlFor="email" className="my-1">
          Email
        </label>
        <br />
        <input
          type="email"
          id="email"
          ref={emailRef}
          placeholder="Email"
          required
        />
        <br />
        <label htmlFor="password" className="my-1">
          Password
        </label>
        <br />
        <input
          type="password"
          id="password"
          ref={passwordRef}
          placeholder="Password"
          required
        />
        <br />
        <div className="my-2">
        <Link to="/forgotPassword">Forgot Password</Link>
        </div>
        <Button type="submit" className="my-1">
          LogIn
        </Button>
      </form>
    </Container>
  );
};

export default LogIn;
