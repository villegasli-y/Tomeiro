import './App.css'
import InputComponent from './components/inputComponent'
import ButtonComponent from './components/buttonComponent';
import CardComponent from './components/cardComponent';
import { useState } from 'react';

function App() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<{ username: string; password: string; } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      setUser({ username, password });
      setIsLoggedIn(true);
    }
  }

  return (
    <div>
      {isLoggedIn ? (
        <div className='animate-fade-in text-center text-xl font-bold text-black'>
          <pre>{JSON.stringify(user)}</pre>
          <p>Welcome {user?.username}!!!</p> 
          {/* TODO: crear WelcomePage y sustituirlo aquí */}
        </div>
      ) : (
        <form onSubmit={handleLoginSubmit}>
          <CardComponent>
            <div className='flex flex-col gap-4'>
              <InputComponent
                value={username}
                placeholder={"Username"}
                onChange={(e) => setUserName(e.target.value)}
              />
              <InputComponent
                value={password}
                placeholder={"Password"}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='mt-[16px]'>
              <ButtonComponent title="Login" type='submit' />
            </div>
          </CardComponent>
        </form>
      )}
    </div>
  )
}

export default App