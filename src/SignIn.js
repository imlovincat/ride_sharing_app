/***
 * CS385 Project
 * Student Chi Ieong Ng
 * Date: 16-12-2022
 */

import React, { useState } from "react";
import icon from "./images/icon.png";
import firebaseApp from "./fbconfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SignIn = ({ setTheAuthUser, setChoice }) => {
  // we access authentication object from our
  // firebase database configuration.
  const auth = getAuth(firebaseApp);
  // our state variables for SignIn.
  // e for email, p for password
  const [inputFielde, setInputFielde] = useState("");
  const [inputFieldp, setInputFieldp] = useState("");
  // we'll need an error message state variable.
  const [error, setError] = useState("");

  // handler function when password textbox changes.
  const onChangePassword = (e) => {
    e.preventDefault();
    setInputFieldp(e.target.value);
  };

  // handler function when email textbox changes.
  const onChangeEmail = (e) => {
    e.preventDefault();
    setInputFielde(e.target.value);
  };

  // When the submit button is pressed we pass the values of the
  // state variables inputFielde, inputFieldp to our
  // firebase function signInWithEmailAndPassword
  const submitButton = () => {
    signInWithEmailAndPassword(auth, inputFielde, inputFieldp)
      .then((userCredentials) => {
        // Obtain the authenticated user object
        // from firebase.
        const user = userCredentials.user;
        // setTheAuthUser from the Parent App.
        // now the parent will know the user is authenticated
        setTheAuthUser(user);
        setChoice("Home");
      })
      .catch((error) => {
        setError("Unable to login");
      });
  };

  const toSignup = () => {
    setChoice("Signup");
  };

  return (
    <div>
      <br />
      <img
        src={icon}
        alt="icon is downloaded from theounproject.com, it is used here for college project only"
        width="300"
        height="300"
      />
      <br />
      <input
        onChange={onChangeEmail}
        value={inputFielde}
        placeholder="username"
        type="text"
        id="username"
        name="username"
        className="loginInput"
      />
      <br />
      <br />
      <input
        onChange={onChangePassword}
        value={inputFieldp}
        placeholder="password"
        type="password"
        id="password"
        name="password"
        className="loginInput"
      />
      <br />
      <a href="#" onClick={toSignup} className="createAccount">
        Create a new account
      </a>
      <br />

      <br />
      <button onClick={submitButton} className="loginButton">
        Login
      </button>
      <p>{error}</p>
    </div>
  );
};

export default SignIn;
