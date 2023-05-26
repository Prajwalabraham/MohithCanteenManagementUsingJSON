import React, {useState, useEffect} from 'react'
import Admin from './../Pages/Admin';
import User from './../Pages/User';
import { useNavigate } from 'react-router-dom';





function Main() {
    const navigate = useNavigate()
    const [user, setUser] = useState('');
    const [role, setRole] = useState('');
    useEffect(() => {
        let user = localStorage.getItem('user');
        let role = localStorage.getItem('role');
        if (!user || !role) {
            navigate('/login')
        } 
        else{        
            setUser(JSON.parse(localStorage.getItem('user')))
            setRole(JSON.parse(localStorage.getItem('role')));
        }
    }, []);


  return (
    <>
    {role==='admin'?<Admin/>:<User/>}
    </>
  )
}

export default Main