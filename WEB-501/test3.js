const apiUrl = "http://localhost:8000"; // Remplacez par l'URL de votre API si nécessaire


// async function fetchCompanieId(pam) {
//     const response = await fetch(`${apiUrl}/companie_id/${pam}`);
//     const data =  await response.json();
//     //console.log(data);
//     let ids = data[0]
//     return data[0]; 

//   };
  
//   let p = await fetchCompanieId("Cardinal")
//   console.log(p)

async function fetchCompanieId(id) {
    const response = await fetch(`${apiUrl}/companie_id/${id}`);
    const data = await response.json();
    console.log(typeof(data), data);
    return parseInt(data);            
  };

let p = await fetchCompanieId("Cardinal")
console.log(p)