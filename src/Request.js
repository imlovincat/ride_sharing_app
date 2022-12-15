/***
 * CS385 Project
 * Student Chi Ieong Ng
 * Date: 16-12-2022
 */

import { useState } from "react";
import { format } from "date-fns";

const Request = ({ setChoice, setFormData }) => {
  const [originAddress, setOriginAddress] = useState("");
  const [originCounty, setOriginCounty] = useState("Dublin");
  const [originCountry, setOriginCountry] = useState("Ireland");
  const [destinationAddress, setdestinationAddress] = useState("");
  const [destinationCounty, setdestinationCounty] = useState("Dublin");
  const [destinationCountry, setdestinationCountry] = useState("Ireland");
  const [datetime, setDatetime] = useState(
    format(new Date(), "yyyy-MM-dd HH:mm")
  );
  const [passager, setPassager] = useState(1);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async () => {
    //input validation
    const letters = /^[0-9A-Za-z,'\s]+$/;
    if (originAddress === "") setErrorMsg("Origin field can't empty");
    else if (!originAddress.match(letters)) setErrorMsg("Invalid address");
    else if (destinationAddress === "")
      setErrorMsg("Destination field can't empty");
    else if (!destinationAddress.match(letters)) setErrorMsg("Invalid address");
    else if (datetime < format(new Date(), "yyyy-MM-dd HH:mm"))
      setErrorMsg("Departure time must be greater than now");
    else if (passager < 1 || passager > 4)
      setErrorMsg("No more than 4 passengers");
    else {
      setErrorMsg(null);
      setFormData([
        originAddress + ", " + originCounty + ", " + originCountry,
        destinationAddress +
          ", " +
          destinationCounty +
          ", " +
          destinationCountry,
        datetime,
        passager
      ]);
      setChoice("Confirm");
    }
  };

  return (
    <div className="requestPage">
      <table className="requestForm">
        <tbody>
          <tr>
            <td className="requestTitle">Request a Ride</td>
          </tr>
          <tr>
            <td>
              <br />
            </td>
          </tr>
          <tr>
            <td>From</td>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                className="requestTextField"
                placeholder="Origin"
                value={originAddress}
                onChange={(e) => setOriginAddress(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <select
                onChange={(e) => setOriginCounty(e.target.value)}
                className="requestCountySelecter"
              >
                <option value="Dublin">Dublin</option>
                <option value="Carlow">Carlow</option>
                <option value="Cavan">Cavan</option>
                <option value="Clare">Clare</option>
                <option value="Cork">Cork</option>
                <option value="Donegal">Donegal</option>
                <option value="Galway">Galway</option>
                <option value="Kerry">Kerry</option>
                <option value="Kildare">Kildare</option>
                <option value="Kilkenny">Kilkenny</option>
                <option value="Laois">Laois</option>
                <option value="Leitrim">Leitrim</option>
                <option value="Limerick">Limerick</option>
                <option value="Longford">Longford</option>
                <option value="Louth">Louth</option>
                <option value="Mayo">Mayo</option>
                <option value="Meath">Meath</option>
                <option value="Monaghan">Monaghan</option>
                <option value="Offaly">Offaly</option>
                <option value="Roscommon">Roscommon</option>
                <option value="Sligo">Sligo</option>
                <option value="Tipperary">Tipperary</option>
                <option value="Waterford">Waterford</option>
                <option value="Westmeath">Westmeath</option>
                <option value="Wexford">Wexford</option>
                <option value="Wicklow">Wicklow</option>
              </select>
              <select
                onChange={(e) => setOriginCountry(e.target.value)}
                className="requestCountrySelecter"
              >
                <option value="Ireland">Ireland</option>
              </select>
            </td>
          </tr>
          <tr className="spacer">
            <td></td>
          </tr>
          <tr>
            <td>To</td>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                className="requestTextField"
                placeholder="Destination"
                value={destinationAddress}
                onChange={(e) => setdestinationAddress(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <select
                onChange={(e) => setdestinationCounty(e.target.value)}
                className="requestCountySelecter"
              >
                <option value="Dublin">Dublin</option>
                <option value="Carlow">Carlow</option>
                <option value="Cavan">Cavan</option>
                <option value="Clare">Clare</option>
                <option value="Cork">Cork</option>
                <option value="Donegal">Donegal</option>
                <option value="Galway">Galway</option>
                <option value="Kerry">Kerry</option>
                <option value="Kildare">Kildare</option>
                <option value="Kilkenny">Kilkenny</option>
                <option value="Laois">Laois</option>
                <option value="Leitrim">Leitrim</option>
                <option value="Limerick">Limerick</option>
                <option value="Longford">Longford</option>
                <option value="Louth">Louth</option>
                <option value="Mayo">Mayo</option>
                <option value="Meath">Meath</option>
                <option value="Monaghan">Monaghan</option>
                <option value="Offaly">Offaly</option>
                <option value="Roscommon">Roscommon</option>
                <option value="Sligo">Sligo</option>
                <option value="Tipperary">Tipperary</option>
                <option value="Waterford">Waterford</option>
                <option value="Westmeath">Westmeath</option>
                <option value="Wexford">Wexford</option>
                <option value="Wicklow">Wicklow</option>
              </select>
              <select
                onChange={(e) => setdestinationCountry(e.target.value)}
                className="requestCountrySelecter"
              >
                <option value="Ireland">Ireland</option>
              </select>
            </td>
          </tr>
          <tr className="spacer">
            <td></td>
          </tr>
          <tr>
            <td>Departure time</td>
          </tr>
          <tr>
            <td>
              <input
                type="datetime-local"
                value={datetime}
                onChange={(e) => setDatetime(e.target.value)}
              />
            </td>
          </tr>
          <tr className="spacer">
            <td></td>
          </tr>
          <tr>
            <td>Passager</td>
          </tr>
          <tr>
            <td>
              <input
                type="number"
                value={passager}
                onChange={(e) => setPassager(e.target.value)}
                min="1"
                max="6"
              />
            </td>
          </tr>
          <tr className="spacer">
            <td></td>
          </tr>
          <tr>
            <td className="errorMessage">{errorMsg}</td>
          </tr>
          <tr className="spacer">
            <td></td>
          </tr>
          <tr>
            <td className="requestSubmit">
              <button onClick={handleSubmit} className="requestSubmitButton">
                Submit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Request;
