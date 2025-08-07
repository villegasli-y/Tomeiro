import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

const TimerComponent = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [tempHours, setTempHours] = useState(0);
  const [tempMinutes, setTempMinutes] = useState(0);
  const [tempSeconds, setTempSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [cancelEnabled, setCancelEnabled] = useState(false);
  const [isPause, setIsPause] = useState(false);

  const handlePause = () => {
    setIsRunning(false);
    setIsPause(true);
  }

  const handleStart = () => {
    setIsRunning(true);
    setIsPause(false);
    setCancelEnabled(true);
    setTempHours(hours);
    setTempMinutes(minutes);
    setTempSeconds(seconds);
  }

  const handleCancel = () => {
    setIsRunning(false);
    setCancelEnabled(false);
    setIsPause(false)
    setHours(tempHours)
    setMinutes(tempMinutes);
    setSeconds(tempSeconds);
  }

  useEffect(() => {
    let interValID: string | number | NodeJS.Timeout | undefined;
    if (isRunning) {
      interValID = setInterval(() => {
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

  }, [isRunning, hours, minutes, seconds])

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
            onChange={(e) => setHours(parseInt(e.target.value))}
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
            onChange={(e) => setMinutes(parseInt(e.target.value))}
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
            onChange={(e) => setSeconds(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div className='flex flex-row justify-between mt-4'>
        <Button onClick={handleCancel} disabled={!cancelEnabled} >Cancel</Button>

        {isRunning && <Button onClick={handlePause}>Pause</Button>}
        {!isRunning && !isPause && <Button onClick={handleStart}>Start</Button>}
        {isPause && <Button onClick={handleStart}>Resume</Button>}
      </div>
    </div>
  )
}

export default TimerComponent