const searchBtn = document.querySelector("#search-btn")
const searchInput = document.querySelector("#search-input")
const temp = document.querySelector(".temperature")
const cityName = document.querySelector(".city-name")
const weatherDescription = document.querySelector(".weather-description")
const feelsLikeTemp = document.querySelector(".feels-like-temp")
const humidity = document.querySelector(".humidity")
const windSpeed = document.querySelector(".wind-speed")
const weatherIcon = document.querySelector(".weather-icon")
const appContainer = document.querySelector(".app-container")
let currentTemp = null
let isCelsius = true
let feelTemp = null
const tempToggleBtn = document.querySelector(".temperature-toggle")
const API_KEY = import.meta.env.VITE_API_KEY

searchBtn.addEventListener("click", handleSearch)

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleSearch()
    }
})

function handleSearch() {
    fetchWeather(searchInput.value)
}

async function fetchWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    const data = await response.json()
    console.log(data)
    updateUI(data)
}

function updateUI(data) {
    currentTemp = data.main.temp
    feelTemp = data.main.feels_like
    cityName.textContent = data.name
    weatherDescription.textContent = data.weather[0].description
    humidity.textContent = data.main.humidity + "%"
    windSpeed.textContent = data.wind.speed + " km/h"
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    appContainer.dataset.weather = data.weather[0].main.toLowerCase()

    if (isCelsius) {
        temp.textContent = Math.round(currentTemp) + "°C"
        feelsLikeTemp.textContent = Math.round(feelTemp) + "°C"
    } else {
        temp.textContent = Math.round((currentTemp * 9/5) + 32) + "°F"
        feelsLikeTemp.textContent = Math.round((feelTemp * 9/5) + 32) + "°F"
    }
}

tempToggleBtn.addEventListener("click", convertTemp)

function convertTemp() {
    if (isCelsius) {
        isCelsius = false
        temp.textContent = Math.round((currentTemp * 9/5) + 32) + "°F"
        feelsLikeTemp.textContent = Math.round((feelTemp * 9/5) + 32) + "°F"
        tempToggleBtn.textContent = "°C"
    } else {
        isCelsius = true
        temp.textContent = Math.round(currentTemp) + "°C"
        feelsLikeTemp.textContent = Math.round(feelTemp) + "°C"
        tempToggleBtn.textContent = "°F"
    }
}