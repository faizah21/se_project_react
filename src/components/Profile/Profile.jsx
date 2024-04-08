import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";
const Profile = ({ onCardClick }) => {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
        <ClothesSection onCardClick={onCardClick} />
      </section>
      <section className="profile__clothing-items"></section>
    </div>
  );
};
export default Profile;
