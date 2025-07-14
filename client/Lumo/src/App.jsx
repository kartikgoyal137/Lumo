import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Signup from './pages/signup.jsx'
import Login from './pages/login.jsx'
import Home from './pages/home.jsx'
import Auth from './features/auth.jsx'
import First from './pages/first.jsx'
import Channel from './pages/channel.jsx'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<First/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login'  element={<Login/>}  />
        <Route path='/home'   element={<Auth><Home/></Auth>}/>
        <Route path='/channel/:channel_id'   element={<Auth><Channel/></Auth>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
