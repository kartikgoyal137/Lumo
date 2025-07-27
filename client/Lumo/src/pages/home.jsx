import { useState } from "react"
import axios from "axios"
import Card from '../components/channelCard.jsx'
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import bg3 from '../assets/bg3.png'
import bg2 from '../assets/bg2.png'
import bg4 from '../assets/bg4.svg'

export default function Home() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('info'))
  const myToken = JSON.parse(localStorage.getItem('token'))
  const [myChannels, setMyChannels] = useState([])
  const [exploreChannels, setExploreChannels] = useState([])
  const url = process.env.REACT_APP_url

  async function fetchChannel(id, num){
    const res = await axios.get(`${url}/api/channel/${id}/${num}`, {headers: {Authorization : `Bearer ${myToken}` }})
    const data = res.data
    if(num===1){
      setMyChannels(data)
    }
    else {
      setExploreChannels(data)
    }
  }
  

  const Logout = async () => {
    localStorage.clear('token')
    localStorage.clear('info')
    navigate('/login')
  }

  useEffect(() => {
    fetchChannel(user.id, 1)
    fetchChannel(user.id, 0)
  }, [])

  async function handleJoin(id) {
  const res = await axios.post(`${url}/api/channel/${user.id}/join`, {channel_id : id}, {headers: {Authorization : `Bearer ${myToken}` }})
  fetchChannel(user.id, 1)
    fetchChannel(user.id, 0)

  }
  
  async function handleLeave(id) {
    const res = await axios.post(`${url}/api/channel/${user.id}/leave`, {channel_id : id}, {headers: {Authorization : `Bearer ${myToken}` }})
    fetchChannel(user.id, 1)
    fetchChannel(user.id, 0)
  }
  

  async function handleEnter(id) {
    navigate(`/channel/${id}`)
  }

  const newChannel = async () => {
      navigate('/newchannel')
  }


  return (
  <>
<nav className="navbar navbar-expand-lg " style={{background: '#f6f6f6'}}>
  <div className="container-fluid" >
    <a className="navbar-brand ms-3" href="#" style={{fontSize: "1.6em"}}><b>LUMO</b></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarContent">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item me-2">
          <a className="nav-link active btn btn-dark me-4" onClick={newChannel} style={{color: "white"}} href="#">Create Channel</a>
        </li>
        <li className="nav-item me-2">
          <a className="nav-link active btn btn-dark me-4" style={{color: "white"}} href="#" onClick={Logout}>Logout</a>
        </li>
      </ul>
    </div>
  </div>
</nav>


  <div className="container-fluid w-100 h-100" style={{position: 'relative', minHeight: '92vh'}}>

  <img src={bg4} style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: -1
    }}/>

  <div className="container pt-4 mb-3">
    <h2>My Channels</h2>
    <div className="container-fluid py-2">
      <div className="row">
        {myChannels.map(c => (
          <div className="col-xxl-3 col-md-6 col-12 mb-1" key={c.id}>
            <Card
              id={c.id}
              channel={{
                name: c.name,
                description: c.description,
                members: c.members
              }}
              btnText="Enter"
              OnclickFunc={()=>{handleEnter(c.id)}}
              handleLeave={()=>{handleLeave(c.id)}}
            />
          </div>
        ))}
      </div>
    </div>
  </div>

  <div className="container">
    <h2>Explore Channels</h2>
    <div className="container-fluid py-2">
      <div className="row">
        {exploreChannels.map(c => (
          <div className="col-xxl-3 col-md-6 col-12 mb-1" key={c.id}>
            <Card
              id={c.id}
              channel={{
                name: c.name,
                description: c.description,
                members: c.members
              }}
              btnText="Join"
              OnclickFunc={()=>{handleJoin(c.id)}}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
  </div>

  </>
  )
}