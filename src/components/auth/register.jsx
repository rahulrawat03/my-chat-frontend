import { useState, useContext } from "react";
import Joi from "joi-browser";
import Input from "./input";
import { register, getCurrentUser } from "../services/userService";
import notificationContext from "../contexts/notification";
import userContext from "../contexts/user";
import "./register.css";

function Register({ setLogin }) {
  const login = (e) => {
    e.preventDefault();
    setLogin(true);
  };

  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState({ name: "", email: "", password: "" });
  const handleNotification = useContext(notificationContext);
  const { setCurrentUser } = useContext(userContext);

  const handleChange = ({ currentTarget: target }) => {
    const updatedUser = { ...user };
    const updatedError = { ...error };

    if (target.name === "name") {
      updatedUser.name = target.value;
      updatedError.name = validateProperty("name", target.value) || "";
    } else if (target.name === "email") {
      updatedUser.email = target.value;
      updatedError.email = validateProperty("email", target.value) || "";
    } else if (target.name === "password") {
      updatedUser.password = target.value;
      updatedError.password = validateProperty("password", target.value) || "";
    }

    setUser(updatedUser);
    setError(updatedError);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate(error, setError, user)) return;

    const result = await register(user);
    if (result && result.isExpected) {
      const { property, message } = result.err;
      const updatedError = { ...error };
      updatedError[property] = message;

      setError(updatedError);
      return;
    }

    if (result) {
      handleNotification(result.err, false);
      return;
    } else setCurrentUser(getCurrentUser());
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <Input
        name="name"
        type="text"
        onChange={handleChange}
        value={user.name}
        error={error.name}
        autoFocus={true}
      />
      <Input
        name="email"
        type="email"
        onChange={handleChange}
        value={user.email}
        error={error.email}
      />
      <Input
        name="password"
        type="password"
        onChange={handleChange}
        value={user.password}
        error={error.password}
      />
      <button type="submit" className="auth__btn">
        submit
      </button>
      <button to="#" className="auth__link" onClick={login}>
        already registered? login here
      </button>
    </form>
  );
}

const schema = {
  name: Joi.string().min(3).max(50).required().label("Name"),
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
  const properties = ["name", "email", "password"];

  properties.forEach((property) => {
    updatedError[property] = validateProperty(property, user[property]);
  });

  setError(updatedError);
  return updatedError.name || updatedError.email || updatedError.password;
}

export default Register;
