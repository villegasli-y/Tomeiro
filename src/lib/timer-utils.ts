import type { TimeData, TimeStringData } from "@/types/timer";

export const parseSecondsToTime = (totalSeconds: number | string): TimeData => {
  let seconds = Number(totalSeconds);
  let hours = 0;
  let minutes = 0;
  let secondsToMinutes = 0;
  let minutesToSeconds = 0;
  let minutesToHours = 0;
  let hoursToMinutes = 0;

  secondsToMinutes = Math.trunc(seconds / 60);
  minutesToSeconds = Math.trunc(secondsToMinutes) * 60;
  minutesToHours = Math.trunc(secondsToMinutes / 60);
  hoursToMinutes = minutesToHours * 60;

  hours = minutesToHours;
  minutes = secondsToMinutes - hoursToMinutes;
  seconds = seconds - minutesToSeconds;

  return { hours, minutes, seconds };
};

export const getStringTime = (time: number): string =>
  time < 10 ? "0" + time : String(time);

export const getTimerToDisplay = (
  totalSeconds: number | string
): TimeStringData => {
  const {
    hours: numHours,
    minutes: numMinites,
    seconds: numSeconds,
  } = parseSecondsToTime(totalSeconds);

  return {
    hours: getStringTime(numHours),
    minutes: getStringTime(numMinites),
    seconds: getStringTime(numSeconds),
  };
};
