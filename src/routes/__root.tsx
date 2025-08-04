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
                    <div className='flex flex-col justify-center text-center items-center gap-4'>
                        <div className='font-bold'>
                            <h1>Welcome to Tomeiro Proyect</h1>
                        </div>
                       <img src="public/tomeiro_favicon.png" alt="tomeiro logo" width={200} height={200} />
                    </div>
                </UserProvider>
            </div>
        </ThemeProvider>
    );
}