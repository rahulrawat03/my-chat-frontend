import "./message.css";

function Message({ message: { own, content, date, time, senderName } }) {
  return (
    <div className={`message ${own ? "message__own" : "message__other"}`}>
      <div className="message-container">
        <h3 className="message__sender">{senderName}</h3>
        <p className="message__content">{content}</p>
        <h4 className="message__time">
          <p className="time-field">{time}</p>
          <p className="date-field">{date}</p>
        </h4>
      </div>
    </div>
  );
}

export default Message;
