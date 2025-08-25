import { getStringTime } from "@/lib/timer-utils";
import { Button } from "./ui/button";
import { useTimer } from "@/hooks/useTimer";

export const TimerComponent = () => {
  const {
    start,
    time: { hours, seconds, minutes },
    cancel,
  } = useTimer();

  return (
    <div>
      <div>
        <span>
          {getStringTime(hours)}
          {` `}:{` `}
        </span>
        <span>
          {getStringTime(minutes)}
          {` `}:{` `}
        </span>
        <span>{getStringTime(seconds)}</span>
      </div>
      <div className="flex flex-row gap-2">
        <Button onClick={cancel}>Cancel</Button>
        <Button onClick={start}>Start</Button>
      </div>
    </div>
  );
};
