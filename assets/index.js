let weather = {
    apiKey:"ee8dcb8d655a4bb76ff89dc3e55fc9e8",
    FetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=[CITY]&units=imperial&appid=={ee8dcb8d655a4bb76ff89dc3e55fc9e8}")
        .then((response) => response.json())
        .then((data) => console.log(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather;
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in" + name;
        document.querySelector(".icon").src = 
        "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity:" + humidity + "%";
        document.querySelector(".winds").innerText = "Wind Speed:" + speed + "mph";

    },
}