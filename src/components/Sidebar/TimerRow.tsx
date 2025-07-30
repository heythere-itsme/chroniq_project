'use client'
import { useTimerStore } from '@/lib/utils/timerStore'
import { Pause, Play } from 'lucide-react'
import React from 'react'
import { formatSeconds } from '../Timer/Segment'
import { handleUsedSeconds } from '@/lib/utils/TasknMeet'

const TimerRow = () => {
    const {timers, currentTimer, setTimer} = useTimerStore()
    const timer = timers[currentTimer];

    const usedTime = timer.startTime && timer.isRunning
    ? timer.used + Math.floor((Date.now() - timer.startTime) / 1000)
    : timer.used;
    
    const totalUsed = Math.min(timer.used + usedTime, timer.total);

    const handleStart = async () => {
    if (!timer.name) return;
    if (timer.isRunning) await handleUsedSeconds({timerName: timer.name, totalUsed: totalUsed, id: timer.id});
    
    setTimer();
  };

  return (
    <div className='flex justify-between items-center bg-primary-light py-3 px-5 mx-auto w-80 rounded-[10px]'>
        <div onClick={handleStart} className='cursor-pointer'>
        {timer.isRunning ? <Pause /> : <Play />}
        </div>
        <h4 className='w-30 font-semibold'>{timer.name}</h4>
        <div className='flex gap-1'>
        <h5>{formatSeconds(usedTime)}</h5>
        <h5>/</h5>
        <h5>{formatSeconds(timer.total)}</h5>
        </div>
    </div>
  )
}

export default TimerRow