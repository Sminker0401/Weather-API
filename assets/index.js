 const apiKey="ee8dcb8d655a4bb76ff89dc3e55fc9e8"
 
 let cityName = document.querySelector("#city-name");
 let currDay = document.querySelector("#thedate");
 let weatherImg = document.querySelector("#weather-img");  
 let currTemp = document.querySelector("#temp");
 let currWind = document.querySelector("#wind");
 let currHumidity = document.querySelector("#humidity");
 let showRightSide = document.querySelector(".outer-div-right");
 let cityArray = JSON.parse(localStorage.getItem("pastCitySearches")) || []; //or will come back an empty array
 let searchcity = document.getElementById("search-input"); 

 let searchBtn = document.getElementById("search-btn"); 
 searchBtn.addEventListener("click", function(){
   if (document.getElementById("search-input").value != "") {
     searchfor(searchcity.value);
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


} //end of function searchfor

function createCityButtons(){
    let data = JSON.parse(localStorage.getItem('pastCitySearches'));
    if(data) {
    var btnDivEl = document.getElementById('prev-searches');
    btnDivEl.textContent = "";
    for (let i = 0; i < data.length; i++) {
      var btn = document.createElement("button");
      btn.id = "city-btn" + i;
      btn.className = "city-btn";
      btn.innerText = data[i];  //loop and read local storage with city history
      btn.addEventListener('click', function(e){ handleSearch(e.target.innerText) });
      btnDivEl.appendChild(btn);
    }
   }

}

function saveCityData(city){
    if(!cityArray.includes(city)){
      cityArray.unshift(city);  
      localStorage.setItem("pastCitySearches", JSON.stringify(cityArray.slice(0,8))); 
    }
  }
 function init(){
  createCityButtons();  
 }
  init();