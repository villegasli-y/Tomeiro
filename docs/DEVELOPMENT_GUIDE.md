# Tomeiro Development Guide

## Project Conventions & Best Practices

This guide outlines the coding conventions, architectural patterns, and best practices established for the Tomeiro project.

## 📂 File Organization

### Directory Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/UI base components
│   ├── icons/          # Icon components
│   └── [ComponentName].tsx
├── container/          # Page-level container components
├── context/            # React Context providers
│   └── [ContextName]/
│       ├── index.tsx   # Main context implementation
│       └── types.ts    # Context-specific types
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── routes/             # TanStack Router definitions
├── types/              # Global TypeScript types
└── utils/              # Utility functions and storage
```

### Naming Conventions

#### Files and Directories

- **Components**: PascalCase (e.g., `TimerComponent.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useTimer.ts`)
- **Utilities**: camelCase (e.g., `timer-utils.ts`)
- **Types**: camelCase (e.g., `timer.ts`)
- **Contexts**: PascalCase directory, index.tsx + types.ts

#### Variables and Functions

- **Variables**: camelCase (e.g., `isRunning`, `startTime`)
- **Functions**: camelCase with action verbs (e.g., `startTimer`, `parseSecondsToTime`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `INITIAL_TIME`, `DEFAULT_INTERVAL`)
- **Types/Interfaces**: PascalCase (e.g., `TimerState`, `TimeData`)

#### Components

- **Component Names**: Descriptive PascalCase (e.g., `TimerComponent`, `ThemeToggleButton`)
- **Props Types**: Component name + `Props` (e.g., `TimerComponentProps`)
- **Event Handlers**: `handle` + action (e.g., `handleStart`, `handlePause`)

## 🏗️ Architectural Patterns

### Context Pattern

#### Structure

```typescript
// types.ts - All context-related types
export type ContextType = {
  // state properties
  // action methods
};

export type ProviderProps = {
  children: React.ReactNode;
};

// index.tsx - Implementation
const Context = createContext<ContextType | null>(null);

const Provider = ({ children }: ProviderProps) => {
  // implementation
};

export default Provider;
export { Context };
```

#### Best Practices

- Separate types from implementation
- Use memoized context values
- Provide default context values
- Include cleanup in effects

### Custom Hooks Pattern

#### Structure

```typescript
// useFeature.ts
export const useFeature = () => {
  const context = useContext(FeatureContext);

  if (!context) {
    throw new Error("useFeature must be used within FeatureProvider");
  }

  return context;
};
```

#### Best Practices

- Always validate context availability
- Provide meaningful error messages
- Export from hook files, not context files
- Keep hooks focused on single responsibility

### Component Patterns

#### Container Components

```typescript
// Container components handle:
// - Page-level logic
// - Route parameters
// - Data fetching
// - Layout composition

const MainPage = () => {
  // page logic
  return (
    <div>
      <AppBarComponent />
      <TimerComponent />
    </div>
  );
};
```

#### Presentational Components

```typescript
// Presentational components handle:
// - UI rendering
// - User interactions
// - Local state only

const TimerComponent = () => {
  const { time, start, pause } = useTimer();

  return (
    <div>
      {/* UI rendering */}
    </div>
  );
};
```

## 🎨 Code Style

### TypeScript Conventions

#### Type Definitions

```typescript
// Use interfaces for object shapes
interface TimerState {
  isRunning: boolean;
  isPaused: boolean;
  cancelEnabled: boolean;
}

// Use types for unions, primitives, and computed types
type TimerAction = "start" | "pause" | "cancel" | "clear";
type TimeData = {
  hours: number;
  minutes: number;
  seconds: number;
};
```

#### Import/Export Patterns

```typescript
// Named exports for utilities
export const parseSecondsToTime = () => {};
export const getStringTime = () => {};

// Default exports for components and providers
export default TimerComponent;

// Type-only imports
import type { TimerState } from "@/types/timer";

// Absolute imports with @ alias
import { useTimer } from "@/hooks/useTimer";
```

### React Patterns

#### State Management

```typescript
// Use useState for reactive UI state
const [isVisible, setIsVisible] = useState(false);

