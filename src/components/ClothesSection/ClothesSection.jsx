import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext/CurrentUserContext";

export default function ClothesSection({
  clothingItems,
  handleCardClick,
  onAddGarmentClick,
  isLoggedIn,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  const userItems = clothingItems.filter((item) => {
    return item.owner === currentUser._id;
  });

  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <h3 className="clothes-section__title">Your items</h3>
        <button
          onClick={() => {
            onAddGarmentClick("add-garment");
          }}
          type="button"
          className="clothes-section__add-button"
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__container">
        {userItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              isLoggedIn={isLoggedIn}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </section>
  );
}
