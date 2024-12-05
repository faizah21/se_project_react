import "./DefaultAvatar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext/CurrentUserContext";
import { useContext } from "react";

export default function DefaultAvatar() {
  const currentUser = useContext(CurrentUserContext);

  return <div>{currentUser.name[0].toUpperCase()}</div>;
}
