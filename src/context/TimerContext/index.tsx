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

function InitialValues(): number { return (125) }

const TimerProvider = ({ children }: TimerProviderProps) => {
  const startRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const accumulatedRef = useRef(0);
  const [time, setTime] = useState<TimeData>(INITIAL_TIME);
  const [state, setState] = useState<TimerState>(INITIAL_TIMER_STATE);

  useEffect(() => { //handle default values and future localStore values
    accumulatedRef.current = InitialValues();
    setTime(parseSecondsToTime(InitialValues()));
  }, [])

  useEffect(() => {
    if (!state.isRunning) {
      cleanUpTimerRefs(); //clear the startRef and the interval for no memory leaks
      return;
    }

    startRef.current = performance.now();
    intervalRef.current = setInterval(() => {
      const now = performance.now();
      const deltaMs = now - (startRef?.current ?? 0);
      const deltaSeconds = deltaMs / 1000;
      const totalSeconds = deltaSeconds + accumulatedRef.current;

      setTime(parseSecondsToTime(totalSeconds));
    }, 1000);

    return () => cleanUpTimerRefs();
  }, [state.isRunning]);

  const cleanUpTimerRefs = () => {
    clearTimerInterval();
    startRef.current = null;
  }

  const clearTimerInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const updateStateInternal = (payload: Partial<TimerState>) => {
    setState((prev) => ({ ...prev, ...payload }));
  };

  const cancelTimer = () => {
    cleanUpTimerRefs();
    accumulatedRef.current = 0;
    setTime(INITIAL_TIME);
    updateStateInternal({ isRunning: false, isPaused: false });
  };

  const pauseTimer = () => {
    if (state.isRunning) {
      const now = performance.now();
      const deltaMs = now - (startRef?.current ?? 0);
      const deltaSeconds = deltaMs / 1000;
      accumulatedRef.current += deltaSeconds;
      setTime(parseSecondsToTime(accumulatedRef.current));
      updateStateInternal({ isRunning: false, isPaused: true });
    }
  };

  const startTimer = () => {
    if (!state.isRunning) {
      updateStateInternal({ isRunning: true, isPaused: false });
    }
  };

  const cleanTimerState = () => {
    updateStateInternal(INITIAL_TIMER_STATE);
    cleanUpTimerRefs();
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
