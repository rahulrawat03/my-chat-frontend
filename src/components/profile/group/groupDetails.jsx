import Detail from "../common/detail";
import "./groupDetails.css";

function GroupDetails({ group: { name, about }, onChange, isAdmin }) {
  return (
    <section className="group__details">
      <Detail
        name="name"
        type="text"
        value={name || ""}
        onChange={onChange}
        disabled={!isAdmin}
      />
      <Detail
        name="about"
        type="text"
        value={about || ""}
        onChange={onChange}
        disabled={!isAdmin}
        isTextarea={true}
      />
    </section>
  );
}

export default GroupDetails;
