import React, { useState } from "react";
import "./LoginForm.css";
import Card from "../Card/Card";
import GoogleIcon from "@mui/icons-material/Google";
import { database } from "../../utils/database";

const LoginForm = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});

  const errors = {
    username: "Invalid username",
    password: "Invalid password",
    noUsername: "Please enter your username",
    noPassword: "Please enter your password",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username) {
      setErrorMessages({ name: "noUsername", message: errors.noUsername });
      return;
    }

    if (!password) {
      setErrorMessages({ name: "noPassword", message: errors.noPassword });
      return;
    }

    const currentUser = database.find((user) => user.username === username);

    if (currentUser) {
      if (currentUser.password !== password) {
        setErrorMessages({ name: "password", message: errors.password });
      } else {
        setErrorMessages({});
        setIsLoggedIn(true);
      }
    } else {
      setErrorMessages({ name: "username", message: errors.username });
    }
  };
  const renderErrorMsg = (name) =>
    name === errorMessages.name && (
      <p className="error_msg">{errorMessages.message}</p>
    );

  return (
    <Card>
      <h1 className="title">Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputs_container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {renderErrorMsg("username")}
          {renderErrorMsg("noUsername")}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {renderErrorMsg("password")}
          {renderErrorMsg("noPassword")}
        </div>
        <input type="submit" value="Log In" className="login_button" />
      </form>
      <div className="icons">
        <GoogleIcon className="icon" />
      </div>
    </Card>
  );
};

export default LoginForm;
