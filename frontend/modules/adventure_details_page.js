import config from "../conf/index.js";
//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let id = search.split("=")[1];
  // Place holder for functionality to work in the Stubs
  return id;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let res = await fetch(config.backendEndpoint + "/adventures/detail?adventure=" + adventureId);
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
//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  // const {id, name, subtitle, images, content, available, reserved, costPerHead} = adventure;
  const {name, subtitle, images, content} = adventure;
  // add header
  const headerDiv = document.getElementById("adventure-name");
  headerDiv.textContent = name;
  // add subtitle
  const subtitleDiv = document.getElementById("adventure-subtitle");
  subtitleDiv.textContent = subtitle;
  // add images
  const imageDiv = document.getElementById("photo-gallery");
  images.forEach( img => {
    const subImageDiv = document.createElement("div");
    const subImage = document.createElement("img");
    subImage.className = "activity-card-image";
    subImage.setAttribute("src", img);
    subImageDiv.appendChild(subImage)
    imageDiv.appendChild(subImageDiv);
  })
  // add content
  const contentDiv = document.getElementById("adventure-content");
  contentDiv.textContent = content;
}
//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const galleryDiv = document.getElementById("photo-gallery");
  // creating a container for the images
  const carouselContainer = document.createElement("div");
  carouselContainer.className = "carousel-inner";
  // appending images to the container
  images.forEach( (img, index) => {
    const subImageDiv = document.createElement("div");
    const subImage = document.createElement("img");
    let className = "carousel-item"
    subImage.className = "activity-card-image ";
    subImage.setAttribute("src", img);
    if(index == 0)className += " active";
    subImageDiv.className = className;
    subImageDiv.appendChild(subImage)
    carouselContainer.appendChild(subImageDiv);
  })
  const buttons = `
    <button class="carousel-control-prev" type="button" data-bs-target="#photo-gallery" data-bs-slide="prev">      <span class="carousel-control-prev-icon" aria-hidden="true"></span>      <span class="visually-hidden">Previous</span>    </button>    <button class="carousel-control-next" type="button" data-bs-target="#photo-gallery" data-bs-slide="next">      <span class="carousel-control-next-icon" aria-hidden="true"></span>      <span class="visually-hidden">Next</span>    </button>  `;
  // creating sub button container
  const subButtonContainer = document.createElement("div");
  subButtonContainer.className = "carousel-indicators";
  // adding buttons to the sub btton container
  let subButton = "";
  for(let i = 0; i < images.length; i++){
    if(i == 0)subButton += `<button type="button" data-bs-target="#photo-gallery" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>`;
    else subButton += `<button type="button" data-bs-target="#photo-gallery" data-bs-slide-to="${String(i)}" aria-label="Slide ${String(i + 1)}"></button>`
  }
  subButtonContainer.innerHTML = subButton;
  galleryDiv.innerHTML = "";
  galleryDiv.className = "carousel slide";
  galleryDiv.setAttribute("data-bs-ride", "carousel");
  galleryDiv.id = "photo-gallery"
  galleryDiv.appendChild(subButtonContainer);
  galleryDiv.appendChild(carouselContainer);
  galleryDiv.innerHTML += buttons;
}
//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  const hideID = !adventure.available ? "reservation-panel-available" : "reservation-panel-sold-out";
  const displayID = adventure.available ? "reservation-panel-available" : "reservation-panel-sold-out";
  const displayDiv = document.getElementById(displayID);
  const hideDiv = document.getElementById(hideID);
  displayDiv.style.display = "block";
  hideDiv.style.display = "none";
  if(adventure.available){
    const costDiv = document.getElementById("reservation-person-cost");
    costDiv.textContent = adventure.costPerHead;
  }
}
//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let count = parseInt(persons);
  let head = parseInt(adventure.costPerHead)
  const costDiv = document.getElementById("reservation-cost");
  costDiv.innerHTML = count * head;
}
//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  document.getElementById('myForm').addEventListener("submit", async function(e) {
    e.preventDefault()
    const date = document.getElementById('date');
    const person = document.getElementById('person');
    const name = document.getElementById('name');
    let data = {
      name : name.value,
      date : date.value, 
      person : person.value, 
      adventure : adventure.id
    }
    return await fetch(config.backendEndpoint + "/reservations/new", {
      // Adding method type
      method: "POST",
      // Adding body or contents to send
      body: JSON.stringify(data),
      // Adding headers to the request
      headers: {
          "Content-type": "application/json"
      }
    })
    .then(res => {
      if(!res.ok){
        alert("Failed!");
        return false;
      }else{
        alert("Success!");
        window.location.reload();
        return true;
      }
    })
    .catch(err => {
      alert("Failed!");
      return false;
    });
  })
}
//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const bannerDiv = document.getElementById("reserved-banner");
  if(adventure.reserved){
    bannerDiv.style.display = "block";
  }else{
    bannerDiv.style.display = "none";
  }
}
export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};