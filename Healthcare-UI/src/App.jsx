import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

        <Router>
          <Routes>
            <Route path='/login' element={<LoginForm/>}> </Route>
            <Route path='/register' element={<RegisterForm/>}> </Route>
          </Routes>
        </Router>



      </div>
    </>
  )
}

export default App
