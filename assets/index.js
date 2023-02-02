let weather = {
    apiKey:"ee8dcb8d655a4bb76ff89dc3e55fc9e8",
    FetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=imperial&appid="+ this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data))
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity:" + humidity + "%";
        document.querySelector(".winds").innerText = "Wind Speed:" + speed + "mph";
        document.querySelector(".weather").classList.remove("loading");
        },
        search: function () {
            this.FetchWeather(document.querySelector(".search").value);

        },
        

};

document.querySelector(".search-button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search").addEventListener("click", function () {
    weather.FetchWeather("city");
});

