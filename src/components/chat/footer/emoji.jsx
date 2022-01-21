import { useState } from "react";
import { FaGrin } from "react-icons/fa";
import Picker from "../../../emoji-picker/picker";
import "./emoji.css";

function Emoji({ message, setMessage }) {
  const [emojis, showEmojis] = useState(false);

  const addEmoji = (emoji) => {
    setMessage(message + emoji);
  };

  return (
    <div className="emoji-section">
      <FaGrin
        className={emojis ? "icon__emoji icon__emoji--active" : "icon__emoji"}
        onClick={() => showEmojis(!emojis)}
      />

      <Picker
        onClick={addEmoji}
        className={
          emojis ? "emoji-picker" : "emoji-picker emoji-picker--hidden"
        }
      />
    </div>
  );
}

export default Emoji;
