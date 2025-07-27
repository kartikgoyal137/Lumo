import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import LumoHome from '../assets/LumoHome.png'
import Blob1 from '../assets/blob/blob1.svg'
import Blob2 from '../assets/blob/blob2.svg'
import Blob3 from '../assets/blob/blob3.svg'
import Blob4 from '../assets/blob/blob4.svg'

export default function Signup() {
    const navigate = useNavigate()
    const url = process.env.REACT_APP_url
    const [error, setError] = useState('')

    const [FormData, setFormData] = useState({
        email: '',
        password: ''
    })

    function handleFormDataChange (e) {
        setFormData({...FormData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            localStorage.clear()
            const res = await axios.post(`${url}/api/login/auth`, FormData)
            const data = res.data 
            localStorage.setItem('token', JSON.stringify(data.token)) //store in redux
            localStorage.setItem('info', JSON.stringify(data.userInfo)) //store in redux
            setFormData({email: '', password: ''})
            navigate('/home')
        }
        catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error)
            } else {
                setError('Login failed. Please try again.')
            }
        }
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
        
        <div className="col-8 col-lg-5 ms-5 mt-4 me-0">
            <form onSubmit={handleSubmit} className="container p-3 shadow rounded-5" style={{ maxWidth: '400px', marginTop:'6em', border:  '4px solid #ff7f50', borderRadius: '0%', background: 'white' }}>
            <h3 className="mb-4 text-center">Login</h3>
{error && <div className="alert alert-danger text-center">{error}</div>}

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter email"
                value={FormData.email}
                onChange={handleFormDataChange}
                required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter password"
                value={FormData.password}
                onChange={handleFormDataChange}
                required
                />
            </div>

            <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
        </div>
        <div className="col-1 col-lg-2"></div>
        <div className="col-5 col-lg-3 mx-5 mx-lg-0 mx-auto" style={{position:'relative'}}>
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

