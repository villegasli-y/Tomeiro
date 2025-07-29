import { Outlet } from '@tanstack/react-router';
import { createRootRoute } from '@tanstack/react-router';
import ThemeProvider from '../context/ThemeContext';
import AppBarComponent from '../components/AppBarComponent';
import UserProvider from '../context/UserContext';

export const Route = createRootRoute({
    component: RootLayout,
});

function RootLayout() {
    return (
        <ThemeProvider>
            <AppBarComponent />
            <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
                <UserProvider>
                    <Outlet />
                </UserProvider>
            </div>
        </ThemeProvider>
    );
}