import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({
  onDelete,
  onCancel,
  onConfirm,
  isOpen,
  onClose,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <p className="modal__title">
          Are you sure you want to delete {onDelete.name}?
        </p>
        <div className="modal__button">
          <button
            type="button"
            className="modal__button-cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button onClick={onClose} type="button" className="modal__close" />
          <button
            type="button"
            className="modal__button-delete"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default DeleteConfirmationModal;
