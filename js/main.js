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
                <button onclick="showDeviceDetails('${device.slug}')" type="button" class="btn btn-info">Details</button>
            </div>
        `;
        searchResults.appendChild(div);
    });
}
//shows device result
const showDeviceDetails = deviceId => {
    const dynamicUrl = `https://openapi.programming-hero.com/api/phone/${deviceId}`;
    fetch(dynamicUrl)
        .then(response => response.json())
        .then(details => details.mainFeatures)
    console.log(deviceId);
    //const deviceDetails = document.getElementById("")
}