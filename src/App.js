import React from 'react'
import Login from './Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Signup'
import User from './User'
import Dashboard from './DashBoard'
import Update from './components/Update'




function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
            <Route path='/user' element={<User/>}></Route>
            <Route path='/update/:id' element={<Update/>}></Route>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/signup' element={<Signup/>}></Route>
            
        </Routes>
    </BrowserRouter>
  )
}

export default App