import avatar from "../../assets/avatar.png";
import "./SideBar.css";

function SideBar({ name, avatar, handleEditProfileModalClick, handleLogOff }) {
  {
    return (
      <div className="sidebar">
        <img src={avatar} alt="avatar" className="sidebar__avatar" />
        <p className="sidebar__username">{name}</p>
        <div className="sidebar__buttons">
          <button
            onClick={handleEditProfileModalClick}
            type="button"
            className="sidebar__edit-profile-btn"
          >
            Change profile data
          </button>
          <button
            onClick={handleLogOff}
            type="button"
            className="sidebar__log-out-btn"
          >
            Log out
          </button>
        </div>
      </div>
    );
  }
}

export default SideBar;
