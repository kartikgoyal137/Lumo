import { Hash } from 'lucide-react'

export default function ChannelCard({ channel, btnText, OnclickFunc, handleLeave }) {

  const Leave = () => {
      if(btnText==="Enter") {
        return (
          <button className='btn btn-danger w-25 ms-2 mt-2' onClick={() => {handleLeave(channel.id)}}>Leave</button>
        )
      }
  }
  

  return (
    <div className="card shadow-sm mb-3 rounded-4" style={{ maxWidth: '22rem' }}>
      <div className="card-body rounded-4" style={{background: '#333333'}}>
        {/* Icon and Channel Name */}
        <div className="d-flex align-items-center mb-2">
          <div className="bg-warning text-white rounded-circle d-flex justify-content-center align-items-center" style={{ width: 40, height: 40 }}>
            <Hash size={20} />
          </div>
          <h5 className="ms-3 mb-0" style={{color: 'white'}}>{channel.name}</h5>
        </div>

        <p className="card-text" style={{color: 'white'}}>
          {channel.description || 'No description provided.'}
        </p>

        {/* Member Count */}
        <div className="row">
        <small className="" style={{color: 'whitesmoke'}}>
          {channel.members?.length || 0} members
        </small>
        <button className='btn btn-success w-25 ms-2 mt-2' onClick={() => {OnclickFunc(channel.id)}}>{btnText}</button>
        {Leave()}
        </div>
      </div>
    </div>
  )
}
