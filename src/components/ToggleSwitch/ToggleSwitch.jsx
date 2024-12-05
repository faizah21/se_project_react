import { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext/CurrentTemperatureUnitContext";

export default function ToggleSwitch() {
  const currentTemperatureContext = useContext(CurrentTemperatureUnitContext);

  function handleChange() {
    currentTemperatureContext.handleToggleSwitchChange();
  }

  return (
    <>
      <input
        className="checkbox__box"
        onClick={handleChange}
        type="checkbox"
        name="toggle temperature"
        onChange={handleChange}
        checked={
          currentTemperatureContext.currentTemperatureUnit === "F"
            ? false
            : true
        }
        id="toggleTemperature"
      />
      <label htmlFor="toggleTemperature" className="checkbox__label">
        <span className="checkbox__letter checkbox__F">F</span>
        <span className="checkbox__switch-button"></span>
        <span className="checkbox__letter checkbox__C">C</span>
      </label>
    </>
  );
}
