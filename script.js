var loader = document.getElementById("preloader");
window.addEventListener("load", preloader);

function preloader(event) {
  // event.preventDefaulf();
  loader.style.display = "none";
}

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

function cityname(event) {
  event.preventDefault();
  let city = document.querySelector(".form-control");
  city = city.value;
  search(city);
  console.log(city);
}

function showTemp(response) {
  let cityname = document.querySelector(".city-name");
  let temp = document.querySelector("#temparature");
  let temparature = Math.round(response.data.main.temp);
  celsiusTemperature = temparature;
  temp.innerHTML = temparature;
  let desc = response.data.weather[0].description;
  let description = document.querySelector("h4");
  description.innerHTML = desc;
  // console.log(response.data);

  let img = response.data.weather[0].icon;
  let image = document.querySelector(".weather-image");
  image.innerHTML = `<img src="src/${img[0]}${img[1]}n.png" alt=""></img>`;

  let wind = document.querySelector(".wind");
  let speed = Math.round(response.data.wind.speed * 3.6);
  wind.innerHTML = `Wind = ${speed}kmph`;

  let hum = document.querySelector(".humidity");
  let humidity = response.data.main.humidity;
  hum.innerHTML = `Humidity = ${humidity}%`;
  cityname.innerHTML = response.data.name;

  let forecastApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&exclude={current}&appid=${apiKey}&units=metric`;
  axios.get(forecastApi).then(forecast);
}

function forecast(response) {
  // console.log(response.data.daily);

  let min = document.querySelector(".min1");
  let minimum = Math.round(response.data.daily[0].temp.min);
  min.innerHTML = `${minimum}°`;
  let max = document.querySelector(".max1");
  let maximum = Math.round(response.data.daily[0].temp.max);
  max.innerHTML = `${maximum}°`;
  let img = response.data.daily[0].weather[0].icon;
  let image = document.querySelector(".img1");
  image.innerHTML = `<img src="src/${img[0]}${img[1]}n.png" alt="" class="day-img img1">`;

  min = document.querySelector(".min2");
  minimum = Math.round(response.data.daily[1].temp.min);
  min.innerHTML = `${minimum}°`;
  max = document.querySelector(".max2");
  maximum = Math.round(response.data.daily[1].temp.max);
  max.innerHTML = `${maximum}°`;
  img = response.data.daily[1].weather[0].icon;
  image = document.querySelector(".img2");
  image.innerHTML = `<img src="src/${img[0]}${img[1]}n.png" alt="" class="day-img img2">`;

  min = document.querySelector(".min3");
  minimum = Math.round(response.data.daily[2].temp.min);
  min.innerHTML = `${minimum}°`;
  max = document.querySelector(".max3");
  maximum = Math.round(response.data.daily[2].temp.max);
  max.innerHTML = `${maximum}°`;
  img = response.data.daily[2].weather[0].icon;
  image = document.querySelector(".img3");
  image.innerHTML = `<img src="src/${img[0]}${img[1]}n.png" alt="" class="day-img img3">`;

  min = document.querySelector(".min4");
  minimum = Math.round(response.data.daily[3].temp.min);
  min.innerHTML = `${minimum}°`;
  max = document.querySelector(".max4");
  maximum = Math.round(response.data.daily[3].temp.max);
  max.innerHTML = `${maximum}°`;
  img = response.data.daily[3].weather[0].icon;
  image = document.querySelector(".img4");
  image.innerHTML = `<img src="src/${img[0]}${img[1]}n.png" alt="" class="day-img img4">`;

  min = document.querySelector(".min5");
  minimum = Math.round(response.data.daily[4].temp.min);
  min.innerHTML = `${minimum}°`;
  max = document.querySelector(".max5");
  maximum = Math.round(response.data.daily[4].temp.max);
  max.innerHTML = `${maximum}°`;
  img = response.data.daily[4].weather[0].icon;
  image = document.querySelector(".img5");
  image.innerHTML = `<img src="src/${img[0]}${img[1]}n.png" alt="" class="day-img img5">`;

  min = document.querySelector(".min6");
  minimum = Math.round(response.data.daily[5].temp.min);
  min.innerHTML = `${minimum}°`;
  max = document.querySelector(".max6");
  maximum = Math.round(response.data.daily[5].temp.max);
  max.innerHTML = `${maximum}°`;
  img = response.data.daily[5].weather[0].icon;
  image = document.querySelector(".img6");
  image.innerHTML = `<img src="src/${img[0]}${img[1]}n.png" alt="" class="day-img img6">`;
}

function search(city) {
  let name = city;
  apiKey = "0429c757fe53a131346a5441c27ebdac";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&units=metric`;
  axios
    .get(apiUrl)
    .then(showTemp)
    .catch((error) => {
      alert(`Enter a valid city name`);
    });
}

current();
search("San Francisco");

let form = document.querySelector("form");
form.addEventListener("submit", cityname);

function current() {
  navigator.geolocation.getCurrentPosition(retrievePosition);

  function retrievePosition(position) {
    let apiKey = "0429c757fe53a131346a5441c27ebdac";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showTemp);
  }
}
