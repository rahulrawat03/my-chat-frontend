import "./searchMessage.css";

function SearchMessage({ message }) {
  return (
    <>
      <h3 className="search__message">{message}</h3>
      <div className="message-underline"></div>
    </>
  );
}

export default SearchMessage;
