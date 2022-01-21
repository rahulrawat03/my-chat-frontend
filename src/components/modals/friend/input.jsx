import { FaSearch } from "react-icons/fa";
import "./input.css";

function Input({ email, onChange, onSubmit }) {
  return (
    <form className="friend-search__form" onSubmit={onSubmit}>
      <input
        type="text"
        className="friend-search__input"
        placeholder="Enter the email"
        value={email}
        onChange={onChange}
        autoFocus={true}
      />
      <button type="submit" className="btn__friend-search">
        <FaSearch />
      </button>
    </form>
  );
}

export default Input;
