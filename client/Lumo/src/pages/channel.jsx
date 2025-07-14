import { useState } from "react"
import axios from "axios"
import MessageBox from '../components/messageBox.jsx'
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'
import { useRef } from "react"


const socket = io('http://localhost:4000')

export default function Channel() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('info'))
  const myToken = JSON.parse(localStorage.getItem('token'))
  const {channel_id} = useParams()

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [channelInfo, setChannelInfo] = useState({})


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

    return () => {
    socket.off('receive-message', handleReceive)
  }
  }, [channel_id])

  function handleMessage(e) {
    setMessage(e.target.value)
  }

  const getChannel = async () => {
    const res = await axios.get(`http://localhost:4000/api/channel/info/${channel_id}`)
    const data = res.data
    setChannelInfo(data.info)
  }

  const getMessage = async () => {
    const res = await axios.get(`http://localhost:4000/api/channel/message/${channel_id}`)
    const data = res.data.info
    setMessages(data)
    console.log(data)
  }

  
  const scrollRef = useRef(null)
  useEffect(() => {
  if (scrollRef.current) {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' })
  }
}, [messages])


  


  return (
            <>
<nav className="navbar navbar-expand-lg" style={{background: '#ff7f50', overflowX : 'hidden'}}>
  <div className="container-fluid" >
    <a className="navbar-brand ms-3" href="#" style={{color: "white", fontSize: "1.6em"}}><b>LUMO</b></a>
    <a className="nav-link active mx-auto" style={{color: "white"}} href="#">Your space to connect, effortlessly!</a>
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


<div className="container-fluid mx-5 my-4" style={{overflowX : 'hidden'}}>
  <div className="row">

    <div className="col-2 rounded-4 mx-3" style={{border: '4px solid #000000'}}>

    </div>
    <div className="col-6 rounded-4 mx-3" style={{position: 'relative', border: '5px solid #a3e614e2', minHeight: '75vh'}}>

<div className="overflow-auto" style={{ maxHeight: '60vh' }}>
  {messages.map((msg, i) => (
    <MessageBox key={i} message={msg} isOwn={msg.sender?.id === user.id} />
  ))}
   <div ref={scrollRef}></div>
</div>


    <div style={{position: 'absolute', bottom: '0'}}>
    <input value={message} onChange={(e) => {handleMessage(e)}}/>
    <div className="btn btn-primary" onClick={sendMessage}>Send</div>
    </div>


    </div>

    
  <div className="col-2 ms-3" style={{ background: "#ff9f9f"}}>
    <h1>{channelInfo.name}</h1>
    <h4>{channelInfo.description}</h4>
  </div>
  </div>



</div>









<div className="container-fluid" style={{overflowX : 'hidden',position:'fixed', bottom: '0px', background: '#ff7f50', minHeight: '7vh', color: 'white', zIndex: '10'}}>

</div>
        </>
  )
}