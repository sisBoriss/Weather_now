(async function ()


















{
  const token = 'f07624d2b0ab1b2677906af3f93c4cad';
  const weatherInfoEl = document.querySelector("#response-info");
  const city = getWeatherUserLocation();
  const localweather = await getWeather(city);
  showWeather(weatherInfoEl, localweather);
  // �������� ��������� �� ������ ��������
  //  const formEl = document.querySelector("button-59");

  function showWeather(el, weatherInfo) {
    console.log("child responce " + el.childNodes.length)
    if (el.childNodes.length<4){
    const section = document.createElement("section");
    section.innerHTML = JSON.stringify(weatherInfo, null, 2);
    el.appendChild(section);
    } else {
      const innerSection = el.querySelector("section");
      innerSection.innerHTML = JSON.stringify(weatherInfo, null, 2);
    }
  }

  /**
   * ������� ������ ������ ������ ��
   * https://api.openweathermap.org/data/2.5/weather?units=metric&q={{CITY_NAME}}&appid={{APP_ID}}
   * ���
   *  {{CITY_NAME}} ������ ���� ������� �� ��� ������
   *  {{APP_ID}} ������ ���� ������� �� ���� ����������
   * ������ ���������� ������ � ������� JSON
   *
   * ������� ������ ���������� (Promise) ������ � ����������� � ������
   * @param {string} cityName
   */
  async function getWeatherUserLocation() {
    const responseLocal = await fetch(`https://get.geojs.io/v1/ip/geo.json`);
    const data = await responseLocal.json();
    const city = data.city;
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${token}`);
    const jsonData = await response.json();
    const lat = jsonData[0].lat;
    const lon = jsonData[0].lon;
    const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${token}`);
    const weatherData = await result.json();
    return showWeather(weatherInfoEl, weatherData);
  }
  async function getWeather(cityName) {
    console.log("cityName " + cityName + " token " + token)
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${token}`);
    const jsonData = await response.json();
    console.log(jsonData)
    const lat = jsonData[0].lat;
    const lon = jsonData[0].lon;
    const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${token}`);
    const weatherData = await result.json();
    return weatherData;
  }
  const getWeatherb = document.getElementById("getWeatherb");
  getWeatherb.addEventListener("click", async (ev) => {
    ev.preventDefault();
    const inputEl = document.querySelector("#userInput");
    const cityName = inputEl.value;
    inputEl.value = "";
    const parentSection = document.querySelector("#history-info");
    if (parentSection.childNodes.length <13) {
    const asideDiv = document.createElement("section");
    asideDiv.setAttribute('id', "cityName");
    asideDiv.setAttribute('value', `${cityName}`);
    asideDiv.innerHTML = `${cityName}`;
    parentSection.appendChild(asideDiv);
    } else {
      const firstSection = document.getElementById("cityName");
      firstSection.remove();
      const asideDiv = document.createElement("section");
      asideDiv.setAttribute('id', "cityName");
      asideDiv.setAttribute('value', `${cityName}`);
      asideDiv.innerHTML = `${cityName}`;
      parentSection.appendChild(asideDiv);
    }
  const weather = await getWeather(cityName);
    showWeather(weatherInfoEl, weather);
  });
})();
