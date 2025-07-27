import { useState } from "react"
import axios from "axios"
import MessageBox from '../components/messageBox.jsx'
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'
import { useRef } from "react"
import MemberCard from "../components/memberCard.jsx"


const socket = io(`${url}`, {
  transports: ['websocket'],
  withCredentials: true
})

export default function Channel() {
  const url = process.env.REACT_APP_url
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('info'))
  const myToken = JSON.parse(localStorage.getItem('token'))
  const {channel_id} = useParams()

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [channelInfo, setChannelInfo] = useState({})
  const [members, setMembers] = useState([])


  const sendMessage = () => {
    if(message === '') return;
    socket.emit('send-message', {sender : user.id  ,channel_id : channel_id, message: message })
    setMessage('')
  }

  useEffect(() => {
    socket.emit('join-channel', channel_id)

    const handleReceive = (data) => {
      setMessages(prev => [...prev, data])
    }

    socket.on('receive-message', handleReceive)

    getChannel()
    getMessage()
    getMembers()

    return () => {
    socket.off('receive-message', handleReceive)
  }
  }, [channel_id])

  function handleMessage(e) {
    setMessage(e.target.value)
  }

  const goHome = () => {
    navigate('/home')
  }

  const getChannel = async () => {
    const res = await axios.get(`${url}/api/channel/info/${channel_id}`, {headers: {Authorization : `Bearer ${myToken}` }})
    const data = res.data
    setChannelInfo(data.info)
  }

  const getMessage = async () => {
    const res = await axios.get(`${url}/api/channel/message/${channel_id}`, {headers: {Authorization : `Bearer ${myToken}` }})
    const data = res.data.info
    setMessages(data)
  }

  
  const scrollRef = useRef(null)
  useEffect(() => {
  if (scrollRef.current) {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' })
  }
}, [messages])

  const getMembers = async () => {
    const res = await axios.get(`${url}/api/channel/members/${channel_id}`, {headers: {Authorization : `Bearer ${myToken}` }})
    const data = res.data.info.members
    setMembers(data)
  }


  


  return (
            <>
<nav className="navbar navbar-expand-lg" style={{background: '#ff7f50', overflowX : 'hidden'}}>
  <div className="container-fluid" >
    <a className="navbar-brand ms-3" href="#" style={{color: "white", fontSize: "1.6em"}}><b>LUMO</b></a>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarContent">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item me-2">
          <a className="nav-link active btn btn-light me-4" style={{background: "white"}} href="#" onClick={goHome}>Home</a>
        </li>
        <li className="nav-item me-2">
          <a className="nav-link active btn btn-light me-4" style={{background: "white"}} href="https://github.com/kartikgoyal137/">github/kartikgoyal137</a>
        </li>
        
      </ul>
    </div>
  </div>
</nav>


<div className="container-fluid px-5 py-4" style={{overflowX : 'hidden', background: "#333333", zIndex: '50'}}>
  <div className="row">

    <div className="col-2 rounded-4 mx-3 d-none d-md-block" style={{border: '4px solid #ff7f50', background: "whitesmoke", overflowY: 'auto'}}>
{members.map((ele) => 
  <MemberCard name={ele.name} isOnline={ele.status}/>
)}
  </div>
    <div className="col-md-6 col-10 rounded-4 mx-3 pd-5" style={{zIndex: '60', position: 'relative', border: '5px solid #ff7f50', minHeight: '80vh', background: "whitesmoke"}}>

<div className="overflow-auto" style={{ maxHeight: '60vh'}}>
  {messages.map((msg, i) => (
    <MessageBox key={i} message={msg} isOwn={msg.sender?.id === user.id} />
  ))}
   <div ref={scrollRef}></div>
</div>

<div className="position-absolute bottom-0 start-0 end-0 p-3 bg-light border-top">
  <div className="d-flex gap-2">
    <input
      type="text"
      value={message}
      onChange={(e) => handleMessage(e)}
      placeholder="Type a message..."
      className="form-control rounded-pill"
      style={{padding: '10px 15px', fontSize: '1rem', background: '#fff'}}
    />
    <button
      className="btn btn-primary rounded-pill"
      onClick={sendMessage}
      style={{padding: '10px 20px', fontSize: '1rem', whiteSpace: 'nowrap'}}
    >
      Send
    </button>
  </div>
</div>



    </div>

    
  <div className="col-2 ms-3 d-none d-md-block rounded-4" style={{ background: "#333333", color: "white"}}>
    <h1>{channelInfo.name}</h1>
    <h4>{channelInfo.description}</h4>
  </div>
  </div>



</div>

<div className="container-fluid" style={{overflowX : 'hidden',position:'fixed', bottom: '0px', background: '#333333', minHeight: '8vh', color: 'white', zIndex: '10'}}>

</div>
        </>
  )
}