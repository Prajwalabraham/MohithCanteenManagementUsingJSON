import React, {useState} from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import axios from 'axios'
import Typography from '@mui/material/Typography'
import '@lottiefiles/lottie-player'
import {useNavigate} from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});






function Signup() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameErrorMsg, setUsernameErrorMsg] = useState('');
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
    const [success, setSuccess] = React.useState(false);
    const [successMsg, setSuccessMsg] = React.useState('');
    const [severity, setSeverity] = React.useState('');
    
      const handleSignup = () => {
        if(username === ''){
          setUsernameErrorMsg('Username is required');
        }
        else if(password === ''){
          setPasswordErrorMsg('Password is required');
        }
        else{  
        let userData = {
          username:username,
          password:password
        }
        axios({
          method:'post',
          url: 'http://localhost:8080/api/signup',
          data: userData
        })
        .then(res => {
          console.log(res);

          if(res.status === 201){
            setSuccess(true);
            setSeverity('success');
            setSuccessMsg('Signup Successful');
            localStorage.setItem('userID', res.data.userId)
            localStorage.setItem('username', res.data.username)
            localStorage.setItem('role', res.data.role)
            navigate('/Main')
          }
        })
        .catch(err => {
          console.log(err);
          if (err.request.status===0) {
            setSuccess(true);
            setSeverity('error');
            setSuccessMsg('Dumbo go change the path in the Backend Controller');
          
            alert("Dumbo go change the path in the Backend Controller ")
          }
          else {
            setSuccess(true);
            setSeverity('error');
            setSuccessMsg('Invalid Username or Password');
            alert("Invalid Username or Password")
          }
        })
      }
      }
      
    
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setSuccess(false);
    };

  return (
    <>
        <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%', background:'#4BB543' }}>
        {successMsg}
      </Alert>
      </Snackbar>
    <Container maxWidth="lg" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <Paper style={{padding: '20px', borderRadius:'20px'}} elevation={5}>
    <Typography variant="h5" component="div" style={{textAlign: 'center'}}>
      <b>CANTEEN MANAGEMENT SYSTEM</b>
    </Typography>
    <Typography variant="h6" component="div" style={{fontFamily:'Poppins', position:'absolute', marginTop:'5px', marginLeft:'10px'}}>SIGNUP</Typography>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: 'auto' },
      }}
      noValidate
      autoComplete="off"
    >
      <Grid container spacing={0}>
        <Grid item xs={5}>
        <Grid item xs={12} style={{marginTop: '50px', marginBottom: '0px'}}>
            <TextField style={{width: '100%', marginTop:'10px'}} id="outlined-basic" label="Username" variant="outlined" onChange={(e) => {setUsername(e.target.value); setUsernameErrorMsg('')} } value={username} />      
            {usernameErrorMsg?  <Typography variant="subtitle1" color="error">{usernameErrorMsg}</Typography> : null}
            <TextField style={{width: '100%', marginTop:'10px'}} id="outlined-basic" label="Password" variant="outlined" onChange={(e) => {setPassword(e.target.value); setPasswordErrorMsg('')}} value={password} type="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" />
            {passwordErrorMsg?  <Typography variant="subtitle1" color="error">{passwordErrorMsg}</Typography> : null}
        </Grid>
        <Button style={{width: '310px', borderRadius:'25px', marginTop: '10px', marginBottom: '0px', height:'50px'}} variant="contained" color="primary" onClick={handleSignup}>
          Signup
        </Button>
        </Grid>
        <Grid item xs={6}>
        <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_YnsM0o.json"  background="transparent"  speed="1"  style={{width: '300px', height: '300px'}} hover loop autoplay={true}></lottie-player>
        </Grid>
      </Grid>
      <a href="/Login" style={{textDecoration: 'none'}}><Typography sx={{ml:2}} variant="subtitle1" color="default">Already have an account? Click here to <b>Login</b></Typography></a>
    </Box>
    </Paper>
    </Container>
    </>
  )
}

export default Signup