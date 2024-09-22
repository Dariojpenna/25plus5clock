import "./App.css";
import React, { useState , useEffect} from "react";


function App() {
const [breakLength, setBreakLength] = useState(5);
const [sessionLength, setSessionLength] = useState(1500);
const [timeLeft, setTimeLeft] = useState(sessionLength);
const [timerOn, setTimerOn] = useState(false);
const [onBreak, setOnBreak] = useState(false);

const handleReset = (e) => {
  setSessionLength(1500);
  setBreakLength(5);
  setTimeLeft(1500);
  setTimerOn(false);
  setOnBreak(false);  
}

//use effect for timer
useEffect(() => {
  if (!timerOn) return;

  const timerId = setInterval(() => {
    setTimeLeft((prev) => prev - 1); 
  }, 1000); // Cambié de 100ms a 1000ms para un segundo.

  if (timeLeft === 0) {
    clearInterval(timerId);

    // Reproduce el sonido
    const audio = new Audio("https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav");
    audio.play();

    // Cambia el estado de onBreak y establece el nuevo tiempo
    if (!onBreak) {
      setOnBreak(true);
      setTimeLeft(breakLength * 60);
    } else {
      setOnBreak(false);
      setTimeLeft(sessionLength);
    }

    if (timeLeft === 0 && onBreak) {
      handleReset();
    }
  }

  return () => clearInterval(timerId); 
}, [timerOn, timeLeft, onBreak, sessionLength, breakLength]);

const handleIncrementDecrement = (e) => {
  const id = e.target.id;

    if (breakLength < 1500 && id === "break-increment" && timerOn === false) {
      setBreakLength(breakLength  + 1);
    }
    if (breakLength > 1 && id === "break-decrement" && timerOn === false) {
      setBreakLength(breakLength  - 1);
    }
    if (sessionLength < 3000 && id === "session-increment" && timerOn === false) {
      setSessionLength(sessionLength  + 60);
      setTimeLeft(sessionLength + 60);
    }
    if (sessionLength > 60 && id === "session-decrement" && timerOn === false) {
        setSessionLength (sessionLength - 60);
        setTimeLeft(sessionLength - 60);
    }
  }

const handleStartStop = (e) => {
  setTimerOn(!timerOn);
} 

const formatTime = () => {
  const minutes = Math.floor(timeLeft / 60); 
  const seconds = timeLeft % 60; 
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`; // Formato mm:ss
};


  return (
    <div className="App">
      <header>
        <h1> 25 + 5 Clock </h1>
      </header>
      <main>
        <div className="selectors">
          <div className="break-box">
            <div id="break-label">
              Break Length
            </div>
            <div className="control-length">
              <button id="break-increment" onClick={handleIncrementDecrement}>
                <i className="fa-sharp fa-solid fa-arrow-up"></i>
              </button>
              <div id="break-length">
                {breakLength}
              </div>
              <button id="break-decrement" onClick={handleIncrementDecrement}>
              <i className="fa-sharp fa-solid fa-arrow-down"></i>
              </button>
            </div>
          </div>
          <div className="session-box">
            <div id="session-label " >
            Session Length
            </div>
            <div  className="control-length">
            <button id="session-increment"  onClick={handleIncrementDecrement}>
              <i className="fa-sharp fa-solid fa-arrow-up"></i>
            </button>
            <div id="session-length">
              { sessionLength/60}
            </div>
            <button id="session-decrement" onClick={handleIncrementDecrement}>
              <i className="fa-sharp fa-solid fa-arrow-down"></i>
            </button>
            </div>
          </div>
        </div>
        <div className="clock-box">
          <div className="timer">
            <div id="timer-wrapper">
              <div id="timer-label">
                {onBreak ? "Break" : "Session"}
              </div> <div id="time-left "> {formatTime()}</div>
            </div>
          </div>
          <div className="controls">
            <button id="start_stop" onClick={handleStartStop}>
            <i className="fa-regular fa-play"></i>   
            </button>
            <button id="reset" onClick={handleReset}>
              <i className="fa-solid fa-arrow-rotate-left" ></i>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
