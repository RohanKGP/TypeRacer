import { useState } from "react";
import "./Invite.css";

function Invite() {
  var value = "";
  const [codeValue, setCodeValue] = useState("");

  function genrateCode() {}

  function handleSubmit() {}

  function handleTypedCode(event) {
    setCodeValue(event.target.value);
  }
  return (
    <>
      <div className="main-container">
        <h1 className="header">Invite Freinds</h1>
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
        <p>{value}</p>
      </div>
    </>
  );
}

export default Invite;
