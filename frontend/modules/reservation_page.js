import config from "../conf/index.js";
//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return the
  try{
    let res = await fetch(config.backendEndpoint + "/reservations/");
    return res.json().then((data)=>{
      if(data.hasOwnProperty("message"))return null;
      return data
    })
    .catch((err)=>null);
    }
    catch(err){
      return null;
    }
}
//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // console.log(reservations);
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  const banner = document.getElementById("no-reservation-banner");
  const tableDiv = document.getElementById("reservation-table-parent");
  if(reservations.length > 0){
    banner.style.display = "none";
    tableDiv.style.display = "block";
    const table = document.getElementById("reservation-table");
    reservations.forEach( reservation =>{
      const {id, name, adventureName, person, date, price, time, adventure} = reservation;
      let url = window.location.origin + "/pages/adventures/detail/?adventure="+adventure;
      const [year, month, dat] = date.split("-");
      const newDate = `${dat[0] == "0" ? dat[1] : dat}/${month[0] == "0" ? month[1] : month}/${year}`;
      const row = document.createElement("tr");
      const options = {year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric', second:'numeric' };
      const data = `
      <td ><strong>${id}</strong></td>      <td>${name}</td>      <td>${adventureName}</td>      <td>${person}</td>      <td>${newDate}</td>      <td>${price}</td>      <td>${new Date(time).toLocaleDateString("en-IN", options).replace(" at", ",")}</td>      <td id="${id}">      <a href="${url}" ><button class="reservation-visit-button border-0" >Visit Adventure</button></a>      </td>      `
      row.innerHTML = data;
      table.appendChild(row);
    })
  }else{
    banner.style.display = "block";
    tableDiv.style.display = "none";
  }
  //Conditionally render the no-reservation-banner and reservation-table-parent
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page
    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
}
export { fetchReservations, addReservationToTable };