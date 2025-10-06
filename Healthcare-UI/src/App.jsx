import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginForm from './components/login/LoginForm'
import RegisterForm from './components/registration/RegisterForm'

function App() {

  const [isRegistering, setIsRegistering] = useState(false);


  return (
    <>
      <div>

        {isRegistering ? (
          <RegisterForm onBackToLogin={() => setIsRegistering(false)} />
        ) : (
          <LoginForm onRegisterClick={() => setIsRegistering(true)} />
        )}

      </div>
    </>
  )
}

export default App