// Use useRef for non-reactive data
const intervalRef = useRef<NodeJS.Timeout | null>(null);
const startTimeRef = useRef<number | null>(null);

// Use useMemo for expensive calculations
const formattedTime = useMemo(() => formatTime(totalSeconds), [totalSeconds]);
```

#### Effect Patterns

```typescript
// Always include cleanup
useEffect(() => {
  const interval = setInterval(() => {
    // timer logic
  }, 1000);

  return () => clearInterval(interval);
}, [dependency]);

// Use dependency arrays correctly
useEffect(() => {
  // effect logic
}, [specificDependency]); // not []
```

## 🔧 Development Workflow

### Adding New Features

#### 1. Plan the Feature

- Define the requirements
- Identify affected components
- Plan the state management approach
- Consider TypeScript types needed

#### 2. Create Types First

```typescript
// Always define types before implementation
// types/feature.ts
export interface FeatureState {
  // state shape
}

export type FeatureAction = {
  // action definitions
};
```

#### 3. Implement Core Logic

- Start with utility functions
- Add context if needed
- Create custom hooks
- Implement components

#### 4. Test and Refine

- Test timer functionality thoroughly
- Verify TypeScript types
- Check for memory leaks
- Validate user experience

### Code Review Checklist

#### TypeScript

- [ ] All types properly defined
- [ ] No `any` types used
- [ ] Imports/exports consistent
- [ ] Proper type guards where needed

#### React

- [ ] Effects have proper cleanup
- [ ] Dependencies arrays correct
- [ ] No unnecessary re-renders
- [ ] Context usage appropriate

#### Performance

- [ ] No memory leaks in timers
- [ ] Efficient re-rendering
- [ ] Proper memoization usage
- [ ] Clean component unmounting

#### Code Quality

- [ ] Consistent naming conventions
- [ ] Proper error handling
- [ ] Clean separation of concerns
- [ ] Documentation for complex logic

## 🚀 Performance Guidelines

### Timer-Specific Optimizations

- Use `performance.now()` for precision
- Accumulate time across pause/resume cycles
- Clear intervals properly
- Avoid state updates in timer loops

### React Optimizations

- Memoize context values
- Use refs for non-reactive data
- Minimize dependency arrays
- Avoid inline object creation

### Bundle Optimizations

- Use absolute imports for tree-shaking
- Lazy load routes when applicable
- Keep dependencies minimal
- Use Vite's built-in optimizations

## 🧪 Testing Strategy

### Unit Testing

- Test utility functions thoroughly
- Mock context providers for component tests
- Verify timer precision and behavior
- Test edge cases and error conditions

### Integration Testing

- Test timer operations end-to-end
- Verify context provider behavior
- Test component interactions
- Validate state transitions

### Performance Testing

- Monitor timer accuracy over time
- Check for memory leaks
- Verify cleanup effectiveness
- Test under various load conditions

## 📚 Documentation Standards

### Code Comments

```typescript
// Use JSDoc for public APIs
/**
 * Parses milliseconds into time components
 * @param totalSeconds - Time in milliseconds
 * @returns Object with hours, minutes, seconds
 */
export const parseSecondsToTime = (totalSeconds: number): TimeData => {
  // implementation
};

// Use inline comments for complex logic
const delta = now - (startRef?.current ?? 0) + accumulatedRef.current;
// accumulatedRef maintains time across pause/resume cycles
```

### README Updates

- Keep architecture section current
- Update feature status regularly
- Document breaking changes
- Include setup instructions

### API Documentation

- Document all public interfaces
- Provide usage examples
- Explain design decisions
- Include migration guides

## 🔄 Migration Patterns

### Adding New Dependencies

1. Evaluate necessity and bundle impact
2. Check TypeScript support
3. Update package.json
4. Document usage patterns
5. Update build configuration if needed

### Refactoring Guidelines

1. Maintain backward compatibility when possible
2. Update types before implementation
3. Refactor in small, focused commits
4. Update tests and documentation
5. Consider migration scripts for breaking changes

---

_This guide is a living document. Update it as the project evolves and new patterns emerge._
