import { useState } from "react";
import "./add.css";

function Add({ imageSource, alt, tip, onClick, children }) {
  const [tooltip, showTooltip] = useState(false);

  return (
    <div className="add-container" onClick={onClick}>
      <button
        className="btn__add"
        onMouseOver={() => showTooltip(true)}
        onMouseOut={() => showTooltip(false)}
      >
        <img src={imageSource} alt={alt} className="add__image" />
      </button>
      {tooltip && tip && <h3 className="add__tooltip">{tip}</h3>}
      {children}
    </div>
  );
}

export default Add;
