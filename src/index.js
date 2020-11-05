let now = new Date();
let today = document.querySelector("#today-date");
let hours = now.getHours();
let minutes = now.getMinutes();
let date = now.getDate();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];
let year = now.getFullYear();
today.innerHTML = `${hours}:${minutes}, ${date} ${month}, ${year}`;

let form = document.querySelector("#search-form");
form.addEventListener("submit", changeCity);

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let h1 = document.querySelector("#city");
  h1.innerHTML = `${cityInput.value}`;

  searchCity(cityInput.value);
}

function searchCity(city) {
  let apiKey = "6587439784dfce495ce2e9a920c7a656";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}
&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
  axios.get(apiUrl).then(showRain);
}

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${temperature}`;
}

function showRain(response) {
  let rain = response.data.weather[0].main;
  let rainElement = document.querySelector("#precipitation");
  rainElement.innerHTML = `${rain}`;
}

let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentPosition);

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "6587439784dfce495ce2e9a920c7a656";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
  axios.get(apiUrl).then(showRain);
}
