import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import LumoHome from '../assets/LumoHome.png'
import Blob1 from '../assets/blob/blob1.svg'
import Blob2 from '../assets/blob/blob2.svg'
import Blob3 from '../assets/blob/blob3.svg'
import Blob4 from '../assets/blob/blob4.svg'

export default function First() {
  const url = process.env.REACT_APP_url
    const navigate = useNavigate()

    function handleLogin() {
        navigate('/login')
    }
    function handleSignup() {
        navigate('/signup')
    }
    

    return (
<>
<nav className="navbar navbar-expand-lg" style={{background: '#ff7f50', zIndex: '10'}}>
  <div className="container-fluid" >
    <a className="navbar-brand ms-3" href="#" style={{color: "white", fontSize: "1.6em"}}><b>LUMO</b></a>
    <a className="nav-link active mx-auto d-sm-block d-none" style={{color: "white"}} href="#">Your space to connect, effortlessly!</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarContent">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item me-2">
          <a className="nav-link active btn btn-light me-4" style={{background: "white"}} href="https://github.com/kartikgoyal137/">github/kartikgoyal137</a>
        </li>
        
      </ul>
    </div>
  </div>
</nav>

<div className="container-fluid py-4" style={{overflowY: 'hidden', position: 'relative', overflowX: 'hidden', background: '#f6f6f6', minHeight: '84vh', zIndex: '5'}}>
      <img src={Blob2} alt="" className='img-fluid d-none d-xxl-block' style={{zIndex: '-1', position: 'absolute', left: '42rem', top: '0rem',  height: '20rem'}}/>
      <img src={Blob2} alt="" className='img-fluid ' style={{zIndex: '-1', position: 'absolute', left: '-4rem', top: '20rem',  height: '16rem'}}/>
      <img src={Blob1} alt="" className='img-fluid d-none d-lg-block' style={{zIndex: '-1', position: 'absolute', left: '25rem', top: '20rem',  height: '20rem'}}/>
      <img src={Blob1} alt="" className='img-fluid d-none d-xl-block' style={{zIndex: '-1', position: 'absolute', left: '82rem', top: '8rem',  height: '20rem'}}/>
      <img src={Blob3} alt="" className='img-fluid d-none d-lg-block' style={{zIndex: '-1', position: 'absolute', left: '32rem', top: '3rem',  height: '12rem'}}/>
      <img src={Blob4} alt="" className='img-fluid' style={{zIndex: '-1', position: 'absolute', left: '-4rem', top: '-1rem',  height: '12rem'}}/>
      <div className="row" style={{zIndex: '50'}}>
        <div className="col-0 col-lg-1"></div>
        <div className="col-12 col-lg-6 ms-5 me-0">
            <h1 className='display-3 mt-5 pt-5 w-75 fw-bold'>Unite your team & ideas</h1>
                <button className='btn btn-light fs-6 fs-md-1 mt-1' onClick={handleLogin} style={{zIndex:'100',background: "#ff7f50", cursor: 'pointer'}}>Login</button>
                <button className='btn btn-light fs-6 fs-md-3 mt-1' onClick={handleSignup} style={{zIndex:'100',background: "#ff7f50"}}>Signup</button>
            
            <p className=' w-75 fs-4 fs-md-6 mt-2'>connect effortlessly with vibrant messaging</p>
        </div>
        <div className="col-5 col-lg-3 mx-5 mx-lg-0" style={{position:'relative'}}>
            <img src={LumoHome} className='img-fluid' alt="f" style={{position: 'absolute',marginTop: '5rem', borderRadius: "15%", boxShadow: '2.5rem 2.5rem 0px 0px #ff7f50'}} />
        </div>
      </div>

</div>

<div className="container-fluid text-center" style={{bottom: '0',position: 'fixed',background: '#ff7f50', minHeight: '7vh', color: 'white', zIndex: '10'}}>
      <b>Made with ❤️</b>
</div>
       
</>
    )
}