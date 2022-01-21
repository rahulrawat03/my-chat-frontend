import "./empty.css";

function Empty() {
  return (
    <div className="empty">
      <img
        src="/images/chatBox.png"
        alt="select a conversation to open"
        className="icon__chatbox"
      />
      <h2 className="empty__heading">Open a conversation</h2>
    </div>
  );
}

export default Empty;
