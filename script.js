const KEY_WEATHER = 'cacd3faee9c8c4652fa654dc862d6fb3'
const KEY_UNSPLASH = "bFdu79vocJNexzGNn88nDr5702N99E1hEorGALTI55A";
const UNITS = 'metric'

const input = document.querySelector("#input")
const city = document.querySelector("#city")
const country = document.querySelector("#country")
const temperature = document.querySelector("#temperature")
const weather = document.querySelector("#weather")
const icon_weather = document.querySelector("#icon-weather")
const humidity = document.querySelector("#humidity")
const wind = document.querySelector("#wind")

document.querySelector(".container-city").style.display = "none"
document.querySelector(".container-weather").style.display = "none"

document.querySelector("footer").style.display = "none"



function Search() {
    let CITY = input.value
    let API_WEATHER = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${KEY_WEATHER}&units=${UNITS}&lang=pt_br`;

    fetch(API_WEATHER)
        .then(res => res.json())
        .then(data => {

            country.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/48.png`)

            fetch(`https://api.unsplash.com/search/photos?query=${CITY}&collections=cityscape`, {
                headers: {
                    Authorization: `Client-ID ${KEY_UNSPLASH}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    const randomIndex = Math.floor(Math.random() * data.results.length);
                    const imageUrl = data.results[randomIndex].urls.regular;

                    const body = document.querySelector('body');
                    body.style.backgroundImage = `url('${imageUrl}')`
                    body.style.backgroundPosition = "center"
                    body.style.backgroundSize = "cover"
                    body.style.backgroundRepeat = "no-repeat"
                })
                .catch(error => {

                });

            setTimeout(() => {
                document.querySelector(".container-city").style.display = "flex"
                document.querySelector(".container-weather").style.display = "flex"
                document.querySelector("footer").style.display = "flex"

                city.textContent = data.name
                temperature.textContent = (data.main.temp).toFixed(1) + " °C"

                let description = (data.weather[0].description).split(" ")
                for (let i = 0; i < description.length; i++) {
                    description[i] = description[i].charAt(0).toUpperCase() + description[i].slice(1)
                }
                weather.textContent = description.join(" ")
                icon_weather.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)

                humidity.textContent = data.main.humidity + "%"
                wind.textContent = data.wind.speed + " km/h"

            }, 500)

        })
        .catch(error => {
            throw new Error()
        })


}




