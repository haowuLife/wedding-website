export type CountdownValue = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function getCountdown(now: Date, target: Date): CountdownValue {
  const remaining = Math.max(0, target.getTime() - now.getTime());
  const totalSeconds = Math.floor(remaining / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}
