import { createContext, useState, useRef, useMemo, useEffect } from "react";
import type { TimeData, TimerState } from "@/types/timer";
import { parseSecondsToTime } from "@/lib/timer-utils";
import {
  type TimerContextType,
  type TimerProviderProps,
  INITIAL_TIME,
  INITIAL_TIMER_STATE,
  INITIAL_CONTEXT,
} from "./types";

const TimerContext = createContext<TimerContextType | null>(INITIAL_CONTEXT);

const TimerProvider = ({ children }: TimerProviderProps) => {
  const startRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const accumulatedRef = useRef(0);
  const [time, setTime] = useState<TimeData>(INITIAL_TIME);
  const [state, setState] = useState<TimerState>(INITIAL_TIMER_STATE);

  function InitialValues() { return 125 * 1000; } // we need to convert this value * 1000 bc performance.now() use mileseconds

  useEffect(() => { //handle default values and future localStore values
    const ts = InitialValues();
    accumulatedRef.current = ts || 0;
    setTime(parseSecondsToTime(ts || 0));
  }, [])

  useEffect(() => {
    if (!state.isRunning) {//clear the startRef and the interval for no memory leaks
      clearTimerInterval();
      return;
    }

    startRef.current = performance.now();
    intervalRef.current = setInterval(() => {
      const now = performance.now();
      const delta = now - (startRef?.current ?? 0) + accumulatedRef.current; // acumulatedRef works as default value

      setTime(parseSecondsToTime(delta));
    }, 1000);

    return () => clearTimerInterval();
  }, [state.isRunning]);

  const clearTimerInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    startRef.current = null;
  };

  const updateStateInternal = (payload: Partial<TimerState>) => {
    setState((prev) => ({ ...prev, ...payload }));
  };

  const cancelTimer = () => {
    clearTimerInterval();
    accumulatedRef.current = 0;
    setTime(INITIAL_TIME);
    updateStateInternal({ isRunning: false, isPaused: false });
  };

  const pauseTimer = () => {
    if (state.isRunning) {
      accumulatedRef.current += performance.now() - (startRef?.current ?? 0);
      setTime(parseSecondsToTime(accumulatedRef.current));
      updateStateInternal({ isRunning: false, isPaused: true });
    }
  };

  const startTimer = () => {
    if (!state.isRunning) {
      updateStateInternal({ isRunning: true });
    }
  };

  // TODO: clear timer data
  const cleanTimerState = () => {
    updateStateInternal(INITIAL_TIMER_STATE);
    clearTimerInterval();
    accumulatedRef.current = 0;
    setTime(INITIAL_TIME);
  };

  const timerContextValue = useMemo(
    () => ({
      ...state,
      time,
    }),
    [state, time]
  );

  return (
    <TimerContext.Provider
      value={{
        start: startTimer,
        cancel: cancelTimer,
        pause: pauseTimer,
        clear: cleanTimerState,
        ...timerContextValue,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
export { TimerContext };
