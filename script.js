let apiKey = "b56876f65a3e96144efd4380c971ee8f";
let apiURL = "https://api.openweathermap.org/data/2.5/weather";

//fonction  pour récupérer des données météorologiques à partir d'une API météorologique.
let getWeather = (city) => {
  //construire L'URL de l'api avec la ville et le clé api
  const url = `${apiURL}?q=${city}&appid=${apiKey}`;
  // Utiliser fetch() pour envoyer une requête à l'API
  fetch(url)
    //vérifier si la réponse est correcte (code 200)
    .then((response) => {
        console.log (response)
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json(); // extraire la reponse json
    })
    .then((data) => {
      console.log(data); // Traiter les données
      //Extraire les données nécessaires de la reponse json
      const location = `${data.name}, ${data.sys.country}`; // Extraire le nom de la ville ainsi que la pays
      const description = data.weather[0].description; //description de la température
      const temperature = `${data.main.temp}°C`; //Extraire la température

      //mettre a jour le contenu html avec les données récupérrés
      document.getElementById("location").textContent = location;
      document.getElementById("description").textContent = description;
      document.getElementById("temperature").textContent = temperature;
    })
    .catch((error) => {
      console.error("Erreur:", error);
      //afficher une erreur si elle est produite
      alert(error.message);
    });
};

//gzstionnaire d'évenement pour avoir une réponse lorsqu'on clique sur le bouton
document.getElementById('weather-form').addEventListener('submit',function(event){
    event.preventDefault(); // Empêcher la soumission du formulaire (éviter le rechargement de la page)
    const city = document.getElementById('city-input').value; // Récupérer la ville saisie par l'utilisateur
    if (city) {
      getWeather(city); // Appeler la fonction pour obtenir la météo
    } else {
      alert('Veuillez entrer une ville.');
    }
  });