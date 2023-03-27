import React, { useState } from "react";
import "./LoginPage.css";
import SinglePlayer from "./SinglePlayer";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setAuthStatus] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const showInviteBtn = true;

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
      url = "http://192.168.1.117:3000/api/user/addUser";
    } else {
      url = "http://192.168.1.117:3000/api/user/loginUser";
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

  if (isAuthenticated)
    return <SinglePlayer email={email} showInviteBtn={showInviteBtn} />;

  return (
    <div className="login-main-container">
      <div className="login-error-message">{errorMsg}</div>
      <h1 className="login-header">Type Racer</h1>
      <div className="login-input-box">
        <input
          type="text"
          placeholder="Email"
          className="login-email"
          onChange={handleEmail}
        />
        <input
          type="text"
          placeholder="Password"
          className="login-password"
          onChange={handlePassword}
        />
      </div>
      <div className="login-btns">
        <button className="login-sign-up" onClick={() => Signup(true)}>
          Sign Up
        </button>
        <button className="login-login" onClick={() => Signup(false)}>
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
