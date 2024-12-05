import "./AddItemModal.css";
import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

export default function AddItemModal({
  onAddItem,
  activeModal,
  closeModal,
  closeMobileModal,
  isOpen,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImage] = useState("");
  const [weather, setWeatherType] = useState("");
  const modalName = "add-garment";

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleImageChange(e) {
    setImage(e.target.value);
  }

  function handleWeatherTypeChange(e) {
    setWeatherType(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather }, () => {
      setName("");
      setImage("");
      setWeatherType("");
      closeModal();
    });
  }

  function isButtonDisabled() {
    return !name || !imageUrl || !weather;
  }

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      activeModal={activeModal}
      handleCloseModal={closeModal}
      handleCloseMobileModal={closeMobileModal}
      handleSubmit={handleSubmit}
      modalName={modalName}
      isOpen={isOpen}
      alternateButton={false}
      isButtonDisabled={isButtonDisabled()}
    >
      <label htmlFor="name" className="form__label">
        <p className="form__label-text form__label-text_name">Name</p>
        <input
          onChange={handleNameChange}
          id="name"
          type="text"
          className="form__input form__input_name"
          placeholder="Name"
          required
          minLength="2"
          maxLength="40"
          value={name}
        />
      </label>
      <label htmlFor="image" className="form__label form__label_image">
        <p className="form__label-text form__label-text_image">Image</p>
        <input
          onChange={handleImageChange}
          id="image"
          type="url"
          className="form__input form__input_image"
          placeholder="Image URL"
          required
          value={imageUrl}
        />
      </label>
      <div className="form__weather-select">
        <div className="form__weather-select-header">
          Select the weather type:
        </div>
        <div className="form__weather-select-option">
          <input
            onChange={handleWeatherTypeChange}
            type="radio"
            id="hot"
            value="hot"
            name="weather-type"
            className="form__weather-select-input form__weather-select-input_hot"
            checked={weather === "hot" ? true : false}
          />
          <label htmlFor="hot" className="form__weather-select-label">
            Hot
          </label>
        </div>
        <div className="form__weather-select-option">
          <input
            onChange={handleWeatherTypeChange}
            type="radio"
            id="warm"
            value="warm"
            name="weather-type"
            className="form__weather-select-input form__weather-select-input_warm"
            checked={weather === "warm" ? true : false}
          />
          <label htmlFor="warm" className="form__weather-select-label">
            Warm
          </label>
        </div>
        <div className="form__weather-select-option">
          <input
            onChange={handleWeatherTypeChange}
            type="radio"
            id="cold"
            value="cold"
            name="weather-type"
            className="form__weather-select-input form__weather-select-input_cold"
            checked={weather === "cold" ? true : false}
          />
          <label htmlFor="cold" className="form__weather-select-label">
            Cold
          </label>
        </div>
      </div>
    </ModalWithForm>
  );
}
