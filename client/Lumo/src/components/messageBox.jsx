import { useRef } from "react"

export default function MessageBox({ message, isOwn }) {


  const boxStyle = {
    maxWidth: '70%',
    padding: '8px 12px',
    borderRadius: '16px',
    marginBottom: '8px',
    backgroundColor: isOwn ? '#dcf8c6' : '#f0f0f0',
  }

  const align = isOwn? 'justify-content-start' : 'justify-content-start'

  return (
    <div className={align} style={{ display: 'flex', flexDirection: 'column', ...boxStyle }}>
      {!isOwn && <strong style={{ fontSize: '0.9em', marginBottom: '4px' }}>{message.sender?.name}</strong>}
      <span className="text-break">{message.content}</span>
      <small style={{ alignSelf: 'flex-end', fontSize: '0.75em', marginTop: '4px', color: '#888' }}>
        {new Date(message.createdAt).toLocaleTimeString()}
      </small>
    </div>
  )
}
