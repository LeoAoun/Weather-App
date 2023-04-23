const KEY_WEATHER = 'cacd3faee9c8c4652fa654dc862d6fb3'
const KEY_PIXABAY = "35690287-8c3c7b66508c0a4021d6a3276"
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
    if(!CITY) return
    let API_WEATHER = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${KEY_WEATHER}&units=${UNITS}&lang=pt_br`

    fetch(API_WEATHER)
        .then(res => res.json())
        .then(data_weather => {

            let API_PIXABAY = `https://pixabay.com/api/?key=${KEY_PIXABAY}&q=${CITY}%2Ccity&category=travel&image_type=photo`

            country.setAttribute("src", `https://flagsapi.com/${data_weather.sys.country}/flat/48.png`)

            fetch(API_PIXABAY)
                .then(res => res.json())
                .then(data_pixabay => {
                    const randomIndex = Math.floor(Math.random() * data_pixabay.hits.length)
                    const imageUrl = data_pixabay.hits[randomIndex].webformatURL;
                    const body = document.querySelector('body')
                    
                    body.style.backgroundImage = `url('${imageUrl}')`
                    body.style.backgroundPosition = "center"
                    body.style.backgroundSize = "cover"
                    body.style.backgroundRepeat = "no-repeat"
                })

            setTimeout(() => {
                document.querySelector(".container-city").style.display = "flex"
                document.querySelector(".container-weather").style.display = "flex"
                document.querySelector("footer").style.display = "flex"

                city.textContent = data_weather.name
                temperature.textContent = (data_weather.main.temp).toFixed(1) + " °C"

                let description = (data_weather.weather[0].description).split(" ")
                for (let i = 0; i < description.length; i++) {
                    description[i] = description[i].charAt(0).toUpperCase() + description[i].slice(1)
                }
                weather.textContent = description.join(" ")
                icon_weather.setAttribute("src", `https://openweathermap.org/img/wn/${data_weather.weather[0].icon}@2x.png`)

                humidity.textContent = data_weather.main.humidity + "%"
                wind.textContent = data_weather.wind.speed + " km/h"

            }, 500)

        })
        .catch(error => {

        })




}




