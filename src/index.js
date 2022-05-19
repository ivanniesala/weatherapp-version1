let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let date = now.getDate();
let year = now.getFullYear();

let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
  `Sunday`,
];

let day = days[now.getDay()];
let months = [
  `Jan`,
  `Feb`,
  `March`,
  `Apr`,
  `May`,
  `Jun`,
  `Jul`,
  `Aug`,
  `Sept`,
  `Oct`,
  `Nov`,
  `Dec`,
];
let month = months[now.getMonth()];
let h2 = document.querySelector("h2");
h2.innerHTML = `Today is ${day}, ${month} ${date}, ${year}`;

let h3 = document.querySelector("h3");
h3.innerHTML = `${hours}:${minutes}`;

function enterCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search");
  if (cityInput.value) {
    let h1 = document.querySelector("h1");
    h1.innerHTML = `${cityInput.value}`;
  }
}
let newCity = document.querySelector("#search-form");
newCity.addEventListener("submit", enterCity);
{
  function showNewCity(response) {
    document.querySelector("#currentCity").innerHTML = response.data.name;
    let cityTemp = document.querySelector("#currentTemp");
    let temprature = Math.round(response.data.main.temp);
    cityTemp.innerHTML = `${temprature}°F`;

    let humidity = document.querySelector("#humidity");
    let humidityNewCity = response.data.main.humidity;
    humidity.innerHTML = `Humidity ${humidityNewCity}%`;

    let windspeed = document.querySelector("#wind");
    let windNewCity = response.data.wind.speed;
    windspeed.innerHTML = `Windspeed ${windNewCity} mph`;
  }

  function searchNewCity(city) {
    let apiKey = "1cf93c53721ba9b39c4037c0ca420677";
    let searchNewCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(`${searchNewCityUrl}&appid=${apiKey}`).then(showNewCity);
  }

  function newCitySearch(event) {
    event.preventDefault();
    let city = document.querySelector("#search").value;
    searchNewCity(city);
  }
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", newCitySearch);

  function degreeFahren(event) {
    event.preventDefault();
    let showFahrenheit = document.querySelector("#currentTemp");
    showFahrenheit.innerHTML = "68°F";
  }

  function currentLocation(response) {
    let h1 = document.querySelector("h1");
    let temperature = Math.round(response.data.main.temp);
    h1.innerHTML = `Your current location is ${response.data.name}`;
    let currentLocationTemp = document.querySelector("#currentTemp");
    currentLocationTemp.innerHTML = `${temperature}°F`;
    let humidity = document.querySelector("#humidity");
    let humidityNewCity = response.data.main.humidity;
    humidity.innerHTML = `Humidity ${humidityNewCity}%`;

    let windspeed = document.querySelector("#wind");
    let windNewCity = response.data.wind.speed;
    windspeed.innerHTML = `Windspeed ${windNewCity} mph`;
  }

  function searchLocation(position) {
    let apiKey = "1cf93c53721ba9b39c4037c0ca420677";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(currentLocation);
  }

  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }

  let currentLocationButton = document.querySelector("#currentLocationButton");
  currentLocationButton.addEventListener("click", getCurrentLocation);

  let fTemp = document.querySelector("#fahrenheit");
  fTemp.addEventListener("click", degreeFahren);

  function degreeCel(event) {
    let showCelsius = document.querySelector("#currentTemp");
    showCelsius.innerHTML = "19°C";
  }
  let cTemp = document.querySelector("#celsius");
  cTemp.addEventListener("click", degreeCel);
}
