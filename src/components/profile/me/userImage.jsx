import Image from "../common/image";

function UserImage({ user, setImage, setUser }) {
  const handleImageChange = (imageUrl, imageFile) => {
    setImage(imageFile);
    setUser({ ...user, imageUrl });
  };

  return (
    <Image
      imageSource={user.imageUrl}
      onImageChange={handleImageChange}
      isAdmin={true}
    />
  );
}

export default UserImage;
