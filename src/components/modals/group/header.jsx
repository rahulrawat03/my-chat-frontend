import { useState } from "react";
import "./header.css";

function Header({ error, onSubmit }) {
  const [name, setName] = useState("");

  const handleChange = ({ currentTarget: target }) => {
    setName(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(name);
  };

  return (
    <div className="modal__header">
      <form className="group__header" onSubmit={handleSubmit}>
        <input
          type="text"
          className="group__name"
          placeholder="Enter group name"
          value={name}
          onChange={handleChange}
          autoComplete="off"
          autoFocus={true}
        />
        <button type="submit" className="btn__create-group">
          create
        </button>
      </form>
      {error && <h3 className="group__header__error">{error}</h3>}
    </div>
  );
}

export default Header;
