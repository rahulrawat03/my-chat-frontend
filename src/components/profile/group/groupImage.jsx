import Image from "../common/image";

function GroupImage({ group, setImage, setGroup, isAdmin }) {
  const handleChange = (imageUrl, imageFile) => {
    setImage(imageFile);
    setGroup({ ...group, imageUrl });
  };

  return (
    <Image
      imageSource={group?.imageUrl}
      onImageChange={handleChange}
      className="group__image-container"
      isAdmin={isAdmin}
    />
  );
}

export default GroupImage;
