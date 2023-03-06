import config from "../conf/index.js";
//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  return params.get('adventure');
  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let adventureDetails = await fetch(config.backendEndpoint+"/adventures/detail/?adventure="+adventureId).then(element => element.json());
    console.log(adventureDetails);
    return adventureDetails;
  }
  catch{
    return null;
  }
  // Place holder for functionality to work in the Stubs
}
//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let advHeading = document.getElementById("adventure-name");
  advHeading.innerHTML = adventure.name;
  let advSubheading = document.getElementById("adventure-subtitle");
  advSubheading.innerHTML = adventure.subtitle;
  let advGallery = document.getElementById("photo-gallery");
  advGallery.innerHTML = "";
  adventure.images.forEach((image) => {
    console.log(image);
    let advImage = document.createElement("div");
    advImage.innerHTML = `<img src = ${image} class = "activity-card-image">`;
    advGallery.append(advImage);
  });
  let advContent = document.getElementById("adventure-content");
  advContent.innerHTML = adventure.content;
}
//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let advGallery = document.getElementById("photo-gallery");
  console.log("hello");
  console.log(advGallery.innerHTML);
  advGallery.innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">  <div class="carousel-indicators">    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>  </div>  <div class="carousel-inner" id = "image-container">  </div>  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">    <span class="carousel-control-prev-icon" aria-hidden="true"></span>    <span class="visually-hidden">Previous</span>  </button>  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">    <span class="carousel-control-next-icon" aria-hidden="true"></span>    <span class="visually-hidden">Next</span>  </button></div>  `;
  let advImageContainer = document.getElementById("image-container");
  images.forEach((image, index) => {
    let advImage = document.createElement("div");
    advImage.setAttribute("class", `carousel-item ${index == 0?"active":""}`);
    advImage.innerHTML = `<img src= ${image} class="activity-card-image d-block w-100" alt="...">`;
    advImageContainer.appendChild(advImage);
  });
}
//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;
  }
  else{
    document.getElementById("reservation-panel-sold-out").style.display = "block";
    document.getElementById("reservation-panel-available").style.display = "none";
  }
}
//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let totalCost = adventure.costPerHead * persons;
  document.getElementById("reservation-cost").innerHTML = totalCost;
}
//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let myForm = document.getElementById("myForm");
  myForm.addEventListener("submit", async(event) => {
    event.preventDefault();
    let sendData = {
      name: myForm.elements["name"].value,
      date: myForm.elements["date"].value,
      person: myForm.elements["person"].value,
      adventure: adventure.id
    }
    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendData),
      };
      try{
        let post = fetch(config.backendEndpoint + "/reservations/new", options);
        alert("Success!");
        location.reload();
      }
      catch{
        alert("Failure!");
      }
  });
}
//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let reservedBanner = document.getElementById("reserved-banner");
  if(adventure.reserved){
    reservedBanner.style.display = "block";
  }
  else{
    reservedBanner.style.display = "none";
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