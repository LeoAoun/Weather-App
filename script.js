const KEY_WEATHER = "cacd3faee9c8c4652fa654dc862d6fb3";
const KEY_UNSPLASH = "bFdu79vocJNexzGNn88nDr5702N99E1hEorGALTI55A";
const UNITS = "metric";

const body = document.querySelector("body");
const input = document.querySelector("#input");
const city = document.querySelector("#city");
const country = document.querySelector("#country");
const temperature = document.querySelector("#temperature");
const weather = document.querySelector("#weather");
const icon_weather = document.querySelector("#icon-weather");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");

// This async function returns a promise that resolves to the data returned by the API.
const dataWeather = async (CITY) => {
  let API_WEATHER = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${KEY_WEATHER}&units=${UNITS}&lang=pt_br`;
  let resWeather = await fetch(API_WEATHER);
  if (!resWeather.ok) throw new Error("City not found");
  let data_weather = await resWeather.json();
  return data_weather;
};

// This async function returns a promise that resolves to the data returned by the API.
const dataUnsplash = async (encodedCity) => {
  let API_UNSPLASH = `https://api.unsplash.com/search/photos?query=${encodedCity}&client_id=${KEY_UNSPLASH}`;
  let resUnsplash = await fetch(API_UNSPLASH);
  if (!resUnsplash.ok) throw new Error("Error to load image");
  let data_unsplash = await resUnsplash.json();
  return data_unsplash;
};

// This function returns the URL of the flag icon
const iconFlag = (data_weather) => {
  let API_FLAG = `https://flagsapi.com/${data_weather.sys.country}/flat/64.png`;
  return API_FLAG;
};

// This function returns the URL of the weather icon
const iconWeather = (data_weather) => {
  let ICON_WEATHER = `https://openweathermap.org/img/wn/${data_weather.weather[0].icon}@2x.png`;
  return ICON_WEATHER;
};

// This function create a new image element to check if the Unsplash image is loaded
const setBackground = (data_unsplash) => {
  const randomIndex = Math.floor(Math.random() * data_unsplash.results.length);
  const imageUrl = data_unsplash.results[randomIndex].urls.full;
  const img = new Image();
  img.src = imageUrl;
  img.onload = () => {
    body.style.backgroundImage = `url(${imageUrl})`;
  };
};

// Capitalize the first letter of each word in the description
const descriptionWeather = (description) => {
  for (let i = 0; i < description.length; i++) {
    description[i] =
      description[i].charAt(0).toUpperCase() + description[i].slice(1);
  }
};

// Display the containers when the search is successful
const flexContainers = () => {
  document.querySelector(".container-city").style.display = "flex";
  document.querySelector(".container-weather").style.display = "flex";
  document.querySelector("footer").style.display = "flex";
};

// Display the text content of the weather data in the HTML elements
const textContent = (data_weather, description) => {
  city.textContent = data_weather.name;
  temperature.textContent = data_weather.main.temp.toFixed(1) + " °C";
  descriptionWeather(description);
  weather.textContent = description.join(" ");
  icon_weather.setAttribute("src", iconWeather(data_weather));
  humidity.textContent = data_weather.main.humidity + "%";
  wind.textContent = data_weather.wind.speed + " km/h";
};

// Event listener for the search button and the Enter key
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") Search();
});

// Search for the city
const Search = async () => {
  let CITY = input.value;
  if (!CITY) return;
  input.value = "";

  try {
    let data_weather = await dataWeather(CITY);
    let encodedCity = encodeURIComponent(
      CITY + " city " + data_weather.sys.country
    );

    let data_unsplash = await dataUnsplash(encodedCity);
    setBackground(data_unsplash);

    let data_flag = iconFlag(data_weather);
    country.setAttribute("src", data_flag);

    flexContainers();

    let description = data_weather.weather[0].description.split(" ");
    textContent(data_weather, description);
  } catch (err) {
    alert(err);
  }
};
