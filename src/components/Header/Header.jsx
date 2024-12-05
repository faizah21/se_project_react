import "./Header.css";
import logo from "../../assets/wtwr-logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import DefaultAvatar from "../DefaultAvatar/DefaultAvatar";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext/CurrentUserContext";
import { useContext } from "react";

export default function Header({
  onAddGarmentClick,
  handleMobileMenuClick,
  currentActiveMobileModal,
  handleCloseModal,
  weatherData,
  isLoggedIn,
  onSignUpClick,
  onLogInClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  function handleAddClothesButtonClick() {
    onAddGarmentClick("add-garment");
    handleCloseModal();
  }

  function handleSignUpClick() {
    onSignUpClick("sign-up");
  }

  function handleLogInClick() {
    onLogInClick("log-in");
  }

  // const defaultUserImage = currentUser.name[0].toUpperCase();

  return (
    <header className="header">
      <Link className="header__logo-link" to="/">
        <img src={logo} alt="logo" className="header__logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.cityName}
      </p>

      <button
        type="button"
        className="header__mobile-menu-button"
        onClick={() => {
          handleMobileMenuClick("mobile-menu");
        }}
      ></button>
      <div
        className={`header__user-container ${
          currentActiveMobileModal === "mobile-menu" &&
          "header__user-container_visible"
        }`}
      >
        <button
          type="button"
          className="header__mobile-menu-close-button"
          onClick={handleCloseModal}
        ></button>
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClothesButtonClick}
              className="header__add-clothes-button"
            >
              + Add clothes
            </button>
            <Link className="header__link" to="/profile">
              <div className="header__profile">
                <p className="header__profile_name">{currentUser.name}</p>
                {!currentUser.avatar ? (
                  <div className="default-avatar__image">
                    <DefaultAvatar />
                  </div>
                ) : (
                  <img
                    src={currentUser.avatar}
                    alt="profile picture"
                    className="header__profile_image"
                  />
                )}
              </div>
            </Link>
          </>
        ) : (
          <>
            <button className="header__button" onClick={handleSignUpClick}>
              Sign Up
            </button>
            <button className="header__button" onClick={handleLogInClick}>
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}
