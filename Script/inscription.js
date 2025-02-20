//////////////////////////////////////////////LES FORMULAIRES//////////////////////////////////////////////////////
// Fonction pour afficher le formulaire du candidat
function affichage_profil_candidat() {
    var candidat = document.getElementById("candidat");
    var recruteur = document.getElementById("recruteur");
    candidat.style.display = "none";
    
    if (candidat.style.display === "none") {
      recruteur.style.display = "none"; //Ne s'affiche pas lorsqu'on clique sur le bonton "candidat"  
      candidat.style.display = "block"; //S'affiche lorsque que l'on clique sur le bouton "candidat"
        
      }  else {
        candidat.style.display = "none";//Ne s'affiche pas lorsqu'aucune action n'est faite
    } 

}
// Fonction pour afficher le formulaire du recruteur
function affichage_profil_recruteur() {
  var candidat = document.getElementById("candidat")
  var recruteur = document.getElementById("recruteur");
  var companieInfo = document.getElementById("comp");
  var recruteInfo = document.getElementById("recrute");

  recruteInfo.style.display = "none"; 
  
  if (recruteur.style.display === "none") {
    candidat.style.display = "none";  
    recruteur.style.display = "block";//S'affiche lorsqu'on clique sur le bouton "recruteur"
    if (companieInfo.style.display === "none") {
      recruteInfo.style.display = "block"; 
    }
      
    //Ne s'affiche pas lorsqu'on clique sur le bouton "recruteur"
  } else {
      recruteur.style.display = "none";//Ne s'affiche pas lorsqu'aucune action n'est faite
      }
}
//////////////////////////////////////////////LES MOTS DE PASSES///////////////////////////////////////////////////

//Validation et confirmation du mot de passe candidat
function validatePassword_candidat(){
    var mdp_candidat = document.getElementById("mdp_candidat")
    var confirme_mdp_candidat = document.getElementById("confirme_mdp_candidat");

  if(mdp_candidat.value != confirme_mdp_candidat.value) {
    confirme_mdp_candidat.setCustomValidity("Les mots de passes ne correspondent pas");
  } else {
    confirme_mdp_candidat.setCustomValidity('');
  }
}

/* mdp_candidat.onchange = validatePassword;
confirme_mdp_candidat.onkeyup = validatePassword; */

//Validation et confirmation du mot de passe recruteur
function validatePassword_recruteur(){
    var mdp_recruteur = document.getElementById("mdp_recruteur")
    var confirme_mdp_recruteur = document.getElementById("confirme_mdp_recruteur");

  if(mdp_recruteur.value != confirme_mdp_recruteur.value) {
    confirme_mdp_recruteur.setCustomValidity("Les mots de passes ne correspondent pas");
  } else {
    confirme_mdp_recruteur.setCustomValidity('');
  }
  }

/* mdp_recruteur.onchange = validatePassword;
confirme_mdp_recruteur.onkeyup = validatePassword; */


/////////////////////////////////////USER CREATION///////////////////////////////////////////////////

