import avatar from "../../assets/avatar.png";
import "./SideBar.css";
const SideBar = () => {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Defualt avatar" />

      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  );
};

export default SideBar;
