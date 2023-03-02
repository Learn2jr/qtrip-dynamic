import config from "../conf/index.js";
async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //console.log(cities);
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}
//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    let res= await fetch(config.backendEndpoint+"/cities");
    let city= await res.json();
    console.log(city);
    return city;
  }
  catch(e){
    return null;
  }
}
//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let parentElement = document.getElementById("data");
  let content = `
  <div class="col-12 col-sm-6 col-lg-3 mb-4 " >    <a id="${id}" href="pages/adventures/?city=${id}">      <div class="tile" >        <img src="${image}" />        <div class="tile-text text-center">          <h5>${city}</h5>          <p>${description}</p>        </div>      </div>    </a>  </div>`
  parentElement.innerHTML+=content;
}
export { init, fetchCities, addCityToDOM };