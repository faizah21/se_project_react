import { apiKey } from "./constants";
import { coordinates } from "./constants";

function getTemperature(temperature) {
  return Math.floor(temperature);
}

function convertToCelsius(temperature) {
  return Math.floor((temperature - 32) * (5 / 9));
}

function convertSecondsToMilliseconds(seconds) {
  return seconds * 1000;
}

function isDay({ sunrise, sunset }, currentTime) {
  return (
    currentTime > convertSecondsToMilliseconds(sunrise) &&
    currentTime < convertSecondsToMilliseconds(sunset)
  );
}

export function processServerResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject((error) => {
      console.error(error);
    });
  }
}

function fetchCoordinates({ latitude, longitude }) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  )
    .then(processServerResponse)
    .then((data) => {
      const temperature = getTemperature(data.main.temp);

      const weatherData = {
        cityName: data.name,
        currentTemp: {
          F: temperature,
          C: convertToCelsius(temperature),
        },
        weatherDescription: data.weather[0].main.toLowerCase(),
        isDay: isDay(data.sys, Date.now()),
      };

      if (temperature > 80) {
        weatherData["weather"] = "hot";
      } else if (temperature >= 66 && temperature < 80) {
        weatherData["weather"] = "warm";
      } else {
        weatherData["weather"] = "cold";
      }

      return weatherData;
    });
}

export function getWeather() {
  return fetchCoordinates(coordinates);
}

export function getGeoLocationWeather(success) {
  return fetchCoordinates(success.coords);
}
