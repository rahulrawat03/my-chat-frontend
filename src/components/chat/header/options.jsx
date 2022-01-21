import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import "./options.css";

function Options() {
  const [menuOpened, openMenu] = useState(false);

  return (
    <div className="options" onClick={() => openMenu(!menuOpened)}>
      <FaEllipsisV className="chat__icon" />
      {menuOpened && <h3 className="options__menu">created by rahul</h3>}
    </div>
  );
}

export default Options;
