import "./search.css";

function Search({ show, searchValue, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="chatSearch"
        placeholder="Search ..."
        value={searchValue}
        onChange={onChange}
        className={show ? "chat-search" : "chat-search chat-search--hidden"}
        id="chat-search"
        autoComplete="off"
      />
    </form>
  );
}

export default Search;
