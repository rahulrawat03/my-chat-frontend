import { useState, useEffect } from "react";
import Demo from "./demo";
import Register from "./register";
import Login from "./login";
import Loader from "../loader/loader";
import "./authentication.css";

function Authentication() {
  const [isLogin, setLogin] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <Loader />;

  return (
    <section>
      <img src="/images/appLogo.svg" alt="app logo" className="app__logo" />
      <section className="auth">
        <Demo />
        {isLogin ? (
          <Login setLogin={setLogin} />
        ) : (
          <Register setLogin={setLogin} />
        )}
      </section>
    </section>
  );
}

export default Authentication;
