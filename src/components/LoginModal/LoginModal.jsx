import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";

export default function LoginModal({
  activeModal,
  handleCloseModal,
  isOpen,
  navigateToSignUp,
  handleLogin,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    resetInputs();
  }, [isOpen]);

  function resetInputs() {
    setEmail("");
    setPassword("");
  }

  function isButtonDisabled() {
    return !password || !email;
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(email, password);
    resetInputs();
  }

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={isOpen}
      alternateButton={true}
      alternateButtonText="or Sign Up"
      activeModal={activeModal}
      handleCloseModal={handleCloseModal}
      isButtonDisabled={isButtonDisabled()}
      handleSubmit={handleSubmit}
      alternateHandler={navigateToSignUp}
    >
      <label htmlFor="login-email" className="form__label">
        <p className="form__label-text">Email *</p>
        <input
          id="login-email"
          type="email"
          className="form__input"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label htmlFor="login-password" className="form__label">
        <p className="form__label-text">Password *</p>
        <input
          id="login-password"
          type="password"
          className="form__input"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
    </ModalWithForm>
  );
}
