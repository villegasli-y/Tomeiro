import { createContext, useEffect, type ReactNode, useState } from "react";
import type { Timer } from "@/types/timer";
import { getTimerLS, saveTimerLS, removeTimerLS } from "@/utils/timerLocalStore";

interface TimerContextType {
    timer: Timer;
    initializeTimer: (initialValues: Omit<Timer, 'isRunning' | 'isPause' | 'cancelEnabled'>) => void;
    pauseTimer: (currentValues: Omit<Timer, 'isRunning' | 'isPause' | 'cancelEnabled' | 'tempHours' | 'tempMinutes' | 'tempSeconds'>) => void;
    resumeTimer: (currentValues: Omit<Timer, 'isRunning' | 'isPause' | 'cancelEnabled' | 'tempHours' | 'tempMinutes' | 'tempSeconds'>) => void;
    cancelTimer: (baseValues: Omit<Timer, 'isRunning' | 'isPause' | 'cancelEnabled' | 'hours' | 'minutes' | 'seconds'>) => void;
    completedTimer: (finalValues: Omit<Timer, 'isRunning' | 'isPause' | 'cancelEnabled' | 'tempHours' | 'tempMinutes' | 'tempSeconds'>) => void;
    cleanTimerData: () => void;
}

type Props = {
    children: ReactNode,
}

const TimerContext = createContext<TimerContextType | null>(null)

const TimerProvider = ({ children }: Props) => {

    const [timer, setTimer] = useState<Timer>({
        hours: 0,
        minutes: 0,
        seconds: 0,
        tempHours: 0,
        tempMinutes: 0,
        tempSeconds: 0,
        isPause: false,
        isRunning: false,
        cancelEnabled: false,
    });
    const emptyTimer = {
        hours: 0,
        minutes: 0,
        seconds: 0,
        tempHours: 0,
        tempMinutes: 0,
        tempSeconds: 0,
        isPause: false,
        isRunning: false,
        cancelEnabled: false,
    }

    useEffect(() => {
        const storedTimer = getTimerLS();
        if (storedTimer) {
            setTimer(storedTimer);
        }
    }, [])

    const initializeTimer = (initialValues: Omit<Timer, 'isRunning' | 'isPause' | 'cancelEnabled'>) => {
        const payload: Timer = { ...initialValues, isRunning: true, isPause: false, cancelEnabled: true };
        setTimer(payload);
        saveTimerLS(payload);
    }

    const pauseTimer = (currentValues: Omit<Timer, 'isRunning' | 'isPause' | 'cancelEnabled' | 'tempHours' | 'tempMinutes' | 'tempSeconds'>) => {
        const payload: Timer = { ...currentValues, isRunning: false, isPause: true, cancelEnabled: true, tempHours: timer.tempHours, tempMinutes: timer.tempMinutes, tempSeconds: timer.tempSeconds };
        setTimer(payload);
        saveTimerLS(payload);
    }

    const resumeTimer = (currentValues: Omit<Timer, 'isRunning' | 'isPause' | 'cancelEnabled' | 'tempHours' | 'tempMinutes' | 'tempSeconds'>) => {
        const payload: Timer = { ...currentValues, isRunning: true, isPause: false, cancelEnabled: true, tempHours: timer.tempHours, tempMinutes: timer.tempMinutes, tempSeconds: timer.tempSeconds };
        setTimer(payload);
        saveTimerLS(payload);
    }

    const cancelTimer = (baseValues: Omit<Timer, 'isRunning' | 'isPause' | 'cancelEnabled' | 'hours' | 'minutes' | 'seconds'>) => {
        const payload: Timer = { ...baseValues, isRunning: false, isPause: false, cancelEnabled: false, hours: timer.tempHours, minutes: timer.tempMinutes, seconds: timer.tempSeconds };
        setTimer(payload);
        saveTimerLS(payload);
    }

     const completedTimer = (finalValues: Omit<Timer, 'isRunning' | 'isPause' | 'cancelEnabled' | 'tempHours' | 'tempMinutes' | 'tempSeconds'>) => {
        const payload: Timer = { ...finalValues, isRunning: false, isPause: false, cancelEnabled: false, tempHours: timer.tempHours, tempMinutes: timer.tempMinutes, tempSeconds: timer.tempSeconds };
        setTimer(payload);
        saveTimerLS(payload);
    }

    const cleanTimerData = () => {
        setTimer(emptyTimer);
        removeTimerLS();
    }

    return (

        <TimerContext.Provider value={{ timer, initializeTimer, pauseTimer, resumeTimer, cancelTimer, completedTimer, cleanTimerData }}>
            {children}
        </TimerContext.Provider>
    )
}

export default TimerProvider;
export { TimerContext };