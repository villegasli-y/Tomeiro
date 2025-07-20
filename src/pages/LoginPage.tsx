import { useEffect, useState, useRef } from 'react';
import InputComponent from '../components/inputComponent'
import CardComponent from '../components/cardComponent';
import { useUser } from '../hooks/useUser';
import WelcomePage from './WelcomePage';
import ButtonComponent from '../components/buttonComponent';

const LoginPage = () => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { user, login } = useUser();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !password.trim()) {
      alert("All fields are required!");
    } else {
      login({ userName: userName })
    }
  }

  const handleLogOut = () => {
    setUserName("");
    setPassword("");
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [])

  return (
    <div>
      {user.auth ? (
        <div className='animate-fade-in'>
          <WelcomePage onLogout={handleLogOut} />
        </div>
      ) : (
        <form onSubmit={handleLoginSubmit} className='animate-fade-in'>
          <CardComponent>
            <div className='flex flex-col gap-4'>
              <InputComponent
                ref={inputRef}
                value={userName}
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

export default LoginPage