import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { getToken } from "../store/token";

const UpdateProfile = () => {
  const nameRef = useRef();
  const photoRef = useRef();

  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function getData() {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyD73Oj20xEgcVTp_n7OuZuKlYiMVjXQy-8",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: getToken(),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await res.json();
      data = data.users[0];
      if (data.displayName !== undefined) {
        nameRef.current.value = data.displayName;
      }
      if (data.photoUrl !== undefined) {
        photoRef.current.value = data.photoUrl;
      }
    }
    setUpdating(true);
    getData();
    setUpdating(false);
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    setUpdating(true);
    const name = nameRef.current.value;
    const photo = photoRef.current.value;
    await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD73Oj20xEgcVTp_n7OuZuKlYiMVjXQy-8",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: getToken(),
          displayName: name,
          photoUrl: photo,
          deleteAttribute: null,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setUpdating(false);
  };

  return (
    <React.Fragment>
      <form style={{ textAlign: "center" }} onSubmit={submitHandler}>
        <label htmlFor="name">Full Name</label>
        <br />
        <input type="text" id="name" ref={nameRef} required />
        <br />
        <label htmlFor="photo">Profile Photo URL</label>
        <br />
        <input type="text" id="photo" ref={photoRef} required />
        <br />
        {updating ? (
          <p>Updating...</p>
        ) : (
          <Button className="my-3" type="submit">
            Update
          </Button>
        )}
      </form>
      <div style={{ textAlign: "center" }}>
        <Link to="/">To home</Link>
      </div>
    </React.Fragment>
  );
};

export default UpdateProfile;
