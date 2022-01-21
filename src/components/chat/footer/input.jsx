import { useCallback, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import "./input.css";

function Input({ message, onChange, onSubmit }) {
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit();
    },
    [onSubmit]
  );

  useEffect(() => {
    const shortcutHandler = (key) => {
      if (key.charCode === 10) handleSubmit(key);
    };

    window.addEventListener("keypress", shortcutHandler);

    return () => window.removeEventListener("keypress", shortcutHandler);
  }, [message, handleSubmit]);

  return (
    <form className="chat__box">
      <textarea
        className="message__text"
        value={message}
        onChange={onChange}
        placeholder="Ctrl + Enter to send"
      ></textarea>
      <button
        type="submit"
        className="enter-behaviour-remover"
        disabled
      ></button>
      <button className="message__submit" onClick={handleSubmit}>
        <FaPaperPlane className="submit__icon" />
      </button>
    </form>
  );
}

export default Input;