const apiUrl = "http://localhost:8000"; // Remplacez par l'URL de votre API si nécessaire
let id = ""
// Fonction pour créer un nouveau candidat
async function createCandidate(event) {
    if(event){event.preventDefault();}
    const sed = {};
    const firstName = document.getElementById("prenom_candidat").value;
    const lastName = document.getElementById("nom_candidat").value;
    let  age = Math.abs(parseInt(new Date().getFullYear() - new Date(document.getElementById("naissance_candidat").value).getFullYear()));
    const address = document.getElementById("adresse").value;
    const city = document.getElementById("ville").value;
    const postal = document.getElementById("code_postale_candidat").value;
    const mail = document.getElementById("mail_candidat").value;
    const phoneNumber = document.getElementById("phone_candidat").value;
    //const status = "Candidat";
    const resume = document.getElementById("resume").value;
    //const id_companies = null;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const passWord = document.getElementById("confirme_mdp_candidat").value;
    const real_address = `${address} ${city} ${postal}` 

  
    let dataHead = ["lastname", "firstname", "email", "number", "password", "gender", "age", "address", "resume"] //"status","id_companies"
    let dataValues = [lastName, firstName, mail, phoneNumber, passWord, gender, age, real_address, resume, ] //status, id_companies
    let i = 0
    dataHead.forEach(element => {
            sed[element] = dataValues[i++];
    });

    console.log(sed)
    try {
        const response = await fetch(`${apiUrl}/people_candidat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(sed),
    });

      if (response.ok) {
          alert("Personne créée avec succès !");
          console.log("Personne créée avec succès !");
      } else {
          console.log("Erreur lors de la création de la personne.");
      }
    } catch (error) {
      console.log(error.message)
    }
    
}



// Fonction pour créer un nouveau recruteur
async function createRecrutor(event) {
  if(event){event.preventDefault();}
  const sed = {};
  const firstName = document.getElementById("prenom_recruteur").value;
  const lastName = document.getElementById("nom_recruteur").value;
  const mail = document.getElementById("mail_recruteur").value;
  const phoneNumber = document.getElementById("phone_recruteur").value;
  const passWord = document.getElementById("confirme_mdp_recruteur").value;
  const status = "RH";
  const id_companies = parseInt(await fetchCompanieId(id)) ;

 /*  const address = document.getElementById("adresse").value;
  const city = document.getElementById("ville").value;
  const postal = document.getElementById("code_postale_recruteur").value;
  const real_address = `${address} ${city} ${postal}`; */
  
  let dataHead = ["lastname", "firstname", "email", "number", "password","status", "id_companies"] //
  let dataValues = [lastName, firstName, mail, phoneNumber, passWord, status, id_companies] //
  let i = 0
  dataHead.forEach(element => {
          sed[element] = dataValues[i++];
  });

  console.log(sed)
  try {
      const response = await fetch(`${apiUrl}/people_recrutor`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(sed),
  });

    if (response.ok) {
        alert("Personne créée avec succès !");
        console.log("Personne créée avec succès !");
    } else {
        console.log("Erreur lors de la création de la personne.");
    }
  } catch (error) {
    console.log(error.message)
  }
  
}


/////////////////////////////////////ADS CREATION///////////////////////////////////////////////////

// // Fonction pour créer une nouvelle annonce
// async function createAd(event) {
//   if(event){event.preventDefault();}
//   const sed = {};
//   const titre = document.getElementById("titre").value;
//   const contract = document.getElementById("contract").value;
//   const deadline = new Date(document.getElementById("deadline").value).toLocaleDateString() ;
//   const place = document.getElementById("place").value;
//   const publish = new Date().toLocaleDateString();
//   const status = document.getElementById("status").value;
//   const description = document.getElementById("descr").value;
//   const domain = document.getElementById("domain").value;
//   const id_people = 1;


//   let dataHead = ["titre", "id_people", "domain", "description", "contract", "deadline", "place", "publish_date", "status"] //
//   let dataValues = [titre, id_people, domain, contract, description, contract, deadline, place, publish, status] //
//   let i = 0
//   dataHead.forEach(element => {
//           sed[element] = dataValues[i++];
//   });

//   console.log(sed)
//   try {
//       const response = await fetch(`${apiUrl}/new_ad`, {
//       method: "POST",
//       headers: {
//           "Content-Type": "application/json",
//       },
//       body: JSON.stringify(sed),
//   });

//     if (response.ok) {
//         alert("Annonce créée avec succès !");
//         console.log("Annonce créée avec succès !");
//     } else {
//         console.log("Erreur lors de la création de l'annonce.");
//     }
//   } catch (error) {
//     console.log(error.message)
//   }
  
// }

/////////////////////////////////////COMPANIES CREATION///////////////////////////////////////////////////

// Fonction pour créer une nouvelle entreprise
async function createCompanie(event) {
  var companieInfo = document.getElementById("comp");
  var recruteInfo = document.getElementById("recrute");
  if(event){event.preventDefault();}
  
    
  companieInfo.style.display= "none";
  recruteInfo.style.display = "block";

  
  const sed = {};
  const companieName = document.getElementById("entreprise").value;
  const description = document.getElementById("desc_companie").value;
  const type = document.getElementById("type").value;
  const sector = document.getElementById("sector").value;
  const address = document.getElementById("adresse").value;
  const city = document.getElementById("ville").value;
  const postal = document.getElementById("code_postale_recruteur").value;
  const real_address = `${address} ${city} ${postal}`;
  
  let dataHead = ["name", "description", "place", "type_companies", "sector"]; //
  let dataValues = [companieName, description, real_address, type, sector]; //
  let i = 0
  dataHead.forEach(element => {
          sed[element] = dataValues[i++];
  });

  console.log(sed)
  try {
      const response = await fetch(`${apiUrl}/new_companie`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(sed),
  });

    if (response.ok) {
        alert("Entreprise créée avec succès !");
        console.log("Entreprise créée avec succès !");
        id = companieName;
    } else {
        console.log("Erreur lors de la création de la personne.");
    }
  } catch (error) {
    console.log(error.message)
  }
  
}



// Récupérer l'id de la nouvelle entreprise
async function fetchCompanieId(id) {
  const response = await fetch(`${apiUrl}/companie_id/${id}`);
  const data = await response.json();
  console.log(typeof(data), data);
  return parseInt(data);            
};

//fetchCompanieId("Cardinal")


/* // Seconnecter
async function fetchConnection(login, passClear) {
  const login = document.getElementById("email").value;
  const passClear = document.getElementById("mdp").value;
  try {
    const response = await fetch(`${apiUrl}/login/${login}${passClear}`);
    const data = await response.json();
    const adsList = document.getElementById("ref_annonce");
    console.log(data);
    if (response.ok) {
      data.forEach(account => {
        if(account.status == "Candidat"){
          alert("Connection en cours!!");
          console.log("Connection en cours!!");
          window.location = "Candidats/index_candidate.html";
        }


      });
      
    } else {
      console.log("Erreur lors de la connexion");
    }
  } catch (error) {
    console.log(error.message)
  }

}; */