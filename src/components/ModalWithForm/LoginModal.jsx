import React from "react";
import { useContext } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "./ModalWithForm";
import "./LoginModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
const LoginModal = ({
  onClose,
  isOpen,
  onLogin,
  onRegisterClick,
  errorMessage,
  onLoginClick,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const inputValues = {
    email: "",
    password: "",
  };

  const { values, handleChange, errors, isValid, resetForm } = useForm(
    inputValues,
    currentUser
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onLogin(values);
    }
  };

  React.useEffect(() => {
    resetForm(inputValues);
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Log in"
      buttonText="Log in"
      buttonText2="or Sign Up"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          name="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          className={`modal__input ${errors.email ? "modal__input_error" : ""}`}
          placeholder="Email"
          required
        />
        <span className="modal__input_error">{errors.email}</span>
      </label>
      <label htmlFor="password" className="modal__label">
        Password
        <input
          type="password"
          name="password"
          id="password"
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
      <p className="modal__error">{errorMessage}</p>
      <button
        type="submit"
        className="Login__button"
        onClick={onLoginClick}
        disabled={!isValid}
      ></button>
      <button
        type="button"
        onClick={onRegisterClick}
        className="Or-Sign-Up__button"
      ></button>
    </ModalWithForm>
  );
};

export default LoginModal;
