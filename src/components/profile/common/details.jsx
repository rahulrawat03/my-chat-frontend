import Detail from "./detail";
import "./details.css";

function Details({ user: { name, email, status, city }, onChange, isFriend }) {
  return (
    <div className="user__details">
      <Detail
        name="name"
        type="text"
        value={name || ""}
        onChange={onChange}
        disabled={true}
      />
      <Detail
        name="email"
        type="email"
        value={email || ""}
        onChange={onChange}
        disabled={true}
      />
      <Detail
        name="status"
        type="text"
        value={status || ""}
        onChange={onChange}
        disabled={isFriend}
      />
      <Detail
        name="city"
        type="text"
        value={city || ""}
        onChange={onChange}
        disabled={isFriend}
      />
    </div>
  );
}

export default Details;
