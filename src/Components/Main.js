import React, {useState, useEffect} from 'react'
import Admin from './../Pages/Admin';
import User from './../Pages/User';
import { useNavigate } from 'react-router-dom';





function Main() {
    const navigate = useNavigate()
    const [user, setUser] = useState('');
    const [id, setId] = useState(0);
    const [role, setRole] = useState('');
    useEffect(() => {
        let user = localStorage.getItem('username');
        let role = localStorage.getItem('role');
        let id = localStorage.getItem('id');
        if (!user || !role) {
            navigate('/login')
        } 
        else{        
            setUser(localStorage.getItem('username'))
            setRole(localStorage.getItem('role'));
            setId(localStorage.getItem('id'));
        }
        console.log(user, role);
    }, []);


  return (
    <>
    {role==='admin'?<Admin/>:<User/>}
    </>
  )
}

export default Main