import "./detail.css";

function Detail({ name, type, value, onChange, disabled, isTextarea }) {
  return (
    <div className="user__detail">
      <h3 className="detail__name">{name}</h3>
      {!isTextarea && (
        <input
          type={type}
          name={name}
          className="detail__value"
          value={value}
          readOnly={!onChange}
          onChange={onChange}
          disabled={disabled}
          autoComplete="off"
        />
      )}
      {isTextarea && (
        <textarea
          name={name}
          className="detail__value"
          value={value}
          readOnly={!onChange}
          onChange={onChange}
          disabled={disabled}
          maxLength={150}
        ></textarea>
      )}
    </div>
  );
}

export default Detail;
