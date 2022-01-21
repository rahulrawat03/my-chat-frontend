import "./input.css";

function Input({ name, type, onChange, value, error, autoFocus }) {
  return (
    <div className="form__group">
      <span>
        <label htmlFor={name} className="form__input__label">
          {name}
        </label>
      </span>
      <input
        type={type}
        className="form__input"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        autoComplete="off"
        autoFocus={autoFocus}
      />
      {error && <p className="form__error">{error}</p>}
    </div>
  );
}

export default Input;
