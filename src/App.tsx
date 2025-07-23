import AppBarComponent from './components/appBarComponent';
import UserProvider from './context/UserContext';
import LoginPage from './pages/LoginPage';

function App() {

  return (
    <>
      <AppBarComponent />
      <div className='flex items-center justify-center h-[calc(100vh-4rem)]'>
        <UserProvider>
            <LoginPage />
        </UserProvider>
      </div>
    </>
  )
}

export default App