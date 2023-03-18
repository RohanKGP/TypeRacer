import { useState } from "react";
import "./Invite.css";

function Invite() {
  var email = "meshramrohan786@gmail.com";
  const [codeValue, setCodeValue] = useState("");
  const [generatedCode, setGenratedCode] = useState("");

  function genrateCode() {
    var url = "http://localhost:3000/api/invite/generateCode";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        username: email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setGenratedCode(data.generatedCode);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSubmit() {
    var url = "http://localhost:3000/api/invite/checkCode";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        username: email,
        enteredCode: codeValue,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleTypedCode(event) {
    setCodeValue(event.target.value);
  }
  return (
    <>
      <div className="main-container">
        <h1 className="header">Invite Friends</h1>
        <button className="generate-btn" onClick={genrateCode}>
          Generate Code
        </button>
        <div className="input-container">
          <input
            className="type-code"
            type="text"
            placeholder="Invite Code"
            onChange={handleTypedCode}
          />
          <button className="enter-code" onClick={handleSubmit}>
            Enter
          </button>
        </div>
        <div className="generated-code-container">
          <h2> Invitation Code: </h2>
          <p className="generated-code">{generatedCode}</p>
        </div>
      </div>
    </>
  );
}

export default Invite;
