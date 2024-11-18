
(async function ()
{
  let map;
  let coord;
  const token = 'f07624d2b0ab1b2677906af3f93c4cad';
  const map_token = '86c38176-bc99-4e59-8c87-bd7b27ed1ea5';
  let lat = '';
  let lon = '';
  let httpMap = `https://static-maps.yandex.ru/v1?ll=${lon},${lat}&lang=ru_RU&size=312,360&apikey=${map_token}`;
  const weatherInfoEl = document.querySelector("#response-info");
 coord = getWeatherUserLocation();

 
  function switchMap(coord) {
    if (map) {
        map.destroy(); 
    }

    ymaps.ready(function () {
        map = new ymaps.Map('map', {
            center: [coord[0], coord[1]],
            zoom: 10
        });
    });
}
  function showWeather(el, weatherInfo) {
    if (el.childNodes.length<4){
    const section = document.createElement("section");
    section.innerHTML = weatherInfo;
    el.appendChild(section);
    } else {
      const innerSection = el.querySelector("section");
      innerSection.innerHTML = weatherInfo;
    }
  }
  async function getWeatherUserLocation() {
    const responseLocal = await fetch(`https://get.geojs.io/v1/ip/geo.json`);
    const data = await responseLocal.json();
    const city = data.city;
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${token}`);
    const jsonData = await response.json();
     lat = jsonData[0].lat;
     lon = jsonData[0].lon;
    const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${token}`);
    const weatherData = await result.json();

   let textWeather = `City : ${weatherData.name}`  + "<br />" +
      `Temperature: ${weatherData.main['temp']} ` + "<br />" +
      `Pressure: ${weatherData.main['pressure']}` + "<br />" +
      `Wind speed: ${weatherData.wind['speed']}` + "<br />" +
      `Description: ${weatherData.weather[0]['description']}`;
     showWeather(weatherInfoEl, textWeather);
     let coordinates = [];
     coordinates.push(lat,lon);
     switchMap(coordinates)
     return coordinates
  }
  async function getWeather(cityName) {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${token}`);
    const jsonData = await response.json();
     lat = jsonData[0].lat;
     lon = jsonData[0].lon;
    const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${token}`);
    const weatherData = await result.json();
    let textWeather = `City : ${weatherData.name}`  + "<br />" +
    `Temperature: ${weatherData.main['temp']} ` + "<br />" +
    `Pressure: ${weatherData.main['pressure']}` + "<br />" +
    `Wind speed: ${weatherData.wind['speed']}` + "<br />" +
    `Description: ${weatherData.weather[0]['description']}`;
  showWeather(weatherInfoEl, textWeather);
  let coordinates = [];
  coordinates.push(lat,lon);
  return coordinates
  }
  document.addEventListener("DOMContentLoaded", function() {
  getWeatherb.addEventListener("click",async  (ev) => {
    ev.preventDefault();
    const inputEl = document.querySelector("#userInput");
    const cityName = inputEl.value;
    inputEl.value = "";
    const parentSection = document.querySelector("#history-info");
    const existingCity = parentSection.querySelector(`[data-city="${cityName}"]`);

        if (!existingCity) {
    if (parentSection.childNodes.length <13) {
    const asideDiv = document.createElement("section");
    asideDiv.setAttribute('id', "cityName");
    asideDiv.setAttribute('data-city', cityName);
    asideDiv.innerHTML = `${cityName}`;
    parentSection.appendChild(asideDiv);

    asideDiv.addEventListener("click", async () => {
      const coord = await getWeather(cityName); // Передаем cityName в getWeather
      switchMap(coord);
  });
    } else {
      const firstSection = document.getElementById("cityName");
      firstSection.remove();
      const asideDiv = document.createElement("section");
      asideDiv.setAttribute('id', "cityName");
      asideDiv.setAttribute('data-city', cityName);
      asideDiv.innerHTML = `${cityName}`;
      parentSection.appendChild(asideDiv);

      asideDiv.addEventListener("click", async () => {
        const coord = await getWeather(cityName); // Передаем cityName в getWeather
        switchMap(coord);
    });
    }
  }
 coord = await getWeather(cityName);
 switchMap(coord);
  }); 
});

})();
