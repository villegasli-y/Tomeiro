import { useContext } from "react";
import { TimerContext } from "@/context/TimerContext";

export function useTimer() {
  const context = useContext(TimerContext);
  if (!context) throw new Error("useTimer is not inside <TimerProvider>");
  return context;
}

