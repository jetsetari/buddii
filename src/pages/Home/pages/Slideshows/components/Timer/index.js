import React, { useState, useEffect } from "react";
import moment from "moment";
import { PauseCircle, PlayCircle } from 'react-feather';

import "./Timer.scss";

const Timer = ({ currentSlide, client, setCurrentSeconds }) => {
  const [seconds, setSeconds] = useState(0);
  const [run, setRun] = useState(false);

  const startTimer = () => { setRun(true); };
  const pauseTimer = () => { setRun(false); };
  const stopTimer = () => { setRun(false); setSeconds(0); setCurrentSeconds(0); };

  useEffect(() => {
  stopTimer();
  startTimer();
  }, [currentSlide])

  useEffect(() => {
    let interval: number;
    if (run === true) {
      interval = setInterval(() => {
        setCurrentSeconds((seconds) => seconds + 1);
        setSeconds((seconds) => seconds + 1);
      }, 1000); 
    }
    return () => clearInterval(interval);
  }, [run]);

  useEffect(() => {
    
  }, [client]);

  return (
  <div className={`timer ${client ? 'client' : ''}`}>
    { client && <div className="current-client" style={{ backgroundImage: `url(${client.image})` }} /> }
    <div className="timer-wrapper">
      { client && <span className="client-name">{ client.firstName+' '+client.lastName }</span> }
      { run && <PauseCircle onClick={ () => pauseTimer() } color="#909090" size={16} />}
      { !run && <PlayCircle onClick={ () => startTimer() } color="#909090" size={16} />}
      <span className="seconds">{moment("2015-01-01").startOf('day').seconds(seconds).format('H:mm:ss')}</span>
    </div>
  </div>
  );
};

export default Timer;
