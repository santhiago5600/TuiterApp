import React from 'react'
import Loginpage from './pages/Loginpage.js';
import Homepage from './pages/Homepage.js';
import User from './pages/User.js';
import Register from './pages/Register.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EditUser from './pages/EditUser.js';

function App() {

  const token= localStorage.getItem('appToken')

  return (
    <>
      <Routes>
        <Route path='/' element={token? <Homepage />:<Loginpage />} />
        <Route path='/home' element={token? <Homepage />:<Loginpage />} />
        <Route path='/user' element={token? <User/>:<Loginpage />}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/editUser' element={token? <EditUser/>:<Loginpage />}/>
      </Routes>
    </>
  )
}

export default App

