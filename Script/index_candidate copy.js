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





/////////////////////////////////////  DISPLAYS ///////////////////////////////////////////////////

const apiUrl = "http://localhost:8000"; // Remplacez par l'URL de votre API si nécessaire
let id = ""



////////////////////  DISPLAYS //////////////////////////////////////

//Afficher les annonces 
async function fetchAds() {
    const response = await fetch(`${apiUrl}/ads`);
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
                        <form onsubmit="applyNow(id)">
                            <button type="submit" onclick=applyNow(${ad.id_ads}) >Apply</button>
                        </form>
                    </label>

                </fieldset>
                
            `;

            adsList.innerHTML += adHTML;

    });
};
// fetchAds()



//Afficher les candidatures
async function fetchApplies() {
    const id = parseInt(prompt("VotreID?"));
    const response = await fetch(`${apiUrl}/my_applies/${id}`);
    const data = await response.json();
    const appliesList = document.getElementById("candidat");
    console.log(data);           
    appliesList.innerHTML = ""; // Réinitialise la liste
  try {
    if (data) {
      data.forEach(apply => {
        const adHTML = `
                <fieldset style= background-color: beige;">
                    <legend> ${apply.apply_date} </legend>
                    <label for="poste">
                        ${apply.titre}
                    </label>
                    <label for="type_contrat" style="justify-content">
                        ${apply.contract}
                    </label>

                    <a href="#" onclick="showmore(${apply.id_ads})">more</a>
                    <label for="description" class="description${apply.id_ads}" id="description${apply.id_ads}">
                    ${apply.description}
                    </label>

                </fieldset>
                
            `;

            appliesList.innerHTML += adHTML;

    });
    } else {
      const erHTML = `<fieldset style= background-color: beige;"><h3>Vous n'avez pas encore postulé.<h3></fieldset>`;
      appliesList.innerHTML += erHTML;
    }
    
  } catch (error) {
    console.log(error.message)
  }
    
};
// fetchApplies()


/////////////////////////////////////  POSTS ///////////////////////////////////////////////////

// Fonction pour postuler a une annonce
async function applyNow(id,adID,) { 
    const sed = {};
    const id_people = id;
    const id_ads = adID;
    const appdate = new Date().toDateString();
    let dataHead = ["id_people", "id_ads", "appdate"]; //
    let dataValues = [id_people, id_ads, appdate]; //
    let i = 0
    dataHead.forEach(element => {
            sed[element] = dataValues[i++];
    });
  
    console.log(sed)
    try {
        const response = await fetch(`${apiUrl}/new_apply`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(sed),
    });
  
      if (response.ok) {
          alert("Votre candidature a été enregistrée !");
          console.log("Votre candidature a été enregistrée !");
          id = companieName;
      } else {
          console.log("Erreur lors de la candidature!");
      }
    } catch (error) {
      console.log(error.message)
    }
    
  }