class Countdown {
  private time: number;
  private intervalId: NodeJS.Timeout | null;
  remaining?: (remainingTime: number) => void;

  constructor(time: number) {
    this.time = Date.now() + time * 1000;
    this.intervalId = null;
  }

  start(): void {
    if (this.intervalId) {
      throw new Error('Countdown timer is already running.');
    }

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const remainingTime = this.time - currentTime;

      if (remainingTime <= 0) {
        this.stop();
      } else {
        if (this.remaining) this.remaining(Math.floor(remainingTime / 1000));
      }
    }, 1000);
  }
  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
export const CountdownTimer = Countdown;
