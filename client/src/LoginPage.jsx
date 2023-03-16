import React, { useState } from "react";
import "./LoginPage.css";
import Typeracer from "./Typeracer";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setAuthStatus] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Todo: getting email and password from Input Text Box

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  // Todo: Submit the email and Password

  function Signup(signup) {
    let url = "";
    if (signup) {
      url = "http://localhost:3000/api/user/addUser";
    } else {
      url = "http://localhost:3000/api/user/loginUser";
    }

    fetch(url, {
      // method Changes
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setAuthStatus(true);
        } else {
          setErrorMsg(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (isAuthenticated) return <Typeracer />;

  return (
    <div className="main-container">
      <div className="error-message">{errorMsg}</div>
      <h1 className="header">Type Racer</h1>
      <div className="input-box">
        <input
          type="text"
          placeholder="Email"
          className="email"
          onChange={handleEmail}
        />
        <input
          type="text"
          placeholder="Password"
          className="password"
          onChange={handlePassword}
        />
      </div>
      <div className="btns">
        <button className="sign-up" onClick={() => Signup(true)}>
          Sign Up
        </button>
        <button className="login" onClick={() => Signup(false)}>
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
