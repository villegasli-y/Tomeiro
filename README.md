# Tomeiro 🍅

A modern productivity application focused on the Pomodoro Technique, built with React, TypeScript, and modern web technologies.

## 🎯 Project Goal

Tomeiro aims to provide a clean, intuitive, and efficient Pomodoro timer application that helps users maximize their productivity through focused work sessions. The application follows the traditional Pomodoro Technique principles while offering a modern user experience.

## 🚀 Tech Stack

- **Frontend Framework**: React 19.1.0 with TypeScript
- **Build Tool**: Vite 6.3.5 for fast development and optimized builds
- **Routing**: TanStack Router for type-safe routing
- **Styling**: Tailwind CSS with Shadcn/UI components
- **State Management**: React Context API with custom hooks
- **Form Handling**: React Hook Form with Zod validation
- **Theme**: Next Themes for dark/light mode support

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/UI base components
│   └── icons/          # Icon components
├── container/          # Page-level container components
├── context/            # React Context providers
│   └── TimerContext/   # Core timer state management
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── routes/             # TanStack Router route definitions
├── types/              # TypeScript type definitions
└── utils/              # Utility functions and storage managers
```

## 🔧 Core Architecture

### TimerContext - The Heart of the Application

The `TimerContext` is the most critical component of Tomeiro, handling all timer-related state and operations. It provides:

**Key Features:**

- High-precision timing using `performance.now()`
- Pause/resume functionality with accumulated time tracking
- Clean state management with TypeScript interfaces
- Efficient re-rendering through memoized context values

**Timer States:**

- `isRunning`: Timer is actively counting
- `isPaused`: Timer is paused but retains accumulated time
- `cancelEnabled`: UI state for cancel button availability

**Core Methods:**

- `start()`: Initiates or resumes the timer
- `pause()`: Pauses the timer while preserving accumulated time
- `cancel()`: Resets timer to initial state
- `clear()`: Cleans up timer state and intervals

### Performance Optimizations

1. **Efficient Time Calculation**: Uses `performance.now()` for microsecond precision
2. **Accumulated Time Tracking**: Maintains accurate time across pause/resume cycles
3. **Memoized Context**: Prevents unnecessary re-renders
4. **Cleanup Management**: Proper interval clearing to prevent memory leaks

## 🎨 Design Conventions

### Code Organization

- **Barrel Exports**: Index files for clean imports
- **Type Safety**: Strict TypeScript configuration
- **Component Composition**: Reusable UI components with Shadcn/UI
- **Hook Patterns**: Custom hooks for business logic separation

### Naming Conventions

- **Files**: PascalCase for components, camelCase for utilities
- **Types**: PascalCase with descriptive suffixes (e.g., `TimerState`, `TimeData`)
- **Functions**: camelCase with action-oriented names
- **Constants**: UPPER_SNAKE_CASE for static values

### State Management Philosophy

- **Context for Global State**: Timer state, theme, user preferences
- **Local State for UI**: Component-specific state using useState
- **Custom Hooks**: Business logic abstraction and reusability

## 🛠️ Development Setup

## 🛠️ Development Setup

### Prerequisites

- Node.js (18+ recommended)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd tomeiro

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### Available Scripts

- `npm run dev`: Start development server with HMR
- `npm run build`: Build for production
- `npm run preview`: Preview production build locally
- `npm run lint`: Run ESLint checks

## 📝 Development Guidelines

### Adding New Features

1. **Timer Features**: Extend the `TimerContext` for new timer functionality
2. **UI Components**: Use Shadcn/UI base components when possible
3. **State Management**: Create custom hooks for complex logic
4. **Type Safety**: Define types in the appropriate `/types` directory

### Best Practices

- Always use TypeScript for type safety
- Implement proper cleanup in useEffect hooks
- Use absolute imports with `@/` prefix
- Follow the established folder structure
- Write descriptive component and function names

## 🚧 Current Status

**Completed Features:**

- ✅ Core timer functionality (start, pause, cancel)
- ✅ High-precision time tracking
- ✅ Basic UI components
- ✅ Theme system (dark/light mode)
- ✅ Type-safe routing setup

**In Progress:**

- 🔄 Pomodoro session management
- 🔄 Settings and preferences
- 🔄 Session history tracking

**Planned Features:**

- 📋 Task management integration
- 📊 Productivity analytics
- 🔔 Notifications and alerts
- 💾 Data persistence
- 🎨 Customizable themes

## 🏗️ Architecture Decisions

### Why TanStack Router?

- Type-safe routing with full TypeScript support
- File-based routing with automatic route generation
- Excellent developer experience and performance

### Why Context + Custom Hooks?

- Simpler than Redux for current scope
- Better TypeScript integration
- Easier testing and debugging
- Natural React patterns

### Why Vite?

- Faster development builds
- Better tree-shaking
- Modern tooling with great TypeScript support
- Optimized production builds

## 🤝 Contributing

1. Follow the established code conventions
2. Add proper TypeScript types for new features
3. Update documentation for significant changes
4. Test timer functionality thoroughly
5. Ensure responsive design compatibility

## 📚 Key Dependencies

### Core

- **React 19**: Latest React with concurrent features
- **TypeScript**: Type safety and better DX
- **Vite**: Fast build tool and dev server

### Routing & State

- **TanStack Router**: Type-safe routing
- **TanStack Query**: Server state management (ready for future use)

### UI & Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/UI**: High-quality component library
- **Lucide React**: Icon library
- **Next Themes**: Theme management

### Forms & Validation

- **React Hook Form**: Performant form handling
- **Zod**: Runtime type validation

---

_Tomeiro is in active development. This documentation will be updated as the project evolves._
})

````

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
````
