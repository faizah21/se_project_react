import "./ModalWithForm.css";

export default function ModalWithForm({
  children,
  buttonText,
  title,
  handleCloseModal,
  handleSubmit,
  isOpen,
  formName,
  alternateButtonText,
  alternateButton,
  isButtonDisabled,
  alternateHandler,
}) {
  return (
    <div className={`modal ${isOpen && "modal_visible"}`}>
      <form onSubmit={handleSubmit} className="form" name={formName}>
        <button
          onClick={handleCloseModal}
          type="button"
          className="form__close-button"
        ></button>
        <h3 className="form__title">{title}</h3>
        {children}
        <div className="form__button-container">
          <button
            type="submit"
            className={`form__submit-button ${
              isButtonDisabled && "form__submit-button_disabled"
            }`}
            disabled={isButtonDisabled}
          >
            {buttonText}
          </button>
          {alternateButton ? (
            <button
              type="button"
              className="modal__button modal__button_alternate"
              onClick={alternateHandler}
            >
              {alternateButtonText}
            </button>
          ) : (
            <></>
          )}
        </div>
      </form>
    </div>
  );
}
