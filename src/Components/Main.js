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
        console.log(user, role);
        setRole(role);
        setId(id);
        setUser(user);
    }, []);


  return (
    <>
    {role=='admin' ? <Admin/> : <User/> }
    </>
  )
}

export default Main