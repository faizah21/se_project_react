import "./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, handleCardClick, handleCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  const handleClick = () => {
    handleCardClick(item);
  };

  const handleLike = (item_id) => {
    handleCardLike(item_id, isLiked);
  };
  const isLiked = item.likes.some((id) => id === currentUser._id);

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      <button
        onClick={() => handleLike(item._id)}
        type="button"
        className={
          isLiked
            ? "card__like-button card__like-button_active"
            : "card__like-button"
        }
      ></button>
    </li>
  );
}

export default ItemCard;
