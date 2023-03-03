import config from "../conf/index.js";
//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const urlParams = new URLSearchParams(window.location.search);
  const cityId = urlParams.get('city');

  return search.split("=")[1];
}
//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
  let res = await fetch(config.backendEndpoint + "/adventures?city=" + city);
  return res.json();
  }
  catch(err){
    return null;
  }
}
//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const data = document.getElementById("data");
  adventures.forEach((adventure)=>{
    const {id, name, image, duration, currency, costPerHead, category} = adventure;
    let div = document.createElement("div");
    div.className = "col-6 col-md-3 mb-4 position-relative";
    const card = `
    <a href="detail/?adventure=${id}" id="${id}" class="h-100">        <div class="category-banner">${category}</div>        <div class="activity-card h-100">          <img src="${image}" alt="${name}" style="max-height:220px;"/>        <div class=" d-flex flex-column flex-md-row align-items-center align-items-md-baseline justify-content-md-between px-md-3 flex-wrap pb-0 pt-2 w-100">          <p class="mb-0">${name}</p>          <p >&#8377; ${costPerHead}</p>        </div>        <div class=" d-flex flex-column flex-md-row align-items-center align-items-md-baseline justify-content-md-between px-md-3 flex-wrap w-100">          <p class="mb-0">Duration</p>          <p >${duration} Hour</p>        </div>      </div>        </a>    `
    div.innerHTML = card;
    data.appendChild(div);
  })
}
//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredList = list.filter((data)=>data.duration >= low);
  if(high != 0){
    filteredList = filteredList.filter((data)=>data.duration <= high);
  }
  return filteredList;
}
//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList = list.filter((data)=>categoryList.includes(data.category))
  return filteredList;
}
// filters object looks like this filters = { duration: "", category: [] };
//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together
function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if(filters.duration.length > 0){
    let duration = filters.duration;
    let low = 0, high = 0;
    if(duration.includes("+")){
      low = 12;
    }
    else{
      let arr = duration.split("-").map((n)=>parseInt(n));
      [low, high] = arr;
    }
    list = filterByDuration(list, low, high);
  }
  if(filters.category.length > 0){
    list = filterByCategory(list, filters.category);
  }
  // Place holder for functionality to work in the Stubs
  return list;
}
//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters))
  return true;
}
//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const filters = JSON.parse(localStorage.getItem("filters"));
  // generateFilterPillsAndUpdateDOM(filters)
  return filters;
}
//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM
function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let element = document.getElementById("duration-select");
  element.value = filters.duration;
  const div = document.getElementById("category-list");
  if(filters.category.length > 0){
    filters.category.forEach((data)=>{
      const child = document.createElement("div");
      child.className = "category-filter";
      child.textContent = data;
      div.appendChild(child);
    })
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
