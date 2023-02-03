 const apiKey="ee8dcb8d655a4bb76ff89dc3e55fc9e8"
 
 let cityName = document.querySelector("#city-name");
 let currDay = document.querySelector("#thedate");
 let weatherImg = document.querySelector("#weather-img");  
 let currTemp = document.querySelector("#temp");
 let currWind = document.querySelector("#wind");
 let currHumidity = document.querySelector("#humidity");
 let showRightSide = document.querySelector(".outer-right");
 let cityArray = JSON.parse(localStorage.getItem("pastCitySearch")) || []; //or will come back an empty array
 let searchcity = document.getElementById("search-input"); 

 let searchButton = document.getElementById("search-button"); 
 searchButton.addEventListener("click", function(){
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

    function chunk (arr, len) {
        var chunks = [],
            i = 0,
            n = arr.length;
        while (i < n) {
          chunks.push(arr.slice(i, i += len));
        }
        return chunks;
      }
      const formatDate = (str) => str.slice(5,7) + '/' + str.slice(8,10) + '/' + str.slice(0,4);
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
        ) 
          .then((response) => {  //this is another way to do what we did above 
            return response.json();
          })
          .then((returnData) => {
            let desc = returnData.list[0].weather[0].description;
            let icon = returnData.list[0].weather[0].icon;
            let theday = formatDate(returnData.list[0].dt_txt);
           
            let city = returnData.city.name;
            let temp = returnData.list[0].main.temp;
            let wind = returnData.list[0].wind.speed;
            let humidity = returnData.list[0].main.humidity;
            weatherImg.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            //use backticks to make template literal so spcace will not be ignored
            //use innerHTML instead of textContent so interpreted correctly not as text
            currDay.innerHTML = `&nbsp;(` + theday + `)`;
            cityName.textContent = city;
            currTemp.textContent = temp + ' °F';
            currWind.textContent = wind + ' MPH';
            currHumidity.textContent = humidity + ' %';
            const todaysDate = returnData.list[0].dt_txt
            const daysAfterToday = returnData.list.filter(item => item.dt_txt !== todaysDate)
            let daysArray = chunk(daysAfterToday, 8)
            daysArray.forEach((day, idx) => {
              const today = day[2]
              document.querySelector(`#weather-img${idx}`).src = `https://openweathermap.org/img/wn/${today.weather[0].icon}@2x.png`;
              document.querySelector(`#thedate${idx}`).innerHTML = formatDate(today.dt_txt);
              document.querySelector(`#temp${idx}`).innerHTML = today.main.temp + ' °F';
              document.querySelector(`#wind${idx}`).innerHTML = today.wind.speed + ' MPH';
              document.querySelector(`#humidity${idx}`).innerHTML = today.main.humidity + ' %';
            })
            saveCityData(city);           
            showRightSide.classList.remove("hide");   
            createCityButtons();
          })
          .catch(err => {
            console.log(err);  
          });
      })
      .catch(function(err) {
        return err;
      });


} //end of function searchfor

function createCityButtons(){
    let data = JSON.parse(localStorage.getItem('pastCitySearch'));
    if(data) {
    var btnDivEl = document.getElementById('prev-search');
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
      cityArray.unshift(city);  //this saves in the beginning of the array rather then the end
      localStorage.setItem("pastCitySearch", JSON.stringify(cityArray.slice(0,8))); 
    }
  }
 function init(){
  createCityButtons();  
 }
  init();