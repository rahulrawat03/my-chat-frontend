import "./friendImage.css";

function FriendImage({ imageSource }) {
  return (
    <div className="image-container">
      <img
        src={imageSource || "/images/profile.png"}
        alt="user profile"
        className="image friend__image"
        accept="image/jpeg image/png"
      />
    </div>
  );
}

export default FriendImage;
