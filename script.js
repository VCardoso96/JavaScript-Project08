let locationButton = document.getElementById("get-location");
let locationDiv = document.getElementById("location-details");

locationButton.addEventListener("click", () => {

  //A APU de geolocalização é usada para obter a posição geográfica de um usuário e está disponível dentro do objeto do navegador.
  if (navigator.geolocation) {

    //retorna a posição (latitude e longitude) ou erro.
    navigator.geolocation.getCurrentPosition(showLocation, checkError);
  } else {

    //Para navegador antigo, ou seja, IE.
    locationDiv.innerText = "The browser does not support geolocation";
  }
});


//Verificações de erro
const checkError = (error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      locationDiv.innerText = "Please allow access to location";
      break;
    case error.POSITION_UNAVAILABLE:

      //geralmente disparado para firefox
      locationDiv.innerText = "Location Information unavailable";
      break;
    case error.TIMEOUT:
      locationDiv.innerText = "The request to get user location timed out";
  }
};

const showLocation = async (position) => {

  //Usamos a API NOminatim para obter endereços reais de latitude e longitude
  let response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
  );
  
  //armazenar objeto de resposta
  let data = await response.json();
  locationDiv.innerText = `${data.address.city}, ${data.address.country}`;
};
