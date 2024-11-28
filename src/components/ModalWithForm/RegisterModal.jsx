import React from "react";
import { useContext } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "./ModalWithForm";
import "./RegisterModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
const RegisterModal = ({ onClose, isOpen, onRegister, onLoginClick }) => {
  const currentUser = useContext(CurrentUserContext);
  const inputValues = {
    name: "",
    email: "",
    password: "",
    avatar: "",
  };

  const { values, handleChange, errors, isValid, resetForm } = useForm(
    inputValues,
    currentUser
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onRegister(values);
    }
  };

  React.useEffect(() => {
    resetForm(inputValues);
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign up"
      buttonText2="or Log In"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name2" className="modal__label">
        Name
        <input
          type="text"
          name="name"
          id="name2"
          value={values.name}
          onChange={handleChange}
          className={`modal__input ${errors.name ? "modal__input_error" : ""}`}
          placeholder="Name"
          required
        />
        <span className="modal__input_error">{errors.name}</span>
      </label>
      <label htmlFor="emailInput" className="modal__label">
        Email
        <input
          type="email"
          name="email"
          id="emailInput"
          value={values.email}
          onChange={handleChange}
          className={`modal__input ${errors.email ? "modal__input_error" : ""}`}
          placeholder="Email"
          required
        />
        <span className="modal__input_error">{errors.email}</span>
      </label>
      <label htmlFor="passwordInput" className="modal__label">
        Password
        <input
          type="password"
          name="password"
          id="passwordInput"
          value={values.password}
          onChange={handleChange}
          autoComplete="on"
          className={`modal__input ${
            errors.password ? "modal__input_error" : ""
          }`}
          placeholder="Password"
          required
        />
        <span className="modal__input_error">{errors.password}</span>
      </label>
      <label htmlFor="avatarInput" className="modal__label">
        Avatar
        <input
          type="url"
          name="avatar"
          id="avatarInput"
          value={values.avatar}
          onChange={handleChange}
          className={`modal__input ${
            errors.avatar ? "modal__input_error" : ""
          }`}
          placeholder="Avatar Url"
          required
        />
        <span className="modal__input_error">{errors.avatar}</span>
      </label>
      <button
        type="submit"
        className="SignUp__button"
        disabled={!isValid}
      ></button>
      <button
        type="button"
        onClick={onLoginClick}
        className="Or-Login__button"
      ></button>
    </ModalWithForm>
  );
};
export default RegisterModal;
