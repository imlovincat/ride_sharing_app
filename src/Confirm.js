/***
 * CS385 Project
 * Student Chi Ieong Ng
 * Date: 16-12-2022
 */

import { useState, useEffect } from "react";
import { db } from "./fbconfig";
import { collection, addDoc } from "firebase/firestore";

const Confirm = ({ currentUser, setChoice, formData }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [geoOrigin, setGeoOrigin] = useState();
  const [geoDestination, setGeoDestination] = useState();
  const [isFetched, setIsFetched] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const datetime = formData[2];
  const passager = formData[3];

  useEffect(() => {
    var origin = formData[0].toString().replaceAll(" ", "+");
    var destination = formData[1].toString();
    const url = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    const key = "&key=AIzaSyAXmckxhSK1pNlZd2YPE0ePkqVeBR5nM74";
    //read from an API
    const fetchOriginData = async () => {
      const API_URL = url + origin + key;
      const response = await fetch(API_URL);
      const jsonResult = await response.json();
      try {
        setOrigin(jsonResult.results[0].formatted_address);
        setGeoOrigin(jsonResult.results[0].geometry.location);
      } catch (e) {
        setErrorMsg("Invalid Address");
      }
    };
    const fetchDestinationData = async () => {
      const API_URL = url + destination + key;
      const response = await fetch(API_URL);
      //Read from an external JSON source
      const jsonResult = await response.json();
      try {
        setDestination(jsonResult.results[0].formatted_address);
        setGeoDestination(jsonResult.results[0].geometry.location);
      } catch (e) {
        setErrorMsg("Invalid Address");
      }
    };
    try {
      fetchOriginData();
      fetchDestinationData();
      setIsFetched(true);
    } catch (err) {
      setIsFetched(false);
      setErrorMsg(err);
    }
  }, [formData]);

  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, "journeys"), {
        createdAt: new Date(),
        userID: currentUser.uid,
        origin: origin,
        geoOrigin: geoOrigin,
        destination: destination,
        geoDestination: geoDestination,
        datetime: datetime,
        passager: passager,
        distance: 0,
        deleteFlag: false
      });
      setChoice("Home");
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      setErrorMsg("Unable to connect, please try again later");
      console.log(e);
    }
  };

  const handleCancel = () => {
    setChoice("Request");
  };

  //Use conditional rendering
  if (errorMsg) {
    return (
      <div className="error">
        <h1>We're very sorry: An error has occured in the API call</h1>
        <p>The error message is: {errorMsg}</p>
      </div>
    );
  } else if (isFetched === false) {
    return (
      <div className="fetching">
        <h1>We are loading your API request........</h1>
        <p>Your data will be here very soon....</p>
      </div>
    );
  } else {
    return (
      <div className="requestPage">
        <table className="requestForm">
          <tbody>
            <tr>
              <td className="confirmTitle">Confirm Your Request</td>
            </tr>
            <tr className="spacer">
              <td></td>
            </tr>
            <tr>
              <td>From</td>
            </tr>
            <tr>
              <td>{origin}</td>
            </tr>
            <tr className="spacer">
              <td></td>
            </tr>
            <tr>
              <td>To</td>
            </tr>
            <tr>
              <td>{destination}</td>
            </tr>
            <tr className="spacer">
              <td></td>
            </tr>
            <tr>
              <td>Departure Time</td>
            </tr>
            <tr>
              <td>{datetime}</td>
            </tr>
            <tr className="spacer">
              <td></td>
            </tr>
            <tr>
              <td>Passager: {passager}</td>
            </tr>
            <tr className="spacer">
              <td></td>
            </tr>
            <tr>
              <td>{errorMsg}</td>
            </tr>
            <tr className="spacer">
              <td></td>
            </tr>
            <tr>
              <td className="confirmBottom">
                <button onClick={handleSubmit} className="confirmButton">
                  Confirm
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={handleCancel} className="confirmCancelButton">
                  Cancel
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};

export default Confirm;
