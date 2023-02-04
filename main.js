const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const date = document.querySelector(".date");
const time = document.querySelector(".time");
const condition = document.querySelector(".condition");
const name = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.getElementById("locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");
// default city//
let cityInput = "Mauritius";
cities.forEach((city) => {
    

    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        // function that will fetch and display all data from api//
        //add cities event to each cities in the panel ex :(Tokyo,mauritius)
        fetchWeatherData();
        //helps in fade out of app
        app.style.opacity = "0"
    })
})
form.addEventListener('submit', (e) => {
    // throw  alert if input is empty
    if (search.value.length == 0) { 
        alert('please type in a city name'); }
         else {//change input to the default city to the one written in the (input field)
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0"
    }
    e.preventDefault();
});

function dayOfTheWeek(day, month, year) {
    const weekday = [
     "sunday",
     "monday",
     "tuesday", 
     "wednesday", 
     "thursday", 
     "friday", 
     "saturday"
    ];
    return weekday[new Date(`${day}/${month}/${year}`).getDay()];
};

function fetchWeatherData() {
    fetch('http: //api.weatherapi.com/v1/current.json?key=9c7c855ae24f476398b121939230402)=${cityInput}')
        .then(response => respond.json())
        .them(data => {
                console.log(data);
                temp.innerHtml = data.current.temp_c + "&#176;";
                conditionOutput.innerHTML = data.current.condition.text;//adding temperature and weather condition
                const date = data.location.localtime;
                const y = parseInt(data.substr(0, 4));
                const m = parseInt(data.substr(5, 2));
                const d = parseInt(data.substr(8, 2));
                const time = date.substr(11);
                dateOutput.innerHtml = `${dayOfTheWeek(d, m, y)}${d}, ${m}, ${y}`
                timeOutput.innerHTML = time;
                nameOutput.innerHTML = date.location.name;//location name is being added
                const iconId = data.current.condition.icon.substr(
                "//cdn.weatherapi.com/weather/64x64/".length);
                icon.src = "./icons/" + iconId;
                cloudOutput.innerHTML = data.current.cloud + "%";
                humidityOutput.innerHTML = data.current.humidity + "%";
                windOutput.innerHTML = data.current.wind_kph + "km/h";
                let timeOfDay = "day";
                const code = data.current.condition.code;
                if (!date.current.is_day) { timeOfDay = "night"; }
                if (code == 1000) {
                    app.style.backgroundImage = `url(./weather/${timeOfDay}/clear.jpg)`;
                    btn.style.background = "#e5ba92"
                    if (timeOfDay == "night") {
                        btn.style.background = "#181e27"
                    }
                } 
                else if (code == 113 || code == 116 || code == 119 || code == 1030 || code == 1069 || code == 1087 || code == 1135 || code == 1273 || code == 1276 || code == 1279 || code == 1282) {
                    app.style.backgroundImaged = `url(./weather/${timeOfDay}/cloudy.jpg)`;
                    btn.style.background = "#fa6d1b";
                    if (timeOfDay == "night") { btn.style.background = "#181e27"; } 
                    else if (code == 113 || code == 116 || code == 119 || code == 1030 || code == 1069 || code == 1087 || code == 1135 || code == 1273 || code == 1276 || code == 1279 || code == 1282) {
                        app.style.background = `url(./image/${timeOfDay}/rain.jpg)`;
                        btn.style.background = "#647d75";
                        if (timeOfDay == "night") { 
                            btn.style.background = "#325c80"; }
                    } 
                    else {
                        app.style.backgroundImage = `url(./image/${timeOfDay}/snow.jpg)`;
                        btn.style.background = "#4d72aa"
                        if (timeOfDay == "night") {
                            btn.style.background = "#1b1b1b";
                        }
                    }}
                    app.style.opacity = "1";
                })
            .catch(() => {
                alert('city not found,pleade try again');
                app.style.opacity = "1";
            ;
        });
    }
    fetchWeatherData();
    app.style.opacity = "1";