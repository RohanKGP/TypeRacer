import React, { useState, useEffect } from "react";
import ScoreBoard from "./ScoreBoard";
import "./Typeracer.css";

function Typeracer() {
  // Todo: State Values for Gameplay

  const [value, setvalue] = useState("");
  const [counter, setCounter] = useState(0);
  var tempword = "";

  // Todo: Timer for Gameplay

  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [wordColor, setWordColor] = useState([]);
  var wordClass = "span-color";

  useEffect(() => {
    let interval;
    console.log(`isRunning effect: ${isRunning}`);
    if (isRunning) {
      interval = setInterval(() => {
        const elapdsedTime = Date.now() - startTime;
        if (elapdsedTime >= 100000) {
          stop();
        } else {
          setCurrentTime(elapdsedTime);
        }
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  function start() {
    setIsRunning(true);
    setStartTime(Date.now());
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setIsRunning(false);
    setCurrentTime(0);
    setWordColor([]);
  }

  // Format Time

  function formatTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  }

  const list = "Hello my Name is Rohan"; // fetch const list from an API
  const listWords = list.split(" ");
  function handleKeyDown(event) {
    if (!isRunning && currentTime === 0) {
      start();
      return;
    }

    if (event.code === "Space" && isRunning) {
      let newValue = value.trim(); // Remove White Spaces Created by HandleChange
      tempword = newValue;
      console.log(wordColor);
      if (tempword === listWords[counter]) {
        // counter maintains state to check Words
        setWordColor((prev) => [...prev, 1]);
        console.log("Correct Word");
      } else {
        console.log("Wrong Word");
        setWordColor((prev) => [...prev, 0]);
      }

      setvalue("");
      setCounter(counter + 1); // increase count one by one
    }
  }

  function handleChange(event) {
    setvalue(event.target.value);
  }

  return (
    <div>
      <ScoreBoard />
      <div className="main-container">
        <div className="para-container">
          <p>
            {listWords.map((word, index) => {
              let wordCl;
              if (wordColor[index] !== undefined) {
                wordCl = wordClass + (wordColor[index] ? "-green" : "-red");
              }
              return (
                <span key={index} className={wordCl}>
                  {word}{" "}
                </span>
              );
            })}
          </p>
        </div>
        <div className="input_button-container">
          <input
            id="inputValue"
            value={value}
            type="text"
            placeholder="Start Typing here ..."
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="footer">
          <div className="timer">{formatTime(currentTime)}</div>
          <button className="start_btn" onClick={reset}>
            Reset
          </button>
        </div>
        <div id="typedValue">
          {!isRunning && currentTime !== 0 ? "Times Up!" : ""}
        </div>
      </div>
    </div>
  );
}

export default Typeracer;
