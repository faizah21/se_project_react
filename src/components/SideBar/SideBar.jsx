import avatar from "../../assets/avatar.png";
const SideBar = () => {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Defualt avatar" />

      <p className="sidebar__username">User name</p>
    </div>
  );
};

export default SideBar;
