import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Signup from './pages/signup.jsx'
import Login from './pages/login.jsx'
import Home from './pages/home.jsx'
import Auth from './features/auth.jsx'
import First from './pages/first.jsx'
import Channel from './pages/channel.jsx'
import NewChannel from './pages/newChannel.jsx'
import { useEffect } from 'react'


function App() {

  useEffect(() => {
  const interval = setInterval(() => {
    fetch("https://lumo-backend-dswp.onrender.com")
  }, 1000 * 60 * 14) // every 14 mins

  return () => clearInterval(interval)
}, [])


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<First/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login'  element={<Login/>}  />
        <Route path='/home'   element={<Auth><Home/></Auth>}/>
        <Route path='/channel/:channel_id'   element={<Auth><Channel/></Auth>}/>
        <Route path='/newchannel'   element={<Auth><NewChannel/></Auth>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
