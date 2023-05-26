import React, {useState} from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import axios from 'axios'
import Typography from '@mui/material/Typography'
import '@lottiefiles/lottie-player'
import {useNavigate} from 'react-router-dom';






function Login() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameErrorMsg, setUsernameErrorMsg] = useState('');
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

    const handleLogin = () => {
      if(username === ''){
        setUsernameErrorMsg('Username is required');
      }
      else if(password === ''){
        setPasswordErrorMsg('Password is required');
      }
      else{     
      const data = {
          username: username,
          password: password
      };
  
      axios({
          method: 'post',
          url: "http://localhost:8080/api/login",
          data: data
      })
      .then(res => {
          console.log(res);
            localStorage.setItem('role', res.data.role);
            localStorage.setItem('username', res.data.username);
            navigate('/Main')
      })
      .catch(err => {
          console.log(err);
      });
    }
      console.log(username, password);
  };
  

  return (
    <>
    <Container maxWidth="lg" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <Paper style={{padding: '20px', borderRadius:'20px'}} elevation={5}>
    <Typography variant="h5" component="div" style={{textAlign: 'center'}}>
      <b>Canteen Management System</b>
    </Typography>
    <Typography variant="h6" component="div" style={{textAlign: 'center'}}>Canteen Login</Typography>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: 'auto' },
      }}
      noValidate
      autoComplete="off"
    >
      <Grid container spacing={2}>
        <Grid item xs={5}>
        <Grid item xs={12} style={{marginTop: '50px', marginBottom: '0px'}}>
            <TextField style={{width: '100%', marginTop:'10px'}} id="outlined-basic" label="Username" variant="outlined" onChange={(e) => {setUsername(e.target.value); setUsernameErrorMsg('')} } value={username} />      
            {usernameErrorMsg?  <Typography variant="subtitle1" color="error">{usernameErrorMsg}</Typography> : null}
            <TextField style={{width: '100%', marginTop:'10px'}} id="outlined-basic" label="Password" variant="outlined" onChange={(e) => {setPassword(e.target.value); setPasswordErrorMsg('')}} value={password} type="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" />
            {passwordErrorMsg?  <Typography variant="subtitle1" color="error">{passwordErrorMsg}</Typography> : null}
        </Grid>
        <Button style={{width: '150px', borderRadius:'25px', marginTop: '10px', marginBottom: '0px', height:'50px'}} variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
        </Grid>
        <Divider orientation="vertical" flexItem>
    Login
  </Divider>
        <Grid item xs={5}>
        <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_YnsM0o.json"  background="transparent"  speed="1"  style={{width: '400px', height: '300px'}} hover loop autoplay={true}></lottie-player>
        </Grid>
      </Grid>
      <a href="/Signup" style={{textDecoration: 'none'}}><Typography variant="subtitle1" color="default">New here? Click here to <b>Signup</b></Typography></a>
    </Box>
    </Paper>
    </Container>
    </>
  )
}

export default Login