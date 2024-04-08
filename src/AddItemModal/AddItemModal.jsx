import React from "react";
import { useState } from "react";
import ModalWithForm from "../components/ModalWithForm/ModalWithForm";

const AddItemModal = ({ closeActiveModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [link, setUrl] = useState("");
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const [weather, setWeather] = useState("");
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, weather, imageUrl: link });
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      onClose={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="URL"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={link}
          onChange={handleUrlChange}
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
            onChange={handleWeatherChange}
          />
          Hot
        </label>
        <label htmlFor="Warm" className="modal__label modal__label_type_radio">
          <input
            id="Warm"
            type="radio"
            name="weather-type"
            className=" modal__input_type_radio"
            onChange={handleWeatherChange}
          />
          Warm
        </label>
        <label htmlFor="Cold" className="modal__label modal__label_type_radio">
          <input
            id="Cold"
            type="radio"
            name="weather-type"
            className="modal__input_type_radio"
            onChange={handleWeatherChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
