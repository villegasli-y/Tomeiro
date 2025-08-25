export interface TimerState {
  isPaused: boolean;
  isRunning: boolean;
  cancelEnabled: boolean;
}

export type TimeData = {
  hours: number;
  minutes: number;
  seconds: number;
};

export type TimeStringData = {
  hours: string;
  minutes: string;
  seconds: string;
};
