import type { TimeData, TimerState } from "@/types/timer";

// TimerContext specific types
export type TimerContextType = TimerState & {
  start: () => void;
  cancel: () => void;
  clear: () => void;
  pause: () => void;
  time: TimeData;
};

export type TimerProviderProps = {
  children: React.ReactNode;
};

// Constants for TimerContext
export const INITIAL_TIME: TimeData = {
  hours: 0,
  seconds: 0,
  minutes: 0,
};

export const INITIAL_TIMER_STATE: TimerState = {
  cancelEnabled: false,
  isPaused: false,
  isRunning: false,
};

export const INITIAL_CONTEXT: TimerContextType = {
  ...INITIAL_TIMER_STATE,
  time: INITIAL_TIME,
  clear: () => {
    return;
  },
  start: () => {
    return;
  },
  cancel: () => {
    return;
  },
  pause: () => {
    return;
  },
};
