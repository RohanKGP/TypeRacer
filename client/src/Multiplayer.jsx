import Typeracer from "./Typeracer";
import SCMulti from "./SCMulti";

function Multiplayer(props) {
  const showSCSingle = false;
  return (
    <>
      <SCMulti player1={props.player1} player2={props.player2} />
      <Typeracer showSCSingle={showSCSingle} />
    </>
  );
}

export default Multiplayer;
