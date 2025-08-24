export const parseSecondsToTime = (totalSeconds: number | string) => {
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

type ParsedTime = {
  hours: number;
  minutes: number;
  seconds: number;
};

export const getTimerToDisplay = ({ hours, minutes, seconds }: ParsedTime) => {
  const displayHours = hours < 10 ? "0" + hours : String(hours);
  const displayMinutes = minutes < 10 ? "0" + minutes : String(minutes);
  const displaySeconds = seconds < 10 ? "0" + seconds : String(seconds);

  return { displayHours, displayMinutes, displaySeconds };
};
