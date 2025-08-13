import { useEffect, useState, useCallback } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useTimer } from '@/hooks/useTimer'

const TimerComponent = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const { timer, initializeTimer, pauseTimer, resumeTimer, cancelTimer, completedTimer } = useTimer();

  const saveTimerState = useCallback(() => {
    if (timer.isRunning) {
      pauseTimer({
        ...timer,
        hours,
        minutes,
        seconds
      });
    }
  }, [timer, hours, minutes, seconds, pauseTimer]);

  const handleStart = () => {
    if (hours === 0 && minutes === 0 && seconds === 0) {
      alert("Please fill the timer values");
    } else {
      initializeTimer({
        ...timer,
        hours,
        minutes,
        seconds,
        tempHours: hours,
        tempMinutes: minutes,
        tempSeconds: seconds,
      })
    }
  }

  const handlePause = () => {
    pauseTimer({
      ...timer,
      hours,
      minutes,
      seconds,
    })
  }

  const handleResume = () => {
    resumeTimer({
      ...timer,
      hours,
      minutes,
      seconds
    })
  }

  const handleCancel = () => {
    cancelTimer({
      ...timer,
      hours: timer.tempHours,
      minutes: timer.tempMinutes,
      seconds: timer.tempSeconds
    });
  }

  //fill the states if we had info the localstore & fill the states when the tab where close or unmount the component
  useEffect(() => {
    if (!timer.isRunning && !timer.isPause) {
      setHours(timer.tempHours);
      setMinutes(timer.tempMinutes);
      setSeconds(timer.tempSeconds);
    } else {
      setHours(timer.hours);
      setMinutes(timer.minutes);
      setSeconds(timer.seconds);
    }

  }, [timer.isRunning, timer.isPause, timer.tempHours, timer.tempMinutes, timer.tempSeconds, timer.hours, timer.minutes, timer.seconds]);


  //main functionality
  useEffect(() => {
    let interValID: string | number | NodeJS.Timeout | undefined;
    if (timer.isRunning) {
      interValID = setInterval(() => {
        if (hours === 0 && minutes === 0 && seconds === 0) {
          completedTimer({
            ...timer,
            hours,
            minutes,
            seconds
          });
          setTimeout(() => {
            alert("Timer has finished");
          }, 100);
        }
        if (hours > 0 && minutes === 0 && seconds === 0) {
          setMinutes(prev => prev + 60);
          setHours(prev => prev - 1);
        }
        if (seconds === 0) {
          setSeconds(prev => prev + 59);
          setMinutes(prev => prev - 1);
        }
        if (seconds > 0) {
          setSeconds(prev => prev - 1);
        }
      }, 1000)
    }

    return () => {
      clearInterval(interValID);
    }

  }, [timer.isRunning, hours, minutes, seconds, completedTimer, timer])


  //Save the timer state when user close or refresh the page
  useEffect(() => {
    window.addEventListener('beforeunload', saveTimerState);

    return () => {
      window.removeEventListener('beforeunload', saveTimerState);
    };
  }, [saveTimerState]);

  return (
    <div className='flex flex-col border bg-emerald-900 rounded-lg p-4'>
      <div className='flex flex-row justify-center items-center text-center  gap-1'>
        <div>
          <p className='text-white'>hr</p>
          <Input
            className='w-20 text-center text-white'
            max={23}
            maxLength={2}
            type='number'
            placeholder='00'
            value={hours}
            min={0}
            disabled={timer.isRunning}
            onChange={(e) => {
              let number = parseInt(e.target.value, 10);
              if (isNaN(number)) number = 0;
              if (number < 0) number = 0;
              if (number > 23) number = 23;
              setHours(number);
            }
            }
          />
        </div>
        <p className='font-bold text-white'>:</p>
        <div>
          <p className='text-white'>min</p>
          <Input
            className='w-20 text-center text-white'
            max={59}
            maxLength={2}
            type='number'
            placeholder='00'
            value={minutes}
            min={0}
            disabled={timer.isRunning}
            onChange={(e) => {
              let number = parseInt(e.target.value, 10);
              if (isNaN(number)) number = 0;
              if (number < 0) number = 0;
              if (number > 60) number = 59;
              setMinutes(number);
            }
            }
          />
        </div>
        <p className='font-bold text-white '>:</p>
        <div>
          <p className='text-white'>sec</p>
          <Input
            className='w-20 text-center text-white'
            max={59}
            maxLength={2}
            type='number'
            placeholder='00'
            value={seconds}
            min={0}
            disabled={timer.isRunning}
            onChange={(e) => {
              let number = parseInt(e.target.value, 10);
              if (isNaN(number)) number = 0;
              if (number < 0) number = 0;
              if (number > 60) number = 59;
              setSeconds(number);
            }
            }
          />
        </div>
      </div>
      <div className='flex flex-row justify-between mt-4'>
        <Button onClick={handleCancel} disabled={!timer.cancelEnabled} >Cancel</Button>
        {timer.isRunning && <Button onClick={handlePause}>Pause</Button>}
        {!timer.isRunning && !timer.isPause && <Button onClick={handleStart}>Start</Button>}
        {timer.isPause && <Button onClick={handleResume}>Resume</Button>}
      </div>
    </div>
  )
}

export default TimerComponent