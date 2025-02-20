///////////////////////////////////////////////// MENU LATERAL //////////////////////////////////////////////////
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("Menu").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("Menu").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

///////////////////////////////////////////INFORMATION DE PROFIL/////////////////////////////////////////////
//Validation et confirmation du mot de passe 
function validatePassword(){
  var mdp = document.getElementById("mdp")
  var confirme_mdp = document.getElementById("confirme_mdp");

if(mdp.value != confirme_mdp.value) {
  confirme_mdp.setCustomValidity("Les mots de passes ne correspondent pas");
} else {
  confirme_mdp.setCustomValidity('');
}
}
/////////////////////////////////////////// CANDIDATURES ///////////////////////////////////////////


/////////////////////////////////////////// Annonces ///////////////////////////////////////////
//Bouton "plus"
function showmore(desc) {
  var description = document.getElementById(`description ${desc}`);
  
  if(description.style.display === "none"){
    description.style.display="block";
  }else{
    description.style.display="none";
  }
}





///////////////////////////////////// ADS DISPLAY ///////////////////////////////////////////////////

const apiUrl = "http://localhost:8000"; // Remplacez par l'URL de votre API si nécessaire

const id = prompt("VotreID?");

async function fetchAds() {
    const response = await fetch(`${apiUrl}/ads/${id}`);
    const data = await response.json();
    const adsList = document.getElementById("ref_annonce");
    console.log(data);           
    adsList.innerHTML = ""; // Réinitialise la liste

    data.forEach(ad => {
        const adHTML = `
                <fieldset style= background-color: beige;">
                    <legend>REF 00${ad.id_ads} CTR</legend>
                    <label for="poste">
                        ${ad.titre}
                    </label>
                    <label for="type_contrat" style="justify-content">
                        ${ad.contract}
                    </label>
                    <label for="date_debut">
                        ${String(ad.publish)}
                    </label>
                    <a href="#" onclick="showmore(${ad.id_ads})">more</a>
                    <label for="description" class="description${ad.id_ads}" id="description${ad.id_ads}">
                        ${ad.description}
                        <form action="#" method="get">
                            <button onclick="" >Apply</button>
                        </form>
                    </label>

                </fieldset>
                
            `;

            adsList.innerHTML += adHTML;

    });
};





async function fetchApplies() {
    
    const response = await fetch(`${apiUrl}/applies/${id}`);
    const data = await response.json();
    const adsList = document.getElementById("candidat");
    console.log(data);           
    adsList.innerHTML = ""; // Réinitialise la liste

    data.forEach(ad => {
        const adHTML = `
                <fieldset style= background-color: beige;">
                    <legend>REF 00${ad.id_ads} CTR</legend>
                    <label for="poste">
                        ${ad.titre}
                    </label>
                    <label for="type_contrat" style="justify-content">
                        ${ad.contract}
                    </label>
                    <label for="date_debut">
                        ${String(ad.publish)}
                    </label>
                    <a href="#" onclick="showmore(${ad.id_ads})">more</a>
                    <label for="description" class="description${ad.id_ads}" id="description${ad.id_ads}">
                        ${ad.description}
                        <form action="#" method="get">
                           
                        </form>
                    </label>

                </fieldset>
                
            `;

            adsList.innerHTML += adHTML;

    });
};







async function addAds() {
    
    
    const adForm = document.getElementById("ref_annonce");
              
    adForm.innerHTML = ""; // Réinitialise la liste

    
    const adHTML = `
        <fieldset class="ads-form" id="ads-form" name="ads-form">
            
            <legend>New offer</legend>
            
                <form  onsubmit="createAd(event)">
                    <label for="titre">Job Title :</label>
                    <input type="text" id="titre" name="titre" required> <br>

                    <label for="domain">Domain :</label>
                    <input type="text" id="domain" name="domain" required> <br>

                    <label for="contract">Contract :</label>
                    <select name="contract" id="contract" required>
                        <option value="cdi">CDI</option>
                        <option value="cdd">CDD</option>
                        <option value="internship">Internship</option>
                        <option value="apprenticeship">Apprenticeship</option>
                        <option value="interim">Interim</option>
                    </select> <br>

                    <label for="deadline">Deadline :</label>
                    <input type="date" id="deadline" name="deadline" value=null> <br>

                    <label for="place">Place :</label>
                    <input type="text" id="place" name="place" required> <br>

                    <label for="status">Status :</label>
                    <input type="radio" id="status1" name="status" value="Available" checked>
                    <label for="status1">Available</label> 
                    <input type="radio" id="status2" name="status" value="Unavailable" required>
                    <label for="status2">Unavailable</label> <br>

                    <label for="descr">Description :</label> <br>
                    <textarea name="description" id="descr" cols="80" rows="10" required> </textarea> <br>
                    <button type="submit"> Submit </button>
                </form>
        
        </fieldset>
`;

            adForm.innerHTML = adHTML;
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

