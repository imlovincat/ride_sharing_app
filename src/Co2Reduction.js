/***
 * CS385 Project
 * Student Chi Ieong Ng
 * Date: 16-12-2022
 */

//function for calculate co2 emitted
export function co2Emitted(kilometer) {
  //kilometre to mile (1:0.621371)
  var mile = kilometer * 0.621371;

  //The average passenger vehicle emits about 404 grams of CO2 per mile
  //Ref to https://www.epa.gov/greenvehicles/greenhouse-gas-emissions-typical-passenger-vehicle#:~:text=typical%20passenger%20vehicle%3F-,A%20typical%20passenger%20vehicle%20emits%20about%204.6%20metric%20tons%20of,8%2C887%20grams%20of%20CO2.
  var gram = mile * 404;

  if (gram < 1000000) {
    return gram.toFixed(0).toString() + " grams";
  } else {
    return (gram / 1000000).toFixed(2).toString() + " Metric Tons";
  }

  return gram;
}
