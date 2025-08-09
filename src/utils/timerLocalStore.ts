import { getItem, setItem, removeItem } from "./localStoreManager";
import type { Timer } from "@/types/timer";

const TIMER_KEY = "timer";

export function saveTimerLS(timer: Timer){
    setItem(TIMER_KEY, timer);
}

export function getTimerLS(): Timer | null {
    return getItem<Timer>(TIMER_KEY);
}

export function removeTimerLS(){
    removeItem(TIMER_KEY);
}