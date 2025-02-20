const apiUrl = "http://localhost:8000"; // Remplacez par l'URL de votre API si nécessaire

        // Fonction pour récupérer toutes les personnes
        async function createPeople() {
            const response = await fetch(`${apiUrl}/people`);
            const data = await response.json();
            const list = document.getElementById("personList");
            list.innerHTML = ""; // Réinitialise la liste

            data.forEach(person => {
                const item = document.createElement("li");
                item.textContent = person; // Affiche chaque personne
                list.appendChild(item);
            });
        }

        // Fonction pour créer une nouvelle personne
        async function createPerson(event) {
            event.preventDefault(); // Empêche le rechargement de la page

            const firstName = document.getElementById("firstName").value;
            const lastName = document.getElementById("lastName").value;

            const response = await fetch(`${apiUrl}/person`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ first_name: firstName, last_name: lastName }),
            });

            if (response.ok) {
                alert("Personne créée avec succès !");
                fetchPersons(); // Rafraîchit la liste des personnes
                document.getElementById("personForm").reset(); // Réinitialise le formulaire
            } else {
                alert("Erreur lors de la création de la personne.");
            }
        }

        // Appelle la fonction pour récupérer les personnes lors du chargement de la page
        window.onload = fetchPersons;