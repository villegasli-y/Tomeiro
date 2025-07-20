import './App.css'
import UserProvider from './context/UserContext';
import LoginPage from './pages/LoginPage';

function App() {

  return (
    <div>
      <UserProvider>
        <LoginPage />
      </UserProvider>
    </div>
  )
}

export default App