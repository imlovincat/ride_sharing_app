/***
 * CS385 Project
 * Student Chi Ieong Ng
 * Date: 16-12-2022
 */

import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Signup = ({ setChoice, setTheAuthUser }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onChangeEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const onChangeRepeatPassword = (e) => {
    e.preventDefault();
    setRepeatPassword(e.target.value);
  };

  function ValidateEmail(input) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  }

  const submitButton = () => {
    if (!ValidateEmail(email)) {
      setErrorMsg("Invaild email format");
    } else if (password !== repeatPassword) {
      setErrorMsg("Password and Repeat Password are not matched!");
    } else {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setTheAuthUser(user);
          setChoice("Home");
        })
        .catch((error) => {
          if (
            error.message === "Firebase: Error (auth/email-already-in-use)."
          ) {
            setErrorMsg("Email already in use");
          } else if (
            error.message === "Firebase: Error (auth/invalid-email)."
          ) {
            setErrorMsg("Invaild email address");
          } else {
            setErrorMsg(error.message);
          }
        });
    }
  };

  return (
    <div>
      <div className="SignupPage">
        <table className="SignupTable">
          <tbody>
            <tr>
              <td className="SignupTitle">Sign up a new account</td>
            </tr>
            <tr>
              <td className="Spacer"></td>
            </tr>
            <tr>
              <td>
                <input
                  onChange={onChangeEmail}
                  value={email}
                  placeholder="Email address"
                  type="text"
                  id="email"
                  name="email"
                  className="loginInput"
                />
              </td>
            </tr>
            <tr className="Spacer">
              <td></td>
            </tr>
            <tr>
              <td>
                <input
                  onChange={onChangePassword}
                  value={password}
                  placeholder="Password"
                  type="text"
                  id="password"
                  name="password"
                  className="loginInput"
                />
              </td>
            </tr>
            <tr className="Spacer">
              <td></td>
            </tr>
            <tr>
              <td>
                <input
                  onChange={onChangeRepeatPassword}
                  value={repeatPassword}
                  placeholder="Repeat Password"
                  type="text"
                  id="repeatPassword"
                  name="repeatPassword"
                  className="loginInput"
                />
              </td>
            </tr>
            <tr className="Spacer">
              <td></td>
            </tr>
            <tr>
              <td className="errorMessage">{errorMsg}</td>
            </tr>
            <tr className="Spacer">
              <td>
                <br />
              </td>
            </tr>
            <tr>
              <td>
                <button onClick={submitButton} className="loginButton">
                  Create a new account
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Signup;
