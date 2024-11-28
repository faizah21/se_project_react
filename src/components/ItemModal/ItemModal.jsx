import { useContext } from "react";
import "./ItemModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({ onDelete, card, onClose, isOpen }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;


  const itemDeleteButtonClassName = `item__delete-button ${
    isOwn ? "item__delete-button_visible" : "item__delete-button_hidden"
  }`;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        {card && (
          <>
            <img src={card.imageUrl} alt={card.name} className="modal__image" />
            <div className="modal__footer">
              <h2 className="modal__caption">{card.name}</h2>
              {isOwn && (
                <button
                  onClick={onDelete}
                  type="button"
                  className={itemDeleteButtonClassName}
                >
                  {" "}
                  Delete item{" "}
                </button>
              )}
              <p className="modal__weather"> Weather: {card.weather}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
