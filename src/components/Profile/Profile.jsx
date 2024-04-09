import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";
const Profile = ({ onCardClick, clothingItems,handleAddClick }) => {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
        />
      </section>
      <section className="profile__clothing-items"></section>
    </div>
  );
};
export default Profile;
