import React, { useState } from "react";
import { Observable, interval } from "rxjs";
import { Timer } from "./Timer.jsx";

const interval2 = (i) =>
  new Observable((observer) => {
    const id = setInterval(() => {
      observer.next(i);
      i += 1;
    }, 100);

    return () => {
      clearInterval(id);
      observable = null;
    };
  });

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
