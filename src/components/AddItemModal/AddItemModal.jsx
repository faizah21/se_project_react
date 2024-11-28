import React from "react";
import { useState, useEffect, useMemo } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./AddItemModal.css";

const AddItemModal = ({
  onClose,
  onAddItem,
  isOpen,
  buttonText,
  isLoading,
}) => {
  const { currentUser } = React.useContext(CurrentUserContext);
  const inputValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };

  const { values, handleChange, errors, isValid, resetForm } = useForm(
    inputValues,
    currentUser
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onAddItem(values);
    }
  };

  React.useEffect(() => {
    resetForm(inputValues);
  }, [isOpen]);

  return (
    <ModalWithForm
      title="New garment"
      buttonText={buttonText}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isLoading={isLoading}>
      <label htmlFor="name3" className="modal__label">
        Name{" "}
        <input
          type="text"
          className={`modal__input ${errors.name ? "modal__input_error" : ""}`}
          name="name"
          id="name3"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          minLength="1"
          maxLength="30"
          required
        />
        <span className="modal__input_error">{errors.name}</span>
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className={`modal__input ${
            errors.imageUrl ? "modal__input_error" : ""
          }`}
          name="imageUrl"
          id="imageUrl"
          placeholder="Image Url"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
        <span className="modal__input_error">{errors.imageUrl}</span>
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__input_type_radio">
          <input
            name="weather"
            type="radio"
            className="modal__radio-input"
            value="hot"
            id="hot"
            placeholder="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
            required
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__input_type_radio">
          <input
            name="weather"
            type="radio"
            className="modal__radio-input"
            value="warm"
            id="warm"
            placeholder="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
            required
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__input_type_radio">
          <input
            name="weather"
            type="radio"
            className="modal__radio-input"
            value="cold"
            id="cold"
            placeholder="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
            required
          />{" "}
          Cold
        </label>
        <button type="submit" className="modal__button-add" disabled={!isValid}>
          {buttonText}
        </button>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;