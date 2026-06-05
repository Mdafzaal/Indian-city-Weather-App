const apiKey = "85a7bd6a730962af92540dbdc79054f1";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let temp = document.getElementById("temp");
let city = document.getElementById("city");
let humidity = document.getElementById("dh");
let wind = document.getElementById("dw");
let btn = document.getElementById("btn");
let image = document.querySelector(".weatherStatus img");
let weatherStatus = document.querySelector(".weatherStatus");
let card = document.querySelector(".card");
let invalid = document.getElementById("invalid")

let searchInput = document.querySelector(".search input");
async function checkWeather(cityy) {
    let response = await fetch(
        apiURL + cityy + `&appid=${apiKey}`
    );

    let data = await response.json();

    if (data.cod === "404") {
        invalid.style = "display:block";
    } else {
        temp.innerHTML = Math.round(data.main.temp) + "°C";
        city.innerHTML = data.name;
        humidity.innerHTML = data.main.humidity + "%";
        wind.innerHTML = data.wind.speed + " km/h";
        invalid.style = "display:none";
        if (data.weather[0].main == "Clouds") {
            image.src = "cloudy.svg";
        } else if (data.weather[0].main == "Clear") {
            image.src = "day.svg";
        } else if (data.weather[0].main == "Rain") {
            image.src = "rainy-1.svg";
        } else if (data.weather[0].main == "Snow") {
            image.src = "snowy-1.svg";
        }
        card.style = "height: 600px;transition: height 0.5s"
        weatherStatus.style.display = "block";
    }
}

btn.addEventListener("click", () => {
    checkWeather(searchInput.value);
});