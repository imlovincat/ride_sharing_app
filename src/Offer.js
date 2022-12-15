/***
 * CS385 Project
 * Student Chi Ieong Ng
 * Date: 16-12-2022
 */

import { useEffect, useState } from "react";
import { db } from "./fbconfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const Offer = ({ setChoice, setFormData }) => {
  const [isFetched, setIsFetched] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [dataArr, setDataArr] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sorting, setSorting] = useState("DESC");

  useEffect(() => {
    //read from a database
    (async () => {
      var tempArr = [];
      const q = query(
        collection(db, "journeys"),
        where("deleteFlag", "==", false)
      );
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const tempObj = {
            id: doc.id,
            user: doc.data().userID,
            datetime: doc.data().datetime.replace("T", " "),
            origin: doc.data().origin,
            geoOrigin: doc.data().geoOrigin,
            destination: doc.data().destination,
            geoDestination: doc.data().geoDestination,
            passager: doc.data().passager
          };
          tempArr.push(tempObj);
        });
        setDataArr(tempArr);
        setIsFetched(true);
      } catch (err) {
        setIsFetched(false);
        setErrorMsg(err);
      }
    })();
  }, []); //if set up dependency will easier to cause infinite loop due to await of firebase

  const onSearchFormChange = (e) => {
    setSearchTerm(e.target.value);
  };

  function filterFunction(searchTerm) {
    return function (object) {
      let origin = object.origin.toLowerCase();
      let destination = object.destination.toLowerCase();
      return (
        origin.includes(searchTerm.toLowerCase()) ||
        destination.includes(searchTerm.toLowerCase())
      );
    };
  }

  function sortByDatetime(objectA, objectB) {
    let comparison = 0;
    let objectADatetime = Date.parse(objectA.datetime);
    let objectBDatetime = Date.parse(objectB.datetime);

    if (sorting === "DESC") {
      if (objectADatetime < objectBDatetime) comparison = -1;
      else if (objectADatetime > objectBDatetime) comparison = 1;
      else comparison = 0;
    } else {
      if (objectADatetime > objectBDatetime) comparison = -1;
      else if (objectADatetime < objectBDatetime) comparison = 1;
      else comparison = 0;
    }
    return comparison;
  }

  function handleSubmit(obj) {
    setFormData([obj]);
    setChoice("Report");
  }

  //use conditional rendering
  if (errorMsg) {
    return (
      <div>
        <h1>We're very sorry: An error has occured in the Firebase Query</h1>
        <p>The error message is: {errorMsg}</p>
      </div>
    );
  } else if (isFetched === false) {
    return (
      <div>
        <h1>We are loading your Firebase Data........</h1>
        <p>Your data will be here very soon....</p>
      </div>
    );
  } else {
    return (
      <div>
        <div className="offerPage">
          <table border="1" className="offerTable">
            <thead>
              <tr>
                <td colSpan="5" className="offerTitle">
                  Offer a Ride
                </td>
              </tr>
              <tr>
                <td colSpan="5" className="offerrSearchBox">
                  <table border="1" className="searchBoxTable">
                    <tbody>
                      <tr>
                        <td className="searchBoxLeft">
                          <form>
                            Location Search: &nbsp;&nbsp;
                            <input
                              type="text"
                              value={searchTerm}
                              onChange={onSearchFormChange}
                            />
                          </form>
                        </td>
                        <td className="searchBoxRight">
                          <select
                            onChange={(e) => setSorting(e.target.value)}
                            className="sortingSelecter"
                          >
                            <option value="DESC">
                              Sort by Departure time(DESC)
                            </option>
                            <option value="ASC">
                              Sort by Departure time(ASC)
                            </option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <th>Departure time</th>
                <th>From</th>
                <th>To</th>
                <th>Passager</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                //implement project specific sorting and filtering
                dataArr
                  .filter(filterFunction(searchTerm))
                  .sort(sortByDatetime)
                  .map((s) => (
                    <tr key={s.id}>
                      <td>{s.datetime}</td>
                      <td>{s.origin}</td>
                      <td>{s.destination}</td>
                      <td>{s.passager}</td>
                      <td>
                        <button
                          onClick={() => handleSubmit(s)}
                          className="detailButton"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>
        <div></div>
      </div>
    );
  }
};

export default Offer;
