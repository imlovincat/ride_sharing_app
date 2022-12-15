/***
 * CS385 Project
 * Student Chi Ieong Ng
 * Date: 16-12-2022
 */

import React from "react";
import { getAuth } from "firebase/auth";

const SignOut = ({ setTheAuthUser, setChoice }) => {
  // Signout function
  const logout = () => {
    // sign out the user at firebase
    getAuth().signOut();
    // set this user to null
    // user is not authenticated.
    setTheAuthUser(null);
    setChoice("Signin");
  };
  return (
    <div>
      <button onClick={logout} className="logout">
        Logout
      </button>
    </div>
  );
};
export default SignOut;
