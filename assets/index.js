 const apiKey="ee8dcb8d655a4bb76ff89dc3e55fc9e8"
 
 let cityName = document.querySelector("#city-name");
 let currDay = document.querySelector("#thedate");
 let weatherImg = document.querySelector("#weather-img");  
 let currTemp = document.querySelector("#temp");
 let currWind = document.querySelector("#wind");
 let currHumidity = document.querySelector("#humidity");
 let showRightSide = document.querySelector(".outer-div-right");
 let cityArray = JSON.parse(localStorage.getItem("pastCitySearches")) || [];
 let searchcity = document.getElementById("search-input"); 

 let searchBtn = document.getElementById("search-btn"); 
 searchBtn.addEventListener("click", function(){
   if (document.getElementById("search-input").value != "") {
     handleSearch(searchcity.value);
   } else {
     alert("Please enter a city value in the textbox.");
    }  
 });

 function searchfor(city) {

    fetch (`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)

.then(function(response){
    let data= response.json();
    return data;
})
.then(function(returnData){
    let lat= returnData[0].lat;
    let lon= returnData[0].lon;
})


 }
    
// document.querySelector(".search-btn").addEventListener("click", function () {
//     weather.search();
// });

// document.querySelector(".search-btn").addEventListener("click", function () {
//     weather.FetchWeather("city");
// });

