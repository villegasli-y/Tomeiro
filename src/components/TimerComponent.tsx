import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useTimer } from '@/hooks/useTimer'

const TimerComponent = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const { timer, initializeTimer, pauseTimer, resumeTimer, cancelTimer, completedTimer } = useTimer();

  const handleStart = () => {
    if (isNaN(hours) || hours >= 0 && isNaN(minutes) || minutes >= 0 && isNaN(seconds) || seconds === 0) {
      alert("Please fill the timer values");
    } else {
      initializeTimer({
        hours: hours, minutes: minutes, seconds: seconds,
        tempHours: hours, tempMinutes: minutes, tempSeconds: seconds,
      })
    }
  }

  const handlePause = () => {
    pauseTimer({
      hours: hours, minutes: minutes, seconds: seconds,
    })
  }

  const handleResume = () => {
    resumeTimer({
      hours: hours, minutes: minutes, seconds: seconds,
    })
  }

  const handleCancel = () => {
    cancelTimer({ tempHours: timer.tempHours, tempMinutes: timer.tempMinutes, tempSeconds: timer.tempSeconds })
    setHours(timer.tempHours)
    setMinutes(timer.tempMinutes);
    setSeconds(timer.tempSeconds);
  }

  useEffect(() => {
    if (timer.isPause) {
      setHours(timer.hours);
      setMinutes(timer.minutes);
      setSeconds(timer.seconds);
    }
  }, [timer.isPause])

  useEffect(() => {
    if (!timer.isRunning && !timer.isPause) {
      setHours(timer.tempHours);
      setMinutes(timer.tempMinutes);
      setSeconds(timer.tempSeconds);
    }
  }, [timer.isRunning, timer.isPause])

  useEffect(() => {
    let interValID: string | number | NodeJS.Timeout | undefined;
    if (timer.isRunning) {
      interValID = setInterval(() => {
        if (hours === 0 && minutes === 0 && seconds === 0) {
          completedTimer({ hours: hours, minutes: minutes, seconds: seconds });
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

  }, [timer.isRunning, hours, minutes, seconds])

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