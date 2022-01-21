import { useState, useContext } from "react";
import Joi from "joi-browser";
import Input from "./input";
import { login, getCurrentUser } from "../services/userService";
import notificationContext from "../contexts/notification";
import userContext from "../contexts/user";
import "./login.css";

function Login({ setLogin }) {
  const handleRegister = (e) => {
    e.preventDefault();
    setLogin(false);
  };

  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });
  const handleNotification = useContext(notificationContext);
  const { setCurrentUser } = useContext(userContext);

  const handleChange = ({ currentTarget: target }) => {
    const updatedUser = { ...user };
    const updatedError = { ...error };

    if (target.name === "email") {
      updatedUser.email = target.value;
      updatedError.email = validateProperty("email", target.value);
    } else if (target.name === "password") {
      updatedUser.password = target.value;
      updatedError.password = validateProperty("password", target.value);
    }

    setUser(updatedUser);
    setError(updatedError);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate(error, setError, user)) return;

    const result = await login(user);
    if (result && result.isExpected) {
      const updatedError = { ...error };
      updatedError.email = result.err;
      updatedError.password = result.err;

      setError(updatedError);
      return;
    }

    if (result) {
      handleNotification(result.err, false);
      return;
    }

    const currentUser = getCurrentUser();
    setCurrentUser(currentUser);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <Input
        name="email"
        type="email"
        value={user.email}
        onChange={handleChange}
        error={error.email}
        autoFocus={true}
      />
      <Input
        name="password"
        type="password"
        value={user.password}
        onChange={handleChange}
        error={error.password}
      />
      <button type="submit" className="auth__btn">
        submit
      </button>
      <button to="#" className="auth__link" onClick={handleRegister}>
        new user? register here
      </button>
    </form>
  );
}

const schema = {
  email: Joi.string().email().min(3).max(255).required().label("Email"),
  password: Joi.string().min(8).max(255).required().label("Password"),
};

function validateProperty(property, value) {
  const object = { [property]: value };
  const objSchema = { [property]: schema[property] };

  const { error } = Joi.validate(object, objSchema);
  return error?.details[0].message;
}

function validate(error, setError, user) {
  const updatedError = { ...error };
  const properties = ["email", "password"];

  properties.forEach((property) => {
    updatedError[property] = validateProperty(property, user[property]);
  });

  setError(updatedError);
  return updatedError.email || updatedError.password;
}

export default Login;
