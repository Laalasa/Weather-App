// let geoApiKey = "AIzaSyDyQdskeIo_awOmChS8qfCIDW0nDNwUOGc";

function time(now) {
  let mins = now.getMinutes();
  let hours = now.getHours();
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let day = week[now.getDay()];
  let d = now.getDay();
  let date = now.getDate();
  date = 3;
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  if (mins < 10) {
    mins = "0" + mins;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }

  if (date % 10 === 1) date = date + "st";
  else if (date % 10 === 2) date = date + "nd";
  else if (date % 10 === 3) date = date + "rd";
  else date = date + "th";

  let month = months[now.getMonth()];
  let time = document.querySelector(".date-time");
  time.innerHTML = `${day}, ${date} ${month} ${hours}:${mins}`;
  let day1 = document.querySelector(".day1");
  day1.innerHTML = `${days[(d + 1) % 7]}`;
  let day2 = document.querySelector(".day2");
  day2.innerHTML = `${days[(d + 2) % 7]}`;
  let day3 = document.querySelector(".day3");
  day3.innerHTML = `${days[(d + 3) % 7]}`;
  let day4 = document.querySelector(".day4");
  day4.innerHTML = `${days[(d + 4) % 7]}`;
  let day5 = document.querySelector(".day5");
  day5.innerHTML = `${days[(d + 5) % 7]}`;
  let day6 = document.querySelector(".day6");
  day6.innerHTML = `${days[(d + 6) % 7]}`;
}

let now = new Date();
time(now);

function sentenceCase(str) {
  if (str === null || str === "") return false;
  else str = str.toString();

  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function cityname(event) {
  event.preventDefault();
  let city = document.querySelector(".form-control");
  let cityname = document.querySelector(".city-name");
  city = city.value;
  city = sentenceCase(city);
  function showTemp(response) {
    let temp = document.querySelector(".temparature");
    let temparature = Math.round(response.data.main.temp);
    temp.innerHTML = temparature + `<span class="degree-small">°</span>`;
    let desc = response.data.weather[0].description;
    let description = document.querySelector("h4");
    description.innerHTML = sentenceCase(desc);
    console.log(response.data);

    let img = response.data.weather[0].icon;
    let image = document.querySelector(".weather-image");
    image.innerHTML = `<img src="src/${img[0]}${img[1]}d.png" alt=""></img>`;

    let wind = document.querySelector(".wind");
    let speed = Math.round(response.data.wind.speed * 3.6);
    wind.innerHTML = `Wind = ${speed}kmph`;

    let hum = document.querySelector(".humidity");
    let humidity = response.data.main.humidity;
    hum.innerHTML = `Humidity = ${humidity}%`;
    cityname.innerHTML = city;
  }

  let apiKey = "0429c757fe53a131346a5441c27ebdac";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios
    .get(apiUrl)
    .then(showTemp)
    .catch((error) => {
      alert(`Enter a valid city name`);
    });
}

let form = document.querySelector("form");
form.addEventListener("submit", cityname);

current();

function current() {
  navigator.geolocation.getCurrentPosition(retrievePosition);

  function retrievePosition(position) {
    let apiKey = "0429c757fe53a131346a5441c27ebdac";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showTemp);
  }

  function showTemp(response) {
    let city = response.data.name;
    city = sentenceCase(city);
    let temp = document.querySelector(".temparature");
    let temparature = Math.round(response.data.main.temp);
    temp.innerHTML = temparature + `<span class="degree-small">°</span>`;
    let desc = response.data.weather[0].description;
    let description = document.querySelector("h4");
    description.innerHTML = sentenceCase(desc);
    console.log(response.data);

    let img = response.data.weather[0].icon;
    let image = document.querySelector(".weather-image");
    image.innerHTML = `<img src="src/${img[0]}${img[1]}d.png" alt=""></img>`;

    let wind = document.querySelector(".wind");
    let speed = Math.round(response.data.wind.speed * 3.6);
    wind.innerHTML = `Wind = ${speed}kmph`;

    let hum = document.querySelector(".humidity");
    let humidity = response.data.main.humidity;
    hum.innerHTML = `Humidity = ${humidity}%`;
    let curcity = document.querySelector(".city-name");
    curcity.innerHTML = city;
  }
}
