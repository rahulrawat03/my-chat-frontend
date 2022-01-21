import { useState, useEffect, useCallback } from "react";
import Input from "./input";
import SearchMessage from "./searchMessage";
import Profile from "./profile";
import { getUserByEmail } from "../../services/userService";
import { getSearch, saveSearch } from "../../services/storageService";

function Search() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const userSearch = useCallback(async (email) => {
    if (email === "") return;

    setError("");
    const { user, err } = await getUserByEmail(email);

    if (err) setError(err);
    else setUser(user);
    setSearched(true);
    saveSearch(email);
  }, []);

  const handleChange = ({ currentTarget: target }) => {
    setEmail(target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    userSearch(email);
  };

  useEffect(() => {
    const search = getSearch();
    if (search) {
      setEmail(search);
      userSearch(search);
    }
  }, [userSearch]);

  return (
    <div className="friend-search">
      <Input email={email} onChange={handleChange} onSubmit={handleSubmit} />
      {!searched && <SearchMessage message="search for user" />}
      {searched && error && <SearchMessage message={error} />}
      {searched && !error && <Profile user={user} />}
    </div>
  );
}

export default Search;
