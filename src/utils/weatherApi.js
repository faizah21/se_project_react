export const getweather = ({ latitude, longitude }, APIkey) => {
  const processServerResponse = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject("Error:  ${res.status}");
    }
  };

  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(processServerResponse);
};
export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = {
    F: Math.round(data.main.temp),
    C: Math.round((data.main.temp - 32) * (5 / 9)),
  };
  result.type = getweatherType(result.temp.F);
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());
  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getweatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66 && temperature <= 85) {
    return "warm";
  } else if (temperature <= 65) {
    return "cold";
  }
};
