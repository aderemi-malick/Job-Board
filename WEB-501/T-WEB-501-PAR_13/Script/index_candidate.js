


/////////////////////////////////////PAGE SWITCH DISPLAYS///////////////////////////////////////////////////
// var fieldAds = document.getElementById("field_ads");
// var fieldCompanies = document.getElementById("field_companies");
// var fieldTips = document.getElementById("field_tips");
// var divCompanies = document.getElementById("companies");


 async function showAds(event) {
    var fieldAds = document.getElementById("field_ads");
    var fieldCompanies = document.getElementById("field_companies");
    var fieldTips = document.getElementById("field_tips");
    var divCompanies = document.getElementById("companies");
    event.preventDefault();
    fetchAds();
    fieldAds.style.display = "block";
    fieldCompanies.style.display = "none";
    fieldTips.style.display = "none";
    divCompanies.style.display ="none";
   
}

async function showCompanies(event) {
    event.preventDefault();
    var fieldCompanies = document.getElementById("field_companies");
    var fieldTips = document.getElementById("field_tips");
    var fieldAds = document.getElementById("field_ads");
    await fetchCompanies();
    fieldCompanies.style.display = "block";
    
    fieldTips.style.display = "none";
    fieldAds.style.display = "none";
}

async function showTips(event) {
    var fieldCompanies = document.getElementById("field_companies");
    var fieldTips = document.getElementById("field_tips");
    var fieldAds = document.getElementById("field_ads");
    event.preventDefault();
    
    fieldTips.style.display = "block";
    fieldAds.style.display = "none";
    fieldCompanies.style.display = "none";
    
   
}





/////////////////////////////////////API REQUESTS///////////////////////////////////////////////////

const apiUrl = "http://localhost:8000"; // Remplacez par l'URL de votre API si nécessaire




////////////////////////////////////ADS CRUD///////////////////////////////////////////////////

/////////////////////ADS DISPLAY///////////////
// Fonction pour afficher les annonces
async function fetchAds() {
    const response = await fetch(`${apiUrl}/ads`);
    const data = await response.json();
    const adsList = document.getElementById("ads");
    console.log(data);           
    adsList.innerHTML = ""; // Réinitialise la liste

    data.forEach(ad => {
        const adHTML = `
                <fieldset>
                    <legend>REF${ad.id_ads}CTR</legend>
                    <label for="poste">
                        ${ad.titre}
                    </label>
                    <label for="type_contrat">
                        ${ad.contract}
                    </label>
                    <label for="date_debut">
                        ${ad.publish}
                    </label>
                    <a href="#" onclick="showmore()">more</a>
                    <label for="description" class="description" id="description">
                        ${ad.description}
                        <form action="#" method="get">
                            <button onclick="" >Apply</button>
                        </form>
                    </label>

                </fieldset>
            `;

            adsList.innerHTML += adHTML;


            // const item = document.createElement("div");
            // item.innerHTML = `<h3>${ad.description}</h3>`; // Affiche chaque personne
            // console.log(ad.description);
// adsList.style.display ="flex";
//         adsList.style.flexWrap = "wrap";
//         adsList.style.alignItems = "center";
//         adsList.style.justifyContent ="space-around";
//         item.style.margin = "12px" ;
//         item.style.width = "120px" ;
//         item.style.borderBlock = "0.49vw solid #a01a";




    });
};












/////////////////////ADS CREATION///////////////
// Fonction pour créer une nouvelle annonce
async function createAd(event) {
    if(event){event.preventDefault();}
    const sed = {};
    const titre = document.getElementById("titre").value;
    const contract = document.getElementById("contract").value;
    const deadline = new Date(document.getElementById("deadline").value).toDateString() ;
    const place = document.getElementById("place").value;
    const publish = new Date().toDateString();
    const status = document.querySelector('input[name="status"]:checked').value;
    const description = document.getElementById("descr").value;
    const domain = document.getElementById("domain").value;
    const id_people = 1;
  
  
    let dataHead = ["titre", "id_people", "domain", "description", "contract", "deadline", "place", "publish_date", "status"] //
    let dataValues = [titre, id_people, domain, description, contract, deadline, place, publish, status] //
    let i = 0
    dataHead.forEach(element => {
            sed[element] = dataValues[i++];
    });
  
    console.log(sed)
    try {
        const response = await fetch(`${apiUrl}/new_ad`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(sed),
    });
  
      if (response.ok) {
          alert("Annonce créée avec succès !");
          console.log("Annonce créée avec succès !");
      } else {
          console.log("Erreur lors de la création de l'annonce.");
          
      }
    } catch (error) {
      console.log(error.message)
    }
    
  }


  /////////////////////ADS MODIFICATION///////////////
  








/////////////////////COMPANIES DISPLAY///////////////

// Fonction pour afficher les entreprises

async function fetchCompanies() {
    const response = await fetch(`${apiUrl}/companies`);
    const data = await response.json();
    const compList = document.getElementById("companies");
    console.log(data);           
    compList.innerHTML = ""; // Réinitialise la liste

    data.forEach(companie => {
        const item = document.createElement("div");
        item.innerHTML = `<h3>${companie.name}</h3>`; // Affiche chaque personne
        compList.appendChild(item);
        compList.style.display ="flex";
        compList.style.flexWrap = "wrap";
        compList.style.alignItems = "center";
        compList.style.justifyContent ="space-around";
        item.style.margin = "12px" ;
        item.style.width = "120px" ;
        item.style.borderBlock = "0.49vw solid #a01a";


        document.getElementById("addAdButton").addEventListener("click", function() {
            // Code HTML à ajouter
            const adHTML = `
                <fieldset>
                    <legend><input type="text" placeholder="Référence de l'annonce" readonly></input></legend>
                    <label for="poste">
                        <input type="text" placeholder="Titre du poste">
                    </label>
                    <label for="type_contrat">
                        <input type="text" placeholder="Type de contrat">
                    </label>
                    <label for="date_debut">
                        <input type="text" placeholder="Date de prise de poste">
                    </label>
                    <a href="#" onclick="showmore()">more</a>
                    <label for="description" class="description" id="description">
                        <textarea placeholder="Description" rows="15" cols="40"></textarea>
                        <form action="#" method="get">

                        </form>
                    </label>

                </fieldset>
            `;
        
            // Ajouter directement du HTML à la div
            const adList = document.getElementById("adList");
            adList.innerHTML += adHTML; // Ajoute le champ d'annonce à la liste
        });




    });
};
// window.onload =  fetchCompanies;