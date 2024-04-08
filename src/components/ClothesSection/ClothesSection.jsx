import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

const ClothesSection = ({ onCardClick, clothingItems }) => {
  const profileCards = clothingItems ? clothingItems : [];

  return (
    <div className="clothes-section">
      <div>
        <p>Your items</p>
        <button>Add New</button>
      </div>
      <ul className="clothes-section__items">
        {profileCards.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
};

export default ClothesSection;
