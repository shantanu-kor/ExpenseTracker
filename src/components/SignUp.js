import React, { useRef } from "react";
import { Button, Container } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { setEmail, setToken } from "../store/token";

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const dispatch = useDispatch();

  const submitHandler = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";
    } else {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_LOGIN_KEY}`,
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
    }

    emailRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
  };

  return (
    <Container className="border border-5 w-25 rounded-3 border-secondary mt-3">
      <h2 style={{ textAlign: "center" }}>SignUp</h2>
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
        <label htmlFor="confirmPassword" className="my-1">
          Confirm Password
        </label>
        <br />
        <input
          type="password"
          id="confirmPassword"
          ref={confirmPasswordRef}
          placeholder="Confirm Password"
          required
        />
        <br />
        <Button type="submit" className="my-3">
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default SignUp;
