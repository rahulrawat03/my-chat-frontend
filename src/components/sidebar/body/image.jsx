import "./image.css";

function Image({ imageSource }) {
  return (
    <img
      src={imageSource || "/images/profile.png"}
      alt="friend profile"
      className="user__message__image"
    />
  );
}

export default Image;
