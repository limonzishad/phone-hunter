// gets search input
const searchPhone = () => {
    const searchInput = document.getElementById("searched-phone");
    const searchText = searchInput.value;
    if (searchText == " " || searchText == "") {
        errorMassage();
    }
    else {
        clearErrorMassage();
        searchInput.value = "";
        const dynamicUrl = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(dynamicUrl)
            .then(response => response.json())
            .then(devices => showSearchResults(devices.data));
    }
}
// error massage function
const errorMassage = () => {
    const errorMassage = document.getElementById("error-message");
    const previousErrorMassage = errorMassage.innerText;
    errorMassage.innerText = 'field empty or wrong input';
    return errorMassage;
}
//clear error massage
const clearErrorMassage = () => {
    const clearMassage = document.getElementById("error-message");
    const previousErrorMassage = clearMassage.innerText;
    clearMassage.innerText = '';
    return clearMassage;
}
//shows search results
const showSearchResults = data => {
    const searchResults = document.getElementById("search-result");
    searchResults.textContent = ""; // clears previous search results
    if (data.length == 0) {
        errorMassage();
    }
    else {
        clearErrorMassage();
        const show20Devices = data.slice(0, 20);
        show20Devices.forEach(device => {
            const div = document.createElement("div");
            div.classList.add("col");
            div.innerHTML = `
                    <div class="shadow-lg card h-100 p-3">
                        <img src="${device.image}" class="card-img-top device-img" alt="">
                        <div class="card-body">
                            <h5 class="card-title">Name: ${device.phone_name}</h5>
                            <p class="card-text">Brand: ${device.brand}</p>
                        </div>
                        <button onclick="loadDeviceDetails('${device.slug}')" type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button>
                    </div>
                `;
            searchResults.appendChild(div);
        });
        const showMore = document.createElement("div");
        showMore.classList.add("show-more-btn");
        showMore.innerHTML = `
        <button onclick="" type="button" class="btn btn-primary shadow-lg">Show More</button>
        `;
        searchResults.appendChild(showMore);
    }
}
//loads device result
const loadDeviceDetails = deviceId => {
    const dynamicUrl = `https://openapi.programming-hero.com/api/phone/${deviceId}`;
    fetch(dynamicUrl)
        .then(response => response.json())
        .then(details => showDeviceDetails(details));
}
//remove previous modal
const removeModal = () => {
    const previousModal = document.getElementById("remove-previous-modal");
    const loadModal = previousModal.children[0];
    previousModal.removeChild(loadModal);
}
//shows device result
const showDeviceDetails = deviceId => {
    const deviceDetails = document.getElementById("device-details");
    const detailsDiv = document.getElementById("remove-previous-modal");
    //object destructuring
    const { storage, displaySize, chipSet, memory, sensors } = deviceId.data.mainFeatures;
    const { image } = deviceId.data;
    //shows search results
    if (typeof deviceId?.data?.others == "undefined") {
        const div = document.createElement("div");
        div.classList.add("modal-content");
        div.innerHTML = `    
        <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Device Specifications</h5>
            <button onclick="removeModal()" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <div>
            <div class="modal-image">
                <img src="${image}" class="modal-image" alt="">
                <p class="text-body text-center mb-1">${deviceId.data.brand} ${deviceId.data.name}</p>
            </div>
        <div/>
        <h5 class="text-body fw-bold">Main Features</h5>
        <p class="text-wrap">Release Date: <span id="release-date" class="text-body fw-bold"><span></p>
        <p class="text-wrap">Storage: <span class="fw-bold">${storage}</span></p>
        <p class="text-wrap">Display Size: <span class="fw-bold">${displaySize}</span></p>
        <p class="text-wrap">Chip set: <span class="fw-bold">${chipSet}</span></p>
        <p class="text-wrap">Memory: <span class="fw-bold">${memory}</span></p>
        <p class="text-wrap">Sensors: <span class="fw-bold">${sensors}</span></p>
        <h5 class="text-body fw-bold">Other Information</h5>
        <p class="text-wrap">Other information's are not available</span></p>
        </div>
        `;
        detailsDiv.appendChild(div);

    }
    else {
        const { WLAN, Bluetooth, GPS, NFC, Radio, USB } = deviceId.data.others;
        const div = document.createElement("div");
        div.classList.add("modal-content");
        div.innerHTML = `    
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Device Specifications</h5>
                <button onclick="removeModal()" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <div>
                <div class="modal-image">
                    <img src="${image}" class="modal-image" alt="">
                    <p class="text-body text-center mb-1">${deviceId.data.brand} ${deviceId.data.name}</p>
                </div>
            <div/>
            <h5 class="text-body fw-bold">Main Features</h5>
            <p class="text-wrap">Release Date: <span id="release-date" class="text-body fw-bold"><span></p>
            <p class="text-break">Storage: <span class="fw-bold">${storage}</span></p>
            <p class="text-break">Display Size: <span class="fw-bold">${displaySize}</span></p>
            <p class="text-break">Chip set: <span class="fw-bold">${chipSet}</span></p>
            <p class="text-break">Memory: <span class="fw-bold">${memory}</span></p>
            <p class="text-break">Sensors: <span class="fw-bold">${sensors}</span></p>
            <h5 class="text-body fw-bold">Other Information</h5>
            <p class="text-wrap">Storage: <span class="fw-bold">${Bluetooth}</span></p>
            <p class="text-wrap">Display Size: <span class="fw-bold">${WLAN}</span></p>
            <p class="text-wrap">Chip set: <span class="fw-bold">${GPS}</span></p>
            <p class="text-wrap">Memory: <span class="fw-bold">${NFC}</span></p>
            <p class="text-wrap">Sensors: <span class="fw-bold">${Radio}</span></p>
            <p class="text-wrap">Sensors: <span class="fw-bold">${USB}</span></p>
            </div>
        `;
        detailsDiv.appendChild(div);
    }
    //check release date
    const releaseDateText = document.getElementById("release-date");
    const previousReleaseDateText = releaseDateText.innerText;
    if (deviceId.data.releaseDate == 0) {
        releaseDateText.innerText = "Coming Soon";
    }
    else {
        releaseDateText.innerText = deviceId.data.releaseDate;
    }
}
