import React, { useState } from "react";
import { interval } from "rxjs";
import { Timer } from "./Timer.jsx";

const observable = interval(100);

const subscribe = (foo) =>
  observable.subscribe({
    next(x) {
      foo(x);
    },
    error(err) {
      console.error("something wrong occurred: " + err);
    },
    complete() {
      console.log("done");
    },
  });

let subscription = null;

const App = () => {
  const [seconds, setSeconds] = useState(0);

  const start = () => {
    if (subscription !== null) return;

    subscription = subscribe(setSeconds);
  };

  const stop = () => {
    if (subscription === null) return;

    subscription.complete();
    subscription = null;
  };

  const reset = () => {
    stop();
    start();
  };

  const wait = () => {};

  return (
    <Timer
      seconds={seconds}
      start={start}
      stop={stop}
      reset={reset}
      wait={wait}
    />
  );
};

export default App;
