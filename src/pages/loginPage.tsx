import { useEffect, useState } from 'react';
import InputComponent from '../components/inputComponent'
import ButtonComponent from '../components/buttonComponent';
import CardComponent from '../components/cardComponent';
import WelcomePage from './welcomePage';
import { saveUserLS, getUserLS, removeUserLS } from '../utils/userLocalStore';

const Login = () => {

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      saveUserLS({ username: username, password: password });
      setIsLoggedIn(true);
    }
  }

  const handleLogOut = () => {
    setIsLoggedIn(false);
    removeUserLS();
    setUserName("");
    setPassword("");
  }

  useEffect(() => {
    const isUserLogged = getUserLS();
    if (isUserLogged) {
      setIsLoggedIn(true);
    }
  }, [])

  return (
    <div>
      {isLoggedIn ? (
        <div className='animate-fade-in text-center text-xl font-bold text-black'>
          <WelcomePage onLogout={handleLogOut} />
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