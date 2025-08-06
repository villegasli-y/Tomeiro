import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

const TimerComponent = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [cancelEnabled, setCancelEnabled] = useState(false);

  const handlePause = () => {
    setIsRunning(false);

  }

  const handleStart = () => {
    setIsRunning(true);
    setCancelEnabled(true);

  }

  const handleCancel = () => {
    setIsRunning(false);
    setCancelEnabled(false);
  }

  useEffect(() => {
  }, [])

  return (
    <div className='flex flex-col border bg-emerald-900 rounded-lg p-4'>
      <div className='flex flex-row justify-center items-center text-center  gap-1'>
        <div>
          <p className='text-white'>hr</p>
          <Input className='w-20 text-center text-white ' maxLength={2} type='number' placeholder='00' />
        </div>
        <p className='font-bold text-white'>:</p>
        <div>
          <p className='text-white'>min</p>
          <Input className='w-20 text-center text-white' maxLength={2} type='number' placeholder='00' />
        </div>
        <p className='font-bold text-white '>:</p>
        <div>
          <p className='text-white'>sec</p>
          <Input className='w-20 text-center text-white' maxLength={2} type='number' placeholder='00' />
        </div>
      </div>
      <div className='flex flex-row justify-between mt-4'>
        <Button onClick={handleCancel} disabled={!cancelEnabled} >Cancel</Button>
        {isRunning ? (
          <Button onClick={handlePause}>Pause</Button>
        ) : (
          <Button onClick={handleStart}>Start</Button>
        )}
      </div>
    </div>
  )
}

export default TimerComponent