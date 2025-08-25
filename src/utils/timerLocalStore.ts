import { getItem, setItem, removeItem } from "./localStoreManager";
import type { TimerState } from "@/types/timer";

const TIMER_KEY = "timer";

export function saveTimerLS(timer: TimerState) {
  setItem(TIMER_KEY, timer);
}

export function getTimerLS(): TimerState | null {
  return getItem<TimerState>(TIMER_KEY);
}

export function removeTimerLS() {
  removeItem(TIMER_KEY);
}
