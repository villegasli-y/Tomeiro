# TimerContext API Documentation

## Overview

The `TimerContext` is the core state management system for Tomeiro's timer functionality. It provides a comprehensive API for managing timer operations with high precision and efficient state updates.

## Context Provider

### TimerProvider

```tsx
import TimerProvider from "@/context/TimerContext";

<TimerProvider>{children}</TimerProvider>;
```

**Props:**

- `children: React.ReactNode` - Child components that will have access to timer context

## Context API

### useTimer Hook

```tsx
import { useTimer } from "@/hooks/useTimer";

const {
  // State
  time,
  isRunning,
  isPaused,
  cancelEnabled,

  // Actions
  start,
  pause,
  cancel,
  clear,
} = useTimer();
```

### State Properties

#### `time: TimeData`

Current timer display time broken down into components.

```typescript
type TimeData = {
  hours: number; // Hours elapsed (0-∞)
  minutes: number; // Minutes in current hour (0-59)
  seconds: number; // Seconds in current minute (0-59)
};
```

#### `isRunning: boolean`

Indicates whether the timer is currently active and counting.

- `true`: Timer is actively running
- `false`: Timer is stopped or paused

#### `isPaused: boolean`

Indicates whether the timer is in a paused state.

- `true`: Timer is paused (retains accumulated time)
- `false`: Timer is either running or completely stopped

#### `cancelEnabled: boolean`

UI state indicating whether the cancel button should be enabled.

### Action Methods

#### `start(): void`

Starts or resumes the timer.

**Behavior:**

- If timer is stopped: Starts from 00:00:00
- If timer is paused: Resumes from accumulated time
- If timer is already running: No effect

**State Changes:**

- Sets `isRunning` to `true`
- Sets `isPaused` to `false`
- Initiates interval for time updates

#### `pause(): void`

Pauses the currently running timer.

**Behavior:**

- Stops the timer interval
- Preserves accumulated time
- Only effective when timer is running

**State Changes:**

- Sets `isRunning` to `false`
- Sets `isPaused` to `true`
- Maintains current time display

#### `cancel(): void`

Completely resets the timer to initial state.

**Behavior:**

- Stops any running timer
- Clears all accumulated time
- Resets display to 00:00:00

**State Changes:**

- Sets `isRunning` to `false`
- Sets `isPaused` to `false`
- Resets `time` to initial values

#### `clear(): void`

Cleans up timer state and resources.

**Behavior:**

- Resets all timer state to initial values
- Clears any running intervals
- Used for component cleanup

## Implementation Details

### Precision Timing

The timer uses `performance.now()` for high-precision timing:

```typescript
// Provides microsecond precision vs millisecond precision of Date.now()
const now = performance.now();
const delta = now - startTime + accumulatedTime;
```

### State Management Pattern

The context uses a combination of `useState` and `useRef` for optimal performance:

- **useState**: For reactive state that triggers re-renders
- **useRef**: For timing data that doesn't need to trigger re-renders

### Interval Management

Timer updates occur every 1000ms (1 second) when running:

```typescript
intervalRef.current = setInterval(() => {
  const now = performance.now();
  const delta = now - (startRef?.current ?? 0) + accumulatedRef.current;
  setTime(parseSecondsToTime(delta));
}, 1000);
```

### Memory Management

Proper cleanup prevents memory leaks:

- Intervals are cleared on component unmount
- Refs are reset when timer is cancelled
- Effects include cleanup functions

## Usage Examples

### Basic Timer Implementation

```tsx
import { useTimer } from "@/hooks/useTimer";
import { getStringTime } from "@/lib/timer-utils";

const TimerDisplay = () => {
  const { time, isRunning, isPaused, start, pause, cancel } = useTimer();

  return (
    <div>
      <div className="text-4xl font-mono">
        {getStringTime(time.hours)}:{getStringTime(time.minutes)}:
        {getStringTime(time.seconds)}
      </div>

      <div className="space-x-2">
        {!isRunning && !isPaused && <button onClick={start}>Start</button>}

        {isRunning && <button onClick={pause}>Pause</button>}

        {isPaused && <button onClick={start}>Resume</button>}

        {(isRunning || isPaused) && <button onClick={cancel}>Cancel</button>}
      </div>
    </div>
  );
};
```

### Conditional Rendering Based on State

```tsx
const TimerControls = () => {
  const { isRunning, isPaused } = useTimer();

  if (isRunning) {
    return <PauseButton />;
  }

  if (isPaused) {
    return (
      <>
        <ResumeButton />
        <CancelButton />
      </>
    );
  }

  return <StartButton />;
};
```

## Best Practices

### 1. State Checking

Always check timer state before performing actions:

```tsx
// Good
if (!isRunning) {
  start();
}

// Avoid calling start() when already running
```

### 2. Component Cleanup

The context handles cleanup automatically, but ensure your components don't hold references to timer state after unmounting.

### 3. Time Display

Use the provided utility functions for consistent time formatting:

```tsx
import { getStringTime, getTimerToDisplay } from "@/lib/timer-utils";

// For individual components
const displayTime = `${getStringTime(hours)}:${getStringTime(minutes)}:${getStringTime(seconds)}`;

// For complete formatted time
const formattedTime = getTimerToDisplay(totalSeconds);
```

### 4. Performance Considerations

The context is optimized to minimize re-renders. Avoid creating new objects in render methods when using timer data.

## Error Handling

The TimerContext is designed to be robust:

- Methods are safe to call in any state
- Invalid states are handled gracefully
- Cleanup is automatic and thorough

## Testing

When testing components that use TimerContext:

```tsx
import { render } from "@testing-library/react";
import TimerProvider from "@/context/TimerContext";

const renderWithTimer = (component) => {
  return render(<TimerProvider>{component}</TimerProvider>);
};
```

## Future Enhancements

Planned improvements to the TimerContext API:

1. **Session Management**: Track Pomodoro sessions
2. **Persistence**: Save timer state across browser sessions
3. **Events**: Timer completion callbacks
4. **Configuration**: Customizable timer intervals
