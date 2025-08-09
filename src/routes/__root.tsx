import { createRootRoute, Outlet } from '@tanstack/react-router';
import ThemeProvider from '../context/ThemeContext';
import AppBarComponent from '../components/AppBarComponent';
import UserProvider from '../context/UserContext';
import TimerProvider from '@/context/TimerContext';

export const Route = createRootRoute({
    component: RootLayout,
});

function RootLayout() {
    return (
        <ThemeProvider>
            <UserProvider>
                <AppBarComponent />
                <TimerProvider>
                    <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
                        <Outlet />
                    </div>
                </TimerProvider>
            </UserProvider>
        </ThemeProvider>
    );
}