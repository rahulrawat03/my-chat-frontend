import { useLocation } from "react-router-dom";
import "./notFound.css";

function NotFound() {
  const { state } = useLocation();

  return (
    <div className="not-found">
      <img
        src="/images/notFound.svg"
        alt="page not found"
        className="not-found__image"
      />
      <h2 className="not-found__heading">{state?.err || "page not found"}</h2>
    </div>
  );
}

export default NotFound;
