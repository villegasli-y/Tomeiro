import './App.css'
import InputComponent from './components/inputComponent'
import ButtonComponent from './components/buttonComponent';
import { useState } from 'react';

function App() {
  const [userName, setUserName] = useState("");

  return (
    <>
      <div>
        <InputComponent
          value={userName}
          placeholder={"Username"}
          onChange={(e) => setUserName(e.target.value)}
        />
        <div className='mt-[16px]'>
        <ButtonComponent title="Login" onClick={() => {}}
          className='bg-pink-500'
          />
        </div>
      </div>
    </>
  )
}

export default App