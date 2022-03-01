// gets search input
const searchPhone = () => {
    const searchInput = document.getElementById("searched-phone");
    const searchText = searchInput.value;
    if (searchText == " " || searchText == "") {
        console.log("error");
    }
    else {
        searchInput.value = "";
        const dynamicUrl = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(dynamicUrl)
            .then(response => response.json())
            .then(devices => showSearchResults(devices.data));
    }
}
//shows search results
const showSearchResults = data => {
    const searchResults = document.getElementById("search-result");
    searchResults.textContent = ""; // clears previous search results
    if (data.length == 0) {
        console.log('no data found');
    }
    else {
        data.forEach(device => {
            const div = document.createElement("div");
            div.classList.add("col");
            div.innerHTML = `
                <div class="card h-100 p-3">
                    <img src="${device.image}" class="card-img-top device-img" alt="${device.phone_name}">
                    <div class="card-body">
                        <h5 class="card-title">Name: ${device.phone_name}</h5>
                        <p class="card-text">Brand: ${device.brand}</p>
                    </div>
                    <button onclick="loadDeviceDetails('${device.slug}')" type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button>
                </div>
            `;
            searchResults.appendChild(div);
        });
    }
}
//loads device result
const loadDeviceDetails = deviceId => {
    const dynamicUrl = `https://openapi.programming-hero.com/api/phone/${deviceId}`;
    fetch(dynamicUrl)
        .then(response => response.json())
        .then(details => showDeviceDetails(details.data.mainFeatures));
}
//remove previous modal
const removeModal = () => {
    const previousModal = document.getElementById("remove-previous-modal");
    const albal = previousModal.children[0];
    previousModal.removeChild(albal);
}
//shows device result
const showDeviceDetails = deviceId => {
    const deviceDetails = document.getElementById("device-details");
    const detailsDiv = document.getElementById("remove-previous-modal");
    //console.log(deviceId);
    deviceId.innerHTML = "";
    const div = document.createElement("div");
    div.classList.add("modal-content");
    div.innerHTML = `    
        <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
            <button onclick="removeModal()" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            ...
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary">Understood</button>
        </div>
    `;
    detailsDiv.appendChild(div);
}
