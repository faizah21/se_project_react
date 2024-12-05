import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext/CurrentUserContext";
import "./ItemModal.css";

export default function ItemModal({
  activeModal,
  card,
  handleCloseModal,
  handleDeleteClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;

  const itemDeleteButtonClass = `modal__content-delete-button ${
    isOwn
      ? `modal__content-delete-button`
      : `modal__content-delete-button_hidden`
  }`;

  return (
    <div className={`modal ${activeModal === "preview" && "modal_visible"}`}>
      <div className="modal__content modal__content_type_preview">
        <button
          onClick={handleCloseModal}
          type="button"
          className="modal__close-button"
        ></button>
        <img className="modal__image" src={card.imageUrl} alt={card.name} />
        <div className="modal__content-details">
          <p className="modal__content-title">{card.name}</p>
          <p className="modal__content-weather-type">Weather: {card.weather}</p>
          <button
            onClick={() => {
              handleDeleteClick(card);
            }}
            className={itemDeleteButtonClass}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}
