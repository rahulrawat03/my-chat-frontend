import { useState, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import Profile from "./profile";
import Search from "./search";
import sidebarContext from "../../contexts/sidebar";
import { filterConversations } from "../../services/conversationService";
import "./header.css";

function Header() {
  const [searchValue, setSearchValue] = useState("");
  const { search, showSearch, conversations, setSearchedConversations } =
    useContext(sidebarContext);

  const handleChange = ({ currentTarget: target }) => {
    setSearchValue(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchValue);
  };

  const handleSearch = (pattern) => {
    const filteredConversations = filterConversations(conversations, pattern);
    setSearchedConversations(filteredConversations);
  };

  const handleSearchBar = () => {
    handleSearch("");
    setSearchValue("");
    showSearch(!search);
  };

  return (
    <>
      <header className="sidebar__header">
        <Profile />
        <label htmlFor="chat-search">
          <FaSearch className="search__icon" onClick={handleSearchBar} />
        </label>
      </header>

      <Search
        show={search}
        searchValue={searchValue}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default Header;
