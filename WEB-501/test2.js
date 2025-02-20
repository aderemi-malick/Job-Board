//Test get all companies 
const apiUrl = "http://127.0.0.1:8000";
async function fetchCompanies(event) {
    if(event){event.preventDefault();}
    const response = await fetch(apiUrl);
    const data = await response.json();
    /* const list = document.getElementById("personList");
    data.forEach(row => {
        const item = document.createElement("div");
        item.innerHTML = `<h2>${row.name}</h2>`;
        list.appendChild(item);
        console.log(row);
    }); */
    console.log(data);
    return data;            
};
fetchCompanies();


//Test get all peoples 

async function fetchPeoples(event) {
    if(event){event.preventDefault();}
    const response = await fetch(`${apiUrl}/peoples`);
    const data = await response.json();
    /* const list = document.getElementById("personList");
    data.forEach(row => {
        const item = document.createElement("div");
        item.innerHTML = `<h2>${row.name}</h2>`;
        list.appendChild(item);
        console.log(row);
    }); */
    console.log(data);
    return data;            
};
fetchPeoples();



//Test get all ads 

async function fetchAds(event) {
    if(event){event.preventDefault();}
    const response = await fetch(`${apiUrl}/ads`);
    const data = await response.json();
    /* const list = document.getElementById("personList");
    data.forEach(row => {
        const item = document.createElement("div");
        item.innerHTML = `<h2>${row.name}</h2>`;
        list.appendChild(item);
        console.log(row);
    }); */
    console.log(data);
    return data;            
};
fetchAds();




//Test get all applies 

async function fetchApplies(event) {
    if(event){if(event){event.preventDefault();}}
    const response = await fetch(`${apiUrl}/applies`);
    const data = await response.json();
    /* const list = document.getElementById("personList");
    data.forEach(row => {
        const item = document.createElement("div");
        item.innerHTML = `<h2>${row.name}</h2>`;
        list.appendChild(item);
        console.log(row);
    }); */
    console.log(data);
    return data;            
};
fetchApplies();