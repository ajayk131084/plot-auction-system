import React, { useState, useEffect, useRef } from "react";

type BidTimerProps = {
  timeFromServer: number;
};

const BidTimer: React.FC<BidTimerProps> = ({ timeFromServer }) => {
  const [seconds, setSeconds] = useState<number>(0);

  const intervalRef = useRef<number>(0);

  //start the timer after the first mount
  useEffect(() => {
    setSeconds(timeFromServer);
    intervalRef.current = window.setInterval(countDown, 1000);
    return () => clearInterval(intervalRef.current);
  }, [timeFromServer]);

  const countDown = () => setSeconds((sec) => sec - 1);

  const m = Math.floor((seconds % (60 * 60)) / 60);
  const s = Math.ceil((seconds % (60 * 60)) % 60);

  return (
    <div className="clock">
      <div>
        <span className="minutes">{m}</span>
        <div className="smalltext">Min</div>
      </div>
      <div>
        <span className="seconds">{s}</span>
        <div className="smalltext">sec</div>
      </div>
    </div>
  );
};

export default BidTimer;
