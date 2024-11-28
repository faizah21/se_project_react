import { useContext } from "react";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({
  handleCardClick,
  clothingItems,
  handleAddClick,
  handleEditProfileModalClick,
  handleLogOff,
  handleCardLike,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const addItem = () => {
    handleAddClick();
  };

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          name={currentUser.name}
          avatar={currentUser.avatar}
          handleEditProfileModalClick={handleEditProfileModalClick}
          handleLogOff={handleLogOff}
        />
      </section>
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        handleAddClick={addItem}
        handleCardLike={handleCardLike}
      />
    </div>
  );
}

export default Profile;
