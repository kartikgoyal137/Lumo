export default function MemberCard({ name, isOnline }) {
  return (
    <div className="d-flex justify-content-between align-items-center border rounded-3 my-2 px-3 py-2 border-start border-4" style={{background: '#fed4c5ff', borderColor: '#ff7f50'}}>
      <span className="fw-semibold text-dark">{name}</span>
      <span
        className={`rounded-circle`}
        style={{
          width: '10px',
          height: '10px',
          backgroundColor: isOnline ? '#28a745' : '#6c757d'
        }}
        title={isOnline ? 'Online' : 'Offline'}
      ></span>
    </div>
  )
}
