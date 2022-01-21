import "./confirm.css";

function Confirm({ name, imageUrl, removeConversation, showConfirmDeletion }) {
  const handleDelete = () => {
    showConfirmDeletion(false);
    removeConversation();
  };

  const handleCancel = () => {
    showConfirmDeletion(false);
  };

  return (
    <div className="confirm-container">
      <div className="confirm">
        <img
          src={imageUrl || "/images/profile.png"}
          alt={name}
          className="confirm__image"
        />
        <h2 className="confirm__name">{name}</h2>
        <h2 className="confirm__message">
          All associated chats will be lost completely
        </h2>
        <div className="confirm__buttons">
          <button className="btn__confirm btn__delete" onClick={handleDelete}>
            delete
          </button>
          <button className="btn__confirm btn__cancel" onClick={handleCancel}>
            cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirm;
