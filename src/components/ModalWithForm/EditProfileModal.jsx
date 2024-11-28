import { useContext, useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "./ModalWithForm";
import "./EditProfileModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
const EditProfileModal = ({
  onClose,
  isOpen,
  updateUser,
  buttonText,
  isLoading,
}) => {
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    resetForm({
      name: currentUser.name,
      avatar: currentUser.avatar,
    });
  }, [currentUser]);

  const { values, handleChange, errors, isValid, resetForm } =
    useForm(currentUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      updateUser(values);
    }
  };

  console.log(values);

  return (
    <ModalWithForm
      title="Change Profile Data"
      buttonText={buttonText}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          name="name"
          id="name1"
          value={values.name}
          onChange={handleChange}
          className={`modal__input ${errors.name ? "modal__input_error" : ""}`}
          placeholder="Name"
          required
        />
        <span className="modal__input_error">{errors.name}</span>
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar
        <input
          type="url"
          name="avatar"
          id="avatar"
          value={values.avatar}
          onChange={handleChange}
          className={`modal__input ${
            errors.avatar ? "modal__input_error" : ""
          }`}
          placeholder="Avatar Url"
          required
        />
        <span className="modal__input_error">{errors.avatar}</span>
      </label>
      <button type="submit" className="EditProfile__button" disabled={!isValid}>
        {buttonText}
      </button>
    </ModalWithForm>
  );
};

export default EditProfileModal;
