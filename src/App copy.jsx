import React, { useState } from "react";
import { Observable } from "rxjs";
import { Timer } from "./Timer.jsx";

let subscription = null;
let withWait = false;
let clickTime = new Date();

const interval = (i) =>
  new Observable((observer) =>
    setInterval(() => {
      observer.next(i);
      i += 1;
    }, 100)
  );

const subscriber = (foo) => ({
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

const App = () => {
  const [seconds, setSeconds] = useState(null);

  const start = () => {
    if (subscription !== null) return;

    const observable = interval(withWait ? seconds : 0);
    subscription = observable.subscribe(subscriber(setSeconds));

    if (withWait) {
      withWait = false;
    }
  };

  const stop = () => {
    subscription.unsubscribe();
    subscription = null;
  };

  const reset = () => {
    if (subscription !== null) stop();

    start();
  };

  const wait = () => {
    if (withWait) return;

    const newClickTime = new Date();

    if (newClickTime - clickTime < 300) {
      stop();
    }

    withWait = true;

    clickTime = newClickTime;
  };

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
