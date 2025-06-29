import './App.css'
import InputComponent from './components/inputComponent'
import ButtonComponent from './components/buttonComponent';
import CardComponent from './components/cardComponent';
import { useState } from 'react';

function App() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div>
        <CardComponent>
          <div className='flex flex-col gap-4'>
            <InputComponent
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
            <ButtonComponent title="Login" onClick={() => { }} />
          </div>
        </CardComponent>
      </div>
    </>
  )
}

export default App