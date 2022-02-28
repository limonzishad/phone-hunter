// search field
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
const showSearchResults = data => {
    const searchResults = document.getElementById("search-result");
    data.forEach(device => {
        console.log(device);
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
            <div class="card p-3">
                <img src="${device.image}" class="card-img-top device-img" alt="${device.phone_name}">
                <div class="card-body">
                    <h5 class="card-title">Name: ${device.phone_name}</h5>
                    <p class="card-text">Brand: ${device.brand}</p>
                </div>
                <button type="button" class="btn btn-info">Details</button>
            </div>
        `;
        searchResults.appendChild(div);
    });
}