import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import "./toggler.css";

function Toggler({ expanded, expand }) {
  return (
    <button className="icon__sidebar" onClick={() => expand(!expanded)}>
      {expanded && <FaChevronLeft className="icon" />}
      {!expanded && <FaChevronRight className="icon" />}
    </button>
  );
}

export default Toggler;
