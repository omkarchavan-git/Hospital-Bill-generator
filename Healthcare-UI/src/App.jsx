import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
            <Route path="/" element={<LoginForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App