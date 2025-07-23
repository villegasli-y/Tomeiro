import ThemeProvider from './context/ThemeContext';
import AppBarComponent from './components/AppBarComponent';
import UserProvider from './context/UserContext';
import LoginPage from './pages/LoginPage';

function App() {
  return (
      <ThemeProvider>
        <AppBarComponent />
        <div className='flex items-center justify-center h-[calc(100vh-4rem)]'>
          <UserProvider>
            <LoginPage />
          </UserProvider>
        </div>
      </ThemeProvider>
  )
}

export default App