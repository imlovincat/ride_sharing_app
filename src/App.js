/***
 * CS385 Project
 * Student Chi Ieong Ng
 * Date: 16-12-2022
 */

import SignIn from "./SignIn";
import Signup from "./Signup";
import SignOut from "./SignOut";
import Home from "./Home";
import Request from "./Request";
import Offer from "./Offer";
import Confirm from "./Confirm";
import Report from "./Report";
import "./styles.css";

import React, { useState } from "react";

function App() {
  // create an authenticated user object
  // initially this is null (user not authenticated)
  const [theAuthUser, setTheAuthUser] = useState(null);
  const [choice, setChoice] = useState("Signin");
  const [formData, setFormData] = useState([]);

  const toHome = () => {
    if (theAuthUser) {
      setChoice("Home");
    } else {
      setChoice("Signin");
    }
  };

  //use conditional rendering
  return (
    <div className="container">
      <table className="topBar">
        <tbody>
          <tr>
            <td>
              <h1>
                <a href="#" onClick={toHome} className="topic">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ride
                  Sharing App
                </a>
              </h1>
            </td>
            <td className="topRight">
              {theAuthUser && (
                <SignOut
                  setTheAuthUser={setTheAuthUser}
                  setChoice={setChoice}
                />
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <hr />
      <div className="App">
        {!theAuthUser && choice === "Signin" && (
          <SignIn setTheAuthUser={setTheAuthUser} setChoice={setChoice} />
        )}

        {!theAuthUser && choice === "Signup" && (
          <Signup setTheAuthUser={setTheAuthUser} setChoice={setChoice} />
        )}

        {choice === "Home" && theAuthUser && (
          <Home currentUser={theAuthUser} setChoice={setChoice} />
        )}

        {choice === "Request" && theAuthUser && (
          <Request
            currentUser={theAuthUser}
            setChoice={setChoice}
            formData={formData}
            setFormData={setFormData}
          />
        )}

        {choice === "Confirm" && theAuthUser && (
          <Confirm
            currentUser={theAuthUser}
            setChoice={setChoice}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {choice === "Offer" && theAuthUser && (
          <Offer
            currentUser={theAuthUser}
            setChoice={setChoice}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {choice === "Report" && theAuthUser && (
          <Report
            currentUser={theAuthUser}
            setChoice={setChoice}
            formData={formData}
            setFormData={setFormData}
          />
        )}
      </div>
    </div>
  );
}
export default App;
