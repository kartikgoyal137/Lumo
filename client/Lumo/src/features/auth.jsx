import { useNavigate } from 'react-router-dom'

export default function Auth({children}){
    const navigate = useNavigate()
    const token = JSON.parse(localStorage.getItem('token'))
    if(!token) {
        navigate('/login');
        return;
    }
    
    return children
} 