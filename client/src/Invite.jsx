import { useState, useEffect } from "react";
import "./Invite.css";
import { evRegister } from "./constants";
import Multiplayer from "./Multiplayer";

const URL = "ws://localhost:3000";

function Invite(props) {
  const email = props.email;
  const [codeValue, setCodeValue] = useState("");
  const [generatedCode, setGenratedCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [invited, setInvited] = useState(false);
  const [waitmsg, setWaitMsg] = useState("");
  const [connectedTo, setConnectedTo] = useState("");

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

    setWaitMsg("Wating for a user to Join");
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
        if (data.success === false) {
          setInvited(false);
          setErrorMsg(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleTypedCode(event) {
    setCodeValue(event.target.value);
  }

  function handleMsg(data) {
    console.log(data);
    if (parseInt(data.evType) === 3) {
      setConnectedTo(data.Data);
      setInvited(true);
    }
  }

  // Todo: State for webSocket
  const [ws, setWs] = useState(new WebSocket(URL));

  // Todo: useEffect for websocket connection
  useEffect(() => {
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          evType: `${evRegister}`,
          Data: `${email}`,
        })
      );
    };

    ws.onmessage = (event) => {
      handleMsg(JSON.parse(event.data));
    };

    return () => {
      ws.onclose = () => {
        console.log("WebSocket Disconnected");
        setWs(new WebSocket(URL));
      };
    };
  }, [ws.onopen, ws.onclose, ws, email]);

  if (invited) {
    console.log(`username: ${email}`);
    return <Multiplayer player1={email} player2={connectedTo} />;
  }

  return (
    <>
      <div className="invite-main-container">
        <div className="invite-main-heading">
          <h1 className="invite-header">Invite Friends</h1>
          <button className="invite-generate-btn" onClick={genrateCode}>
            Generate Code
          </button>
        </div>
        <div className="invite-input-container">
          <input
            className="invite-type-code"
            type="text"
            placeholder="Invite Code"
            onChange={handleTypedCode}
          />
          <button className="invite-enter-code" onClick={handleSubmit}>
            Enter
          </button>
        </div>
        <div className="invite-generated-code-container">
          <h2> Invitation Code: </h2>
          <p className="invite-generated-code">{generatedCode}</p>
        </div>
        <>
          <p>{errorMsg}</p>
        </>
        <>
          <p>{waitmsg}</p>
        </>
        <>
          <p>{`You are Connected To : ${connectedTo}`}</p>
        </>
      </div>
    </>
  );
}

export default Invite;
