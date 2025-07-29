import { useEffect, useState, useRef } from 'react';
import InputComponent from '../components/inputComponent'
import CardComponent from '../components/cardComponent';
import { useUser } from '../hooks/useUser';
import ButtonComponent from '../components/buttonComponent';
import { createFileRoute } from '@tanstack/react-router';
import { useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/LoginPage')({
  component: LoginPage, 
})

function LoginPage() {
  
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !password.trim()) {
      alert("All fields are required!");
    } else {
      login({ userName: userName });
      navigate({to: '/WelcomePage'});
    }
  }

  useEffect(() => {
    inputRef.current?.focus();
    setUserName("");
    setPassword("");
  }, [])

  return (
    <>
      {/* {user.auth ? (
        <div className='animate-fade-in'>
          <WelcomePage onLogout={handleLogOut} />
        </div>
      ) : ( */}

        <form onSubmit={handleLoginSubmit} className='animate-fade-in flex justify-center'>
          <CardComponent>
            <div className='flex flex-col items-center gap-4'>
              <div className='w-full flex flex-col gap-4 '>
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
              <div className=''>
                <ButtonComponent title="Login" type='submit' />
              </div>
            </div>
          </CardComponent>
        </form>
      {/* )} */}
    </>
  )
}

export default LoginPage