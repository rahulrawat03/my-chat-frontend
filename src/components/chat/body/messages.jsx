import { useEffect, useRef } from "react";
import Message from "./message";
import "./messages.css";

function Messages({ messages }) {
  const scroller = useRef();

  useEffect(() => {
    scroller.current?.scrollIntoView();
  }, [messages]);

  return (
    <section className="messages">
      {messages.map((message, index) => (
        <div key={index} ref={scroller}>
          <Message message={message} />
        </div>
      ))}
    </section>
  );
}

export default Messages;
