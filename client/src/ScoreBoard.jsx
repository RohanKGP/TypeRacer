import React from "react";
import "./ScoreBoard.css";

function ScoreBoard() {
  return (
    <div className="scoreboard-container">
      <div className="player-1">
        <h1>Me</h1>
      </div>
      <div className="player-2">
        <h1> Player 2</h1>
      </div>
    </div>
  );
}

export default ScoreBoard;
