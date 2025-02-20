const apiUrl = "http://localhost:8000"; // Remplacez par l'URL de votre API si nécessaire
let id = ""

async function fetchAds() {
    const response = await fetch(`${apiUrl}/ads`);
    const data = await response.json();
    const adsList = document.getElementById("tab-ad");
    console.log(data);           
    adsList.innerHTML = ""; // Réinitialise la liste

    data.forEach(ad => {
        const adHTML = `

            <tr>
                <td>${ad.id_people}</td>
                <td> ${ad.titre}</td>
                <td>${ad.id_ads}</td>
                <td>${ad.description}</td>
                <td>${ad.contract}</td>
                <td>${ad.deadline}</td>
                <td>${ad.place}</td>
                <td>${ad.publish_date}</td>
                <td>${ad.status}</td>
                <td>${ad.domain}</td>
            </tr>       
            
        
            
            
            `;

            adsList.innerHTML += adHTML;

    });
};
fetchAds()




async function fetchApplies() {
    const response = await fetch(`${apiUrl}/applies`);
    const data = await response.json();
    const applyList = document.getElementById("tab-apply");
    console.log(data);           
    applyList.innerHTML = ""; // Réinitialise la liste

    data.forEach(apply => {
        const adHTML = `
               <tr>
                <td>${apply.id_ads}</td>
                <td> ${apply.id_people}</td>
                <td>${apply.apply_date}</td>
            </tr>
                
            `;

            applyList.innerHTML += adHTML;

    });
};
fetchApplies()






async function fetchCompanies() {
    const response = await fetch(`${apiUrl}/companies`);
    const data = await response.json();
    const compList = document.getElementById("tab-companie");
    console.log(data);           
    compList.innerHTML = ""; // Réinitialise la liste

    data.forEach(companie => {
        const adHTML = `
               <tr>
                <td>${companie.id_companies}</td>
                <td>${companie.name}</td>
                <td>${companie.description}</td>
                <td>${companie.place}</td>
                <td>${companie.type_companies}</td>
                <td>${companie.sector}</td>
                <td>${companie.place}</td>
            </tr>
                
            `;

            compList.innerHTML += adHTML;

    });
};
fetchCompanies()




async function fetchPeople() {
    const response = await fetch(`${apiUrl}/peoples`);
    const data = await response.json();
    const persList = document.getElementById("tab-people");
    console.log(data);           
    persList.innerHTML = ""; // Réinitialise la liste

    data.forEach(person => {
        const adHTML = `
               <tr>
                <td>${person.id_people}</td>
                <td>${person.lastname}</td>
                <td>${person.firstname}</td>
                <td>${person.email}</td>
                <td>${person.number}</td>
                <td>${person.password}</td>
                <td>${person.status}</td>
                <td>${person.gender}</td>
                <td>${person.age}</td>
                <td>${person.address}</td>
                <td>${person.resume}</td>
                <td>${person.id_companies}</td>
            </tr>
                
            `;

            persList.innerHTML += adHTML;

    });
};
fetchPeople()