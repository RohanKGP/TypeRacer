import React, { useState, useEffect } from "react";
import Invite from "./Invite";
import InviteBtn from "./InviteBtn";
import SCSingle from "./SCSingle";
import "./Typeracer.css";

function Typeracer(props) {
  // Todo: State Values for Gameplay

  const [value, setvalue] = useState("");
  const [counter, setCounter] = useState(0);
  var tempword = "";

  // Todo: Timer for Gameplay

  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [wordColor, setWordColor] = useState([]);
  const [inviteAuth, setInviteAuth] = useState(false);
  const [WPM, setWPM] = useState("");
  var wordClass = "typeRacer-span-color";

  useEffect(() => {
    let interval;
    console.log(`isRunning effect: ${isRunning}`);
    if (isRunning) {
      interval = setInterval(() => {
        const elapdsedTime = Date.now() - startTime;
        if (elapdsedTime >= 60000) {
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
    setWPM(0);
  }

  function stop() {
    setIsRunning(false);
    setCounter(0);
    setWPM(0);
  }

  function reset() {
    setCounter(0);
    setIsRunning(false);
    setCurrentTime(0);
    setWordColor([]);
    setWPM(0);
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
      if (tempword === listWords[counter]) {
        // counter maintains state to check Words
        setWordColor((prev) => [...prev, 1]);
        console.log("Correct Word");
      } else {
        console.log("Wrong Word");
        setWordColor((prev) => [...prev, 0]);
      }

      setvalue("");
      setCounter(counter + 1);
      setWPM(Math.floor((60 * (counter + 1)) / (currentTime / 1000)));
    }
  }

  function handleChange(event) {
    setvalue(event.target.value);
  }

  function handleInvite() {
    console.log(`${props.email}`);
    setInviteAuth(true);
  }

  if (inviteAuth) return <Invite email={props.email} />;

  return (
    <div>
      <>
        {(props.showSCSingle || props.showInviteBtn) && (
          <SCSingle email={props.email} WPM={WPM} />
        )}
      </>
      <div className="typeRacer-main-container">
        {props.showInviteBtn && <InviteBtn handleInvite={handleInvite} />}
        <div className="typeRacer-para-container">
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
        <div className="typeRacer-input_button-container">
          <input
            id="inputValue"
            value={value}
            type="text"
            placeholder="Start Typing here ..."
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="typeRacer-footer">
          <div className="typeRacer-timer">{formatTime(currentTime)}</div>
          <button className="typeRacer-start_btn" onClick={reset}>
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
