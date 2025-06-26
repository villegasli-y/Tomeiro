import './App.css'
import InputComponent from './components/inputComponent'
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
      </div>
    </>
  )
}

export default App