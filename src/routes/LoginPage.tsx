import { useEffect, useState, useRef } from 'react';
import { useUser } from '../hooks/useUser';
import { createFileRoute } from '@tanstack/react-router';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Route = createFileRoute('/LoginPage')({
  component: LoginPage,
})

function LoginPage() {

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      alert("All fields are required!");
    } else {
      login({ username: username });
      navigate({ to: '/WelcomePage' });
    }
  }

  useEffect(() => {
    inputRef.current?.focus();
    setUserName("");
    setPassword("");
  }, [])

  return (
    <>
      <form onSubmit={handleLoginSubmit} className='animate-fade-in'>
        <Card className='p-4 w-[396px] rounded-lg' style={{ boxShadow: '0 2px 4px #0000001a, 0 8px 16px #0000001a' }}>
          <CardContent className='flex  justify-center items-center flex-col gap-4'>
            <div className='w-full'>
              <Input
                id='username'
                type='username'
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                placeholder='Username'
              />
            </div>
            <div className='w-full'>
              <Input
                id='username'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
              />
            </div>
          </CardContent>
          <CardFooter className='flex justify-center items-center'>
            <Button type="submit" onSubmit={handleLoginSubmit}>Login</Button>
          </CardFooter>
        </Card>
      </form>
    </>
  )
}

export default LoginPage