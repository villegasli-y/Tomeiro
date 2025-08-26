# Tomeiro Project Memory Bank

## Project Overview

Tomeiro is a modern Pomodoro technique productivity application built with React, TypeScript, and Vite. The project focuses on providing a clean, efficient timer experience with modern web technologies.

## Core Architecture Notes

### TimerContext Deep Dive

The TimerContext is the central piece of the application, managing all timer-related state and operations.

#### Key Design Decisions:

1. **Performance-based Timing**: Uses `performance.now()` instead of `Date.now()` for higher precision
2. **Accumulated Time Pattern**: Tracks elapsed time across pause/resume cycles
3. **Ref-based State**: Uses refs for timing data to avoid unnecessary re-renders
4. **Effect-driven Intervals**: Timer intervals managed through useEffect

#### State Flow:

```
IDLE → START → RUNNING → PAUSE → PAUSED → RESUME → RUNNING
                      ↓
                   CANCEL → IDLE
```

#### Technical Implementation:

- `startRef`: Tracks when timer started for current session
- `intervalRef`: Manages the 1-second update interval
- `accumulatedRef`: Stores total elapsed time across sessions
- `booted`: Prevents initial effect trigger

### Performance Optimizations

1. **Memoized Context Value**: Prevents unnecessary provider re-renders
2. **Interval Cleanup**: Proper cleanup prevents memory leaks
3. **Millisecond Precision**: Performance API provides microsecond accuracy
4. **Ref Usage**: Avoids state updates that would trigger re-renders

### Code Conventions Established

- Use `updateStateInternal` for consistent state updates
- Prefix timer actions with verb (startTimer, pauseTimer, cancelTimer)
- Keep initial states as constants with descriptive names
- Use TypeScript interfaces for all state shapes

## Development Patterns

### Folder Structure Logic

- `/context`: Global state providers
- `/hooks`: Business logic abstraction
- `/components`: Reusable UI elements
- `/container`: Page-level components
- `/types`: TypeScript definitions
- `/utils`: Pure utility functions
- `/lib`: Library-specific utilities

### Future Considerations

1. **Session Management**: Will need to track Pomodoro sessions
2. **Persistence**: Timer state should survive page refreshes
3. **Notifications**: Browser notifications for session completion
4. **Analytics**: Track productivity metrics over time

## Technology Stack Rationale

### TanStack Router

- Chosen for type-safe routing
- File-based routing reduces boilerplate
- Excellent TypeScript integration

### Tailwind + Shadcn/UI

- Utility-first approach for rapid development
- Consistent design system
- Accessibility built-in

### React Context Pattern

- Sufficient for current scale
- Better TypeScript integration than Redux
- Easier to test and debug
- Can migrate to Zustand if needed later

## Current State (August 2025)

- Core timer functionality complete
- Basic UI components implemented
- Theme system working
- Ready for Pomodoro session features
