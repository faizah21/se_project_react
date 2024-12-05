import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import randomizeImage from "../../assets/randomize-logo.svg";
import "../Main/Main.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext/CurrentTemperatureUnitContext";
import { useContext } from "react";

export default function Main({
  clothingItems,
  weatherData,
  handleCardClick,
  handleCloseModal,
  onCardLike,
  isLoggedIn,
}) {
  const currentTemperatureContext = useContext(CurrentTemperatureUnitContext);
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {currentTemperatureContext.currentTemperatureUnit === "F"
            ? weatherData.currentTemp.F
            : weatherData.currentTemp.C}{" "}
          &deg;{" "}
          {currentTemperatureContext.currentTemperatureUnit === "F" ? "F" : "C"}{" "}
          You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.weather;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                  handleCloseModal={handleCloseModal}
                  onCardLike={onCardLike}
                  isLoggedIn={isLoggedIn}
                />
              );
            })}
        </ul>
      </section>
      <section className="randomize">
        <button type="button" className="randomize__button">
          <img
            src={randomizeImage}
            alt="randomize"
            className="randomize__logo"
          />
          <p className="randomize__text">Randomize</p>
        </button>
      </section>
    </main>
  );
}
