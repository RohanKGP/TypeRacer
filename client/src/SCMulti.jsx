import React from "react";
import "./SCMulti.css";

function ScoreBoard(props) {
  return (
    <div className="scoreboard-container">
      <div className="player-1">
        <h1 className="SCMulti-username">Username : {props.email}</h1>
        <h2 className="SCMulti-WPM">WPM: {props.WPM}</h2>
      </div>
      <div className="player-2">
        <h1 className="SCMulti-username">Username : {props.peer}</h1>
        <h2 className="SCMulti-WPM">WPM: {props.peerWPM}</h2>
      </div>
    </div>
  );
}

export default ScoreBoard;
