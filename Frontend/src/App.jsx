import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './Components/signup'
import Login from './Components/login'
import Customize from './Components/customize.jsx'
import { useContext, useState } from 'react'
import { userDataContext } from './context/userContext'
import Home from './Components/home'
import Customize2 from './Components/customize2.jsx'

function App() {
  const {userData,setUserdata}= useContext(userDataContext);
 


  return (
    <Routes>
      <Route path="/" element={(userData?.assistantImage && userData?.assistantName)?<Home />:<Navigate to={"/customize"}/>} />
      <Route path="/signup" element={!userData?<Signup />:<Navigate to={"/customize"}/>} />
      <Route path="/login" element={!userData?<Login />: <Navigate to={"/"}/>} />
      <Route path="/customize" element={userData? <Customize />: <Navigate to={"/login"}/>} />
      <Route path="/customize2" element={userData? <Customize2 />: <Navigate to={"/login"}/>} />
    </Routes>
  )
}

export default App
