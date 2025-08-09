import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Dashboard from '../components/Dashboard'
import Chatbox from '../components/Chatbox'
import AdminDashboard from '../pages/AdminDashboard'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/chatbox' element={<Chatbox/>}/>
        <Route path='/admin' element={<AdminDashboard/>}/>
      </Routes>

    </div>
    
  )
}

export default App