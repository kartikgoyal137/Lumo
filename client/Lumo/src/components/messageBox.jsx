import { useRef } from "react"

export default function MessageBox({ message, isOwn }) {


  const boxStyle = {
    maxWidth: '70%',
    backgroundColor: isOwn ? '#d8fdbcff' : '#c7fdfaff',
  }

  const align = isOwn? 'justify-content-start' : 'justify-content-start'

  return (
    <div className='rounded-4 px-2 pt-1 mt-1' style={{ display: 'flex', flexDirection: 'column', ...boxStyle }}>
      {!isOwn && <strong style={{ fontSize: '1.1rem'}}>{message.sender?.name}</strong>}
      <span className="text-break">{message.content}</span>
      <small style={{ alignSelf: 'flex-end', fontSize: '0.75rem', color: '#888' }}>
        {new Date(message.createdAt).toLocaleTimeString()}
      </small>
    </div>
  )
}
