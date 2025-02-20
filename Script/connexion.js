function affichage_mdp_oublié_candidat() {
    var mdp_oublié_candidat = document.getElementById("mdp_oublié_candidat");
    var connexion_candidat= document.getElementById("connexion_candidat");
      
    if (mdp_oublié_candidat.style.display === "none") {
        mdp_oublié_candidat.style.display = "block"; //S'affiche lorsque que l'on clique sur le bouton "Mot de passe oublié ?"
        connexion_candidat.style.display = "none"; //Ne s'affiche pas lorsqu'on clique sur le bonton "Mot de passe oublié ?"
    }
      else {
        mdp_oublié_candidat.style.display = "none";//Ne s'affiche pas lorsqu'aucune action n'est faite
    }
  }

function affichage_connexion_candidat() {
  var mdp_oublié_candidat = document.getElementById("mdp_oublié_candidat");
  var connexion_candidat= document.getElementById("connexion_candidat");
    
  if (connexion_candidat.style.display === "none") {
      connexion_candidat.style.display = "block"; //S'affiche lorsque que l'on clique sur le bouton "Espace candidat"
      mdp_oublié_candidat.style.display = "none"; //Ne s'affiche pas lorsqu'on clique sur le bonton "Espace candidat"
  }
    else {
      connexion_candidat.style.display = "none";//Ne s'affiche pas lorsqu'aucune action n'est faite
  }
}




/////////////////////////////////////  CONNECTION ///////////////////////////////////////////////////

const apiUrl = "http://localhost:8000"; // Remplacez par l'URL de votre API si nécessaire

// Seconnecter
async function fetchConnection(event) {
  if(event){event.preventDefault();}
  const login = String(document.getElementById("mail").value);
  const passClear = String(document.getElementById("mdp").value);
  console.log(login);
  console.log(passClear);
  try {
    const response = await fetch(`${apiUrl}/login/${login}`);
    const data = await response.json();
    
    console.log(data);
    if (response.ok) {
      data.forEach(account => {
        if(account.status == "Candidat"){
          alert("Connexion en cours!!");
          console.log("Connexion en cours!!");
          window.location = "../HTML/Candidats/index_candidate.html";
        }
        else{
          alert("éeesayer la connexion!");
          console.log("Réesayer la connexion!");
        }


      });
      
    } else {
      console.log("Erreur lors de la connexion");
    }
  } catch (error) {
    console.log(error.message)
  }

};

  