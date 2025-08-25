import {
  createContext,
  type ReactNode,
  useState,
  useRef,
  useMemo,
} from "react";
import type { TimeData, TimerState } from "@/types/timer";
import { removeTimerLS } from "@/utils/timerLocalStore";
import { parseSecondsToTime } from "@/lib/timer-utils";

type TimerContextType = TimerState & {
  start: () => void; // TODO: pass initial value
  cancel: () => void;
  clear: () => void;
  pause: () => void;
  time: TimeData;
};

type Props = {
  children: ReactNode;
};

const INITIAL_TIME: TimeData = {
  hours: 0,
  seconds: 0,
  minutes: 0,
};

const INITIAL_TIMER_STATE: TimerState = {
  cancelEnabled: false,
  isPaused: false,
  isRunning: false,
};

const INITIAL_CONTEXT: TimerContextType = {
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

const TimerContext = createContext<TimerContextType | null>(INITIAL_CONTEXT);

const TimerProvider = ({ children }: Props) => {
  // TODO: pause timer without removing current time

  const startRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // TODO: valor por defecto, asignar aqui al animation frame
  const [time, setTime] = useState<TimeData>(INITIAL_TIME);
  const [state, setState] = useState<TimerState>(INITIAL_TIMER_STATE);

  // TODO: set what is on LS
  //   useEffect(() => {
  //     const storedTimer = getTimerLS();
  //     if (storedTimer) {
  //       setTimer(storedTimer);
  //     }
  //   }, []);

  const updateTimer = () => {
    const now = performance.now();

    if (startRef.current) {
      // TODO: make functionality to count backwards
      const parsedSeconds = Math.trunc((now - startRef.current) / 1000);
      setTime(parseSecondsToTime(parsedSeconds));
      animationFrameRef.current = requestAnimationFrame(updateTimer);
    }
  };

  const cancelTimer = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
      startRef.current = null;
    }
  };

  const pauseTimer = () => {
    // TODO: handle resume functionlatity
    return;
  };

  const startTimer = () => {
    if (!startRef.current) {
      startRef.current = performance.now();
      updateTimer();
    }
  };

  // TODO: clear timer data
  const cleanTimerState = () => {
    setState(INITIAL_TIMER_STATE);
    removeTimerLS();
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
