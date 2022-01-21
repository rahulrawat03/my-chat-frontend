import { useState } from "react";
import Tooltip from "./imageTooltip";
import "./image.css";

function Image({ imageSource, onImageChange, isAdmin }) {
  const [tooltip, showTooltip] = useState(false);

  const handleImageChange = ({ currentTarget: imageInput }) => {
    const [imageFile] = imageInput.files;
    const imageUrl = URL.createObjectURL(imageFile);

    onImageChange(imageUrl, imageFile);
  };

  return (
    <div className="image-container">
      <img
        src={imageSource || "/images/profile.png"}
        alt="user profile"
        className="image"
        accept="image/jpeg image/png"
      />
      {isAdmin && (
        <label htmlFor="image-change">
          <div
            className="btn__image-change"
            onMouseOver={() => showTooltip(true)}
            onMouseLeave={() => showTooltip(false)}
          >
            change
          </div>
          <input type="file" id="image-change" onChange={handleImageChange} />
        </label>
      )}
      {tooltip && <Tooltip />}
    </div>
  );
}

export default Image;
