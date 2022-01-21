import { FaTimes } from "react-icons/fa";
import Header from "./header";
import Messages from "./messages";
import "../common/common.css";

function Notification({ openModal }) {
  return (
    <div className="modal">
      <Header />
      <Messages openModal={openModal} />
      <FaTimes className="modal__close" onClick={() => openModal(false)} />
    </div>
  );
}

export default Notification;
