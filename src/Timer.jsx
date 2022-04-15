import React from "react";

const getTime = (seconds) => {
  const time = new Date(seconds * 1000);

  return [time.getHours() - 1, time.getMinutes(), time.getSeconds()]
    .map((time) => (time < 10 ? `0${time}` : time))
    .join(":");
};

export const Timer = ({
  isSubscription,
  seconds,
  start,
  stop,
  reset,
  wait,
}) => {
  return (
    <div>
      <button onClick={isSubscription ? stop : start}>
        {isSubscription ? "stop" : "start"}
      </button>
      <button onClick={reset}>reset</button>
      <button onClick={wait}>wait</button>

      <div>{getTime(seconds)}</div>
    </div>
  );
};
