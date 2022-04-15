import React, { useState, useEffect } from "react";
import { interval } from "rxjs";
import { map } from "rxjs/operators";
import { Timer } from "./Timer.jsx";

const observable = interval(10).pipe(map((seconds) => seconds + 1));
let subscription = null;

const App = () => {
  const [seconds, setSeconds] = useState(0);
  const [withWait, setWithWait] = useState(false);
  const [waitClick, setWaitClick] = useState(new Date());

  const start = (withReset = false) => {
    subscription = observable.subscribe({
      next: (x) => setSeconds(withWait && !withReset ? seconds + x : x),
      error: (err) => console.error("something wrong occurred: " + err),
      complete: () => console.log("done"),
    });

    if (withWait) setWithWait(false);
  };

  const stop = () => {
    if (subscription !== null) {
      subscription.complete();
      subscription = null;
    }

    if (!withWait) setSeconds(0);
  };

  const reset = () => {
    stop();
    start(true);
  };

  const wait = () => {
    const newClick = new Date();

    if (newClick - waitClick < 300 && !withWait) setWithWait(true);

    setWaitClick(newClick);
  };

  useEffect(() => {
    if (withWait) stop();
  }, [withWait]);

  return (
    <Timer
      isSubscription={subscription !== null && !withWait}
      seconds={seconds}
      start={start}
      stop={stop}
      reset={reset}
      wait={wait}
    />
  );
};

export default App;
