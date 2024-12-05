import "./WeatherCard.css";
import {
  weatherOptions,
  defaultWeatherOptions,
} from "../../utils/constants.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext/CurrentTemperatureUnitContext";
import { useContext } from "react";

export default function WeatherCard({ weatherData }) {
  const currentTemperatureContext = useContext(CurrentTemperatureUnitContext);

  let weatherOption;

  const filteredOption = weatherOptions.find((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.weatherDescription
    );
  });

  if (filteredOption === undefined) {
    const defaultWeatherOption = defaultWeatherOptions.find((option) => {
      return option.day === weatherData.isDay;
    });

    weatherOption = defaultWeatherOption;
  } else {
    weatherOption = filteredOption;
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temperature">
        {currentTemperatureContext.currentTemperatureUnit === "F"
          ? weatherData.currentTemp.F
          : weatherData.currentTemp.C}
        &deg;
        {currentTemperatureContext.currentTemperatureUnit === "F" ? "F" : "C"}
      </p>
      <img
        src={weatherOption?.url}
        alt={weatherData.weatherDescription}
        className="weather-card__image"
      />
    </section>
  );
}
