import InputComponent from '../components/inputComponent'
import ButtonComponent from '../components/buttonComponent';
import CardComponent from '../components/cardComponent';
import { useState } from 'react';
import WelcomePage from './welcomePage';

const Login = () => {

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

  const handleLogOut = () => {
    setUser(null);
    setUserName("");
    setPassword("");
    setIsLoggedIn(false);
  }

  return (
    <div>
      {isLoggedIn && user ? (
        <div className='animate-fade-in text-center text-xl font-bold text-black'>
          <WelcomePage user={user} onLogout={handleLogOut} />
        </div>
      ) : (
        <form onSubmit={handleLoginSubmit} className='animate-fade-in'>
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

export default Login