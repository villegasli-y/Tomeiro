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
  const booted = useRef(false);

  const [time, setTime] = useState<TimeData>(INITIAL_TIME);
  const [state, setState] = useState<TimerState>(INITIAL_TIMER_STATE);

  useEffect(() => {
    if (state.isRunning && booted.current) {
      startRef.current = performance.now();

      intervalRef.current = setInterval(() => {
        const now = performance.now();
        const delta = now - (startRef?.current ?? 0) + accumulatedRef.current; // acumulatedRef works as default value

        setTime(parseSecondsToTime(delta));
      }, 1000);
    } else {
      clearTimerInterval();
    }

    return () => clearTimerInterval();
  }, [state]);

  const clearTimerInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const updateStateInternal = (payload: Partial<TimerState>) => {
    setState((prev) => ({ ...prev, ...payload }));
  };

  const cancelTimer = () => {
    updateStateInternal({ isRunning: false, isPaused: false });
    accumulatedRef.current = 0;
    setTime(INITIAL_TIME);
  };

  const pauseTimer = () => {
    if (state.isRunning) {
      accumulatedRef.current += performance.now() - (startRef?.current ?? 0);
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
