export const LiveElapsed = ({timers, currentTimer, name} : {timers: any; currentTimer: string; name: string }) => {

  const timerData = timers[name];
  const isActive = currentTimer === name;
  const isRunning = isActive && timerData?.isRunning;
  const storedUsed = timerData?.used ?? 0;
  const startTime = timerData?.startTime;

  const liveElapsed =
    isActive && isRunning && startTime
      ? Math.floor((Date.now() - startTime) / 1000)
      : 0;

  const usedSeconds = storedUsed + liveElapsed;
  return usedSeconds;
}