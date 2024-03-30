import { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { useEffect } from "react";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIKey } from "../../utils/constants";
import Footer from "../Footer/Footer";
function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  useEffect(() => {
    getWeather(coordinates, APIKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        onClose={closeActiveModal}
        isOpen={activeModal === "add-garment"}
      >
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image
          <input
            type="URL"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__fieldset modal__ratio-buttons">
          <legend className="modal__legend">Select the weather type</legend>
          <label htmlFor="Hot" className="modal__label modal__label_type_radio">
            <input
              id="Hot"
              type="radio"
              name="weather-type"
              className=" modal__input_type_radio"
            />
            Hot
          </label>
          <label
            htmlFor="Warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="Warm"
              type="radio"
              name="weather-type"
              className=" modal__input_type_radio"
            />
            Warm
          </label>
          <label
            htmlFor="Cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="Cold"
              type="radio"
              name="weather-type"
              className="modal__input_type_radio"
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        card={selectedCard}
        onClose={closeActiveModal}
        isOpen={activeModal === "preview"}
      />
    </div>
  );
}

export default App;
