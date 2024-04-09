import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

const ClothesSection = ({ onCardClick, clothingItems, handleAddClick }) => {
  const profileCards = clothingItems ? clothingItems : [];

  return (
    <div className="clothes-section">
      <div className="clothes-section-header">
        <p className="clothes-section-text">Your items</p>
        <button onClick={handleAddClick} className="clothes-section-button">
          + Add New
        </button>
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
