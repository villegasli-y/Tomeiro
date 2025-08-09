import { createContext, useEffect, type ReactNode, useState } from "react";
import type { Timer } from "@/types/timer";
import { getTimerLS, saveTimerLS, removeTimerLS } from "@/utils/timerLocalStore";

interface TimerContextType {
    timer: Timer;
    startTimerData: (timerData: Omit<Timer, 'isRunning' | 'isPause' | 'cancelEnabled'>) => void;
    pauseTimerData: (timerPauseData: Omit<Timer, 'isRunning' | 'isPause' | 'cancelEnabled' | 'tempHours' | 'tempMinutes' | 'tempSeconds'>) => void;
    resumeTimerData: (timerResumeData: Omit<Timer, 'isRunning' | 'isPause' | 'cancelEnabled' | 'tempHours' | 'tempMinutes' | 'tempSeconds'>) => void;
    cancelTimer: (timerData: Omit<Timer, 'isRunning' | 'isPause' | 'cancelEnabled' | 'hours' | 'minutes' | 'seconds'>) => void;
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

    const startTimerData = (timerData: Omit<Timer, 'isRunning' | 'isPause' | 'cancelEnabled'>) => {
        const timerPayload: Timer = { ...timerData, isRunning: true, isPause: false, cancelEnabled: true };
        setTimer(timerPayload);
        saveTimerLS(timerPayload);
    }

    const pauseTimerData = (timerPauseData: Omit<Timer, 'isRunning' | 'isPause' | 'cancelEnabled' | 'tempHours' | 'tempMinutes' | 'tempSeconds'>) => {
        const timerPausePayload: Timer = { ...timerPauseData, isRunning: false, isPause: true, cancelEnabled: true, tempHours: timer.tempHours, tempMinutes: timer.tempMinutes, tempSeconds: timer.tempSeconds };
        setTimer(timerPausePayload);
        saveTimerLS(timerPausePayload);
    }

    const resumeTimerData = (timerResumeData: Omit<Timer, 'isRunning' | 'isPause' | 'cancelEnabled' | 'tempHours' | 'tempMinutes' | 'tempSeconds'>) => {
        const timerPausePayload: Timer = { ...timerResumeData, isRunning: true, isPause: false, cancelEnabled: true, tempHours: timer.tempHours, tempMinutes: timer.tempMinutes, tempSeconds: timer.tempSeconds };
        setTimer(timerPausePayload);
        saveTimerLS(timerPausePayload);
    }

    const cancelTimer = (timerData: Omit<Timer, 'isRunning' | 'isPause' | 'cancelEnabled' | 'hours' | 'minutes' | 'seconds'>) => {
        const timerCancelPayload: Timer = { ...timerData, isRunning: false, isPause: false, cancelEnabled: false, hours: timer.tempHours, minutes: timer.tempMinutes, seconds: timer.tempSeconds };
        setTimer(timerCancelPayload);
        saveTimerLS(timerCancelPayload);
    }

    const cleanTimerData = () => {
        setTimer(emptyTimer);
        removeTimerLS();
    }

    return (

        <TimerContext.Provider value={{ timer, startTimerData, resumeTimerData, pauseTimerData, cancelTimer, cleanTimerData }}>
            {children}
        </TimerContext.Provider>
    )
}

export default TimerProvider;
export { TimerContext };