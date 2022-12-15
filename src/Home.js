/***
 * CS385 Project
 * Student Chi Ieong Ng
 * Date: 16-12-2022
 */

import { useEffect, useState } from "react";
import { co2Emitted } from "./Co2Reduction";
import { db } from "./fbconfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const Home = ({ setChoice }) => {
  const [isFetched, setIsFetched] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [co2Value, setCo2Value] = useState("");
  const [co2Unit, setCo2Unit] = useState("");

  useEffect(() => {
    var travelDistance = 0;
    //Read from a database
    (async () => {
      const q = query(
        collection(db, "journeys"),
        where("deleteFlag", "==", true)
      );
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          travelDistance += doc.data().distance;
        });
        var co2 = co2Emitted(travelDistance);
        var index = co2.indexOf(" ");
        setCo2Value(co2.substring(0, index));
        setCo2Unit(co2.substring(index, co2.length));
        setIsFetched(true);
      } catch (err) {
        setIsFetched(false);
        setErrorMsg(err);
      }
    })();
  }, []); //if set up dependency will easier to cause infinite loop due to await of firebase

  const goToRequest = () => {
    setChoice("Request");
  };

  const goToOffer = () => {
    setChoice("Offer");
  };

  if (errorMsg) {
    return (
      <div>
        <h1>An error has occured in database loading</h1>
        <p>The error message is: {errorMsg}</p>
      </div>
    );
  } else if (isFetched === false) {
    return (
      <div>
        <h1>Loading Database...</h1>
      </div>
    );
  } else {
    return (
      <div>
        <br />
        <table className="co2Table">
          <tbody>
            <tr>
              <td colSpan="2">This app has reached</td>
            </tr>
            <tr>
              <td className="co2value">{co2Value}</td>
              <td className="co2unit">{co2Unit}</td>
            </tr>
            <tr>
              <td colSpan="2" className="co2Reduction">
                CO2 Reduction
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <br />
        <br />
        <button onClick={goToRequest} className="requestButton">
          Request a Ride
        </button>
        <br />
        <br />
        <br />
        <button onClick={goToOffer} className="offerButton">
          Offer a Ride
        </button>
      </div>
    );
  }
};

export default Home;
