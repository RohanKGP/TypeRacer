import Typeracer from "./Typeracer";
import React, { useEffect, useState } from "react";

import { evWPM } from "./constants";

function Multiplayer(props) {
  const showSCSingle = false;
  const showSCMulti = true;

  const [myWPM, setMyWPM] = useState("");
  const [peerWPM, setPeerWPM] = useState("");

  console.log(myWPM);

  // Todo: useEffect for websocket connection
  useEffect(() => {
    props.ws.send(
      JSON.stringify({
        evType: `${evWPM}`,
        data: `${myWPM}`,
        email: `${props.email}`,
        peer: `${props.peer}`,
      })
    );

    props.ws.addEventListener("message", (event) => {
      const e = JSON.parse(event.data);
      console.log(`Multi : ${JSON.stringify(e)}`);
      if (parseInt(e.evType) === evWPM) {
        setPeerWPM(e.data);
      }
    });

    return () => {
      props.ws.onclose = () => {
        console.log("WebSocket Disconnected");
        props.setWS({});
      };
    };
  }, [props, props.ws.onopen, props.ws.onclose, props.ws, myWPM]);

  return (
    <>
      <Typeracer
        showSCSingle={showSCSingle}
        showSCMulti={showSCMulti}
        email={props.email}
        peer={props.peer}
        myWPM={myWPM}
        setMyWPM={setMyWPM}
        peerWPM={peerWPM}
      />
    </>
  );
}

export default Multiplayer;
