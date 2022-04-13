import React from "react";

export const Timer = ({ seconds, start, stop, reset, wait }) => (
  <div>
    <button onClick={start}>start</button>
    <button onClick={stop}>stop</button>
    <button onClick={reset}>reset</button>
    <button onClick={wait}>wait</button>

    <div>{seconds}</div>
  </div>
);
