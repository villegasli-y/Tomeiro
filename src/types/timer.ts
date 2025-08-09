export interface Timer {
    hours: number;
    minutes: number;
    seconds: number;
    tempHours: number;
    tempMinutes: number;
    tempSeconds: number;
    isPause: boolean;
    isRunning: boolean;
    cancelEnabled: boolean;
}