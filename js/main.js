let isDay = document.getElementById("day");
let isdateOfMonth = document.getElementById("dateOfMonth");
let isLocation   = document.getElementById("location");
let todayDegree  = document.getElementById("today-degree");
let todayIcon    = document.getElementById("today-icon");
let conditionText = document.getElementById("condition-text");
let isHumidty     = document.getElementById("humidty");
let isWindKph     = document.getElementById("windKph");
let isWindDir     = document.getElementById("windDir");
let searchInput   = document.getElementById("searchInput")
let monthName = ['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'];
let days = [ "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];
let apiResponse ;

// Next Weather Day 
let nextDay = document.getElementsByClassName("nextDay");
let nextTodayIcon  = document.getElementsByClassName("nextToday-icon");
let maxtemp = document.getElementsByClassName("maxtemp");
let mintemp = document.getElementsByClassName("mintemp");
let nextCondition = document.getElementsByClassName("nextCondition-text") ;


  // get data from Api
async function getWeatherDay(currentCity='cairo'){

  let apiResult =  await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentCity}&days=3`);
   apiResponse = await apiResult.json();
  console.log(apiResponse);
  displayTodayWeather();
  displayNextDay() ;
}
getWeatherDay()


function displayTodayWeather(){

 let day = new Date();
 let today =   days[day.getDay()];   
 isDay.innerHTML = today;
 let todayDate = `${day.getDate()} ${monthName[day.getMonth()]}`;
 isdateOfMonth.innerHTML = todayDate ;
 isLocation.innerHTML = `${apiResponse.location.name} ${apiResponse.location.country}` ;
 todayDegree.innerHTML = apiResponse.current.temp_c ;
 todayIcon.setAttribute("src",`https:${apiResponse.current.condition.icon}`);
 conditionText.innerHTML = apiResponse.current.condition.text ;
 isHumidty.innerHTML = apiResponse.current.humidity ;
 isWindKph.innerHTML = apiResponse.current.wind_kph ;
 isWindDir.innerHTML = apiResponse.current.wind_dir;
}    




function displayNextDay(){

//   let x = new Date();
//   x=days[x.getDay()] ;
//   x=apiResponse.forecast.forecastday.date ;
//   console.log("hello " , x);

for( let i=0; i<nextDay.length;i++){
    nextDay[i].innerHTML= days[new Date(apiResponse.forecast.forecastday[i+1].date).getDay()];
    nextTodayIcon[i].setAttribute("src", `https:${apiResponse.forecast.forecastday[i+1].day.condition.icon}`);
    maxtemp[i].innerHTML = apiResponse.forecast.forecastday[i+1].day.maxtemp_c ;
    mintemp[i].innerHTML = apiResponse.forecast.forecastday[i+1].day.mintemp_c ;
    nextCondition[i].innerHTML = apiResponse.forecast.forecastday[i+1].day.condition.text
  }

}









searchInput.addEventListener("keyup",function(){
    currentCity = searchInput.value ;
    getWeatherDay(currentCity)
})