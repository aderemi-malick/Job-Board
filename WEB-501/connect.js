const apiUrl = "http://localhost:8000"; // Remplacez par l'URL de votre API si nécessaire

// Fonction pour créer une nouvelle personne
async function createPerson() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;

    const response = await fetch(`${apiUrl}/people`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ first_name: firstName, last_name: lastName }),
    });

    if (response.ok) {
        alert("Personne créée avec succès !");
        fetchPersons(); // Rafraîchit la liste des personnes
    } else {
        alert("Erreur lors de la création de la personne.");
    }
}

// Appelle la fonction pour récupérer les personnes lors du chargement de la page
window.onload = fetchPersons;