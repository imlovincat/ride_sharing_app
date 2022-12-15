/***
 * CS385 Project
 * Student Chi Ieong Ng
 * Date: 16-12-2022
 */

import { useState, useEffect } from "react";
import { co2Emitted } from "./Co2Reduction";
import { db } from "./fbconfig";
import { doc, updateDoc } from "firebase/firestore";

const Report = ({ setChoice, formData }) => {
  const [isFetched, setIsFetched] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [travelDistance, setTravelDistance] = useState("");

  useEffect(() => {
    //Read from an API
    (async () => {
      const oLat = formData[0].geoOrigin.lat;
      const oLng = formData[0].geoOrigin.lng;
      const dLat = formData[0].geoDestination.lat;
      const dLng = formData[0].geoDestination.lng;
      const geoPoint =
        "origins=" + oLat + "," + oLng + "&destinations=" + dLat + "," + dLng;
      const url = "https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?";
      const key =
        "&travelMode=driving&key=AqAJkILmIxLsE5HN7ytrvPYIrHxes7a0dhJDrBE-X4jeT1tfuIKiLXpYMiKygb_x";
      const API_URL = url + geoPoint + key;
      console.log(API_URL);
      try {
        const response = await fetch(API_URL);
        const jsonResult = await response.json();
        setTravelDistance(
          jsonResult.resourceSets[0].resources[0].results[0].travelDistance
        );
        setIsFetched(true);
      } catch (err) {
        console.log(err);
        setIsFetched(false);
        setErrorMsg(err);
      }
    })();
  }, []); //if set up dependency will easier to cause infinite loop due to await of firebase

  const handleSubmit = async () => {
    var docID = formData[0].id;
    await updateDoc(doc(db, "journeys", docID), {
      distance: parseFloat(travelDistance),
      deleteFlag: true
    });
    setChoice("Home");
  };

  const handleCancel = () => {
    setChoice("Offer");
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
    var co2Reduction = co2Emitted(parseFloat(travelDistance));
    return (
      <div className="reportPage">
        <table className="reportTable">
          <tbody>
            <tr>
              <td className="reportTitle">Sharing Ride Travel Report</td>
            </tr>
            <tr className="spacer">
              <td></td>
            </tr>
            <tr>
              <td>From</td>
            </tr>
            <tr>
              <td>{formData[0].origin}</td>
            </tr>
            <tr className="spacer">
              <td></td>
            </tr>
            <tr>
              <td>To</td>
            </tr>
            <tr>
              <td>{formData[0].destination}</td>
            </tr>
            <tr className="spacer">
              <td></td>
            </tr>
            <tr>
              <td>Passager: {formData[0].passager}</td>
            </tr>
            <tr className="spacer">
              <td></td>
            </tr>
            <tr>
              <td>Departure time: {formData[0].datetime}</td>
            </tr>
            <tr className="spacer">
              <td></td>
            </tr>
            <tr>
              <td>Distance: {travelDistance} km</td>
            </tr>
            <tr className="spacer">
              <td></td>
            </tr>
            <tr>
              <td>CO2 Reduction: {co2Reduction}</td>
            </tr>
            <tr className="spacer">
              <td></td>
            </tr>
            <tr>
              <td className="reportBottom">
                <button onClick={handleSubmit} className="reportConfirmButton">
                  Offer
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={handleCancel} className="reportCancelButton">
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

export default Report;
