import { useState } from "react";
import Emoji from "./emoji";
import Input from "./input";
import "./footer.css";

function Footer({ handleSubmit }) {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const value = e.currentTarget.value;
    setMessage(value);
  };

  const promoteSubmit = () => {
    if (message === "") return;

    handleSubmit(message);
    setMessage("");
  };

  return (
    <footer className="chat__footer">
      <Emoji message={message} setMessage={setMessage} />
      <Input
        message={message}
        onChange={handleChange}
        onSubmit={promoteSubmit}
      />
    </footer>
  );
}

export default Footer;
