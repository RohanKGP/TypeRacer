import { useState } from "react";
import Typeracer from "./Typeracer";

function SinglePlayer(props) {
  const [myWPM, setMyWPM] = useState("");
  const showSCSingle = true;
  const showSCMulti = false;
  return (
    <>
      <Typeracer
        email={props.email}
        showInviteBtn={props.showInviteBtn}
        myWPM={myWPM}
        setMyWPM={setMyWPM}
        showSCSingle={showSCSingle}
        showSCMulti={showSCMulti}
      />
    </>
  );
}

export default SinglePlayer;
