import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext/CurrentUserContext";
import { useContext } from "react";

export default function ItemCard({
  item,
  onCardClick,
  onCardLike,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser._id);
  const itemLikeButtonClassName = isLiked
    ? "card__heart card__heart_active"
    : "card__heart";

  function handleCardClick() {
    onCardClick(item);
  }

  function handleLike(e) {
    e.stopPropagation();
    onCardLike(item);
  }

  return (
    <li onClick={handleCardClick} className="card">
      <div className="card__header">
        <h2 className="card__title">{item.name}</h2>
        {isLoggedIn ? (
          <button
            type="button"
            className={itemLikeButtonClassName}
            onClick={handleLike}
          ></button>
        ) : (
          <></>
        )}
      </div>
      <img src={item.imageUrl} alt={item.name} className="card__image" />
    </li>
  );
}
