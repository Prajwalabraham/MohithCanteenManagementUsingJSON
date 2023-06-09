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
import LinearProgress from '@mui/material/LinearProgress';
import InputAdornment from '@mui/material/InputAdornment';
import { Send as SendIcon } from '@mui/icons-material';
import BadgeIcon from '@mui/icons-material/Badge';
import KeyIcon from '@mui/icons-material/Key';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});





function Login() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [usernameErrorMsg, setUsernameErrorMsg] = useState('');
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
    
    const [UsernameError, setUsernameError] = useState(false);
    const [PasswordError, setPasswordError] = useState(false);
    const [IsSubmitLoading, setIsSubmitLoading] = useState(false);
    const [success, setSuccess] = React.useState(false);
    const [successMsg, setSuccessMsg] = React.useState('');
    const [severity, setSeverity] = React.useState('');
    



    const handleLogin = async() => {
      await setIsSubmitLoading(true);
      if (username == '') {
        setUsernameError(true);
        setIsSubmitLoading(false);
        return;
      } 
      else{    
      let userData = {
        username:username,
        password:Password
      }
      axios({
        method:'post',
        url: 'http://localhost:8080/api/login',
        data: userData
      })
      .then(res => {
        console.log(res);
        setIsSubmitLoading(false);
        setSuccess(true);
        setSeverity('success');
        setSuccessMsg('Login Successful');
        if(res.status === 200){
          localStorage.setItem('userID', res.data.userId)
          localStorage.setItem('username', res.data.username)
          localStorage.setItem('role', res.data.role)
          navigate('/Main')
        }
      })
      .catch(async err => {          
        console.log(err);
        if (err.request.status===0) {
          setIsSubmitLoading(false);
          await setSuccess(true);
          await setSeverity('error');
          setSuccessMsg('Dumbo go change the path in the Backend Controller ');
          alert("Dumbo go change the path in the Backend Controller ")
        
        }
        else {
          setIsSubmitLoading(false);
          await setSuccess(true);
          await setSeverity('error');
          setSuccessMsg('Invalid Username or Password');
          alert("Invalid Username or Password")
        }
      })
    }
    }

  const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;

  
    
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
    <Typography variant="h6" component="div" style={{textAlign: 'center'}}></Typography>
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
        <Grid item xs={12} style={{marginTop: '50px', marginBottom: '10px'}}>
        <Typography style={{ fontFamily:'Poppins', position:'absolute', marginTop:'5px', marginLeft:'10px'}} variant="h6" color="black"> muki  :</Typography>
                <TextField
                  id="username"
                  label="Username"
                  type="text"
                  error={UsernameError}
                  helperText={
                    username.length > 10
                      ? "Username should be a maximum of 10 characters"
                      : UsernameError
                      ? "Please enter a valid username"
                      : username.length === 0
                      ? "Username is required"
                      : null
                  }
                  placeholder="Enter your Username"
                  required
                  value={username}
                  onChange={(e)=>{setUsername(e.target.value); setUsernameError(false)}}
                  style={{
                    marginTop:'70px',
                    marginLeft:'10px',
                    width:'100%'
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" >
                          <BadgeIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="password"
                  label="Password"
                  type="text"
                  hidden
                  error={PasswordError}
                  helperText={
                    Password.length < 6
                      ? "Password should be at least 6 characters long"
                      : Password.length > 10
                      ? "Password should be a maximum of 10 characters long"
                      : !specialCharacters.test(Password)
                      ? "Password should contain at least one special character"
                      : PasswordError
                      ? "Please enter a valid password"
                      : Password.length === 0
                      ? "Password is required"
                      : null
                  }
                  placeholder="Enter your Password"
                  required
                  value={Password}
                  onChange={(e)=>{setPassword(e.target.value); setPasswordError(false)}}
                  style={{
                    marginTop:'15px',
                    marginLeft:'10px',
                    width:'100%'
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" >
                          <KeyIcon />
                      </InputAdornment>
                    ),
                  }}
                />
             
            {/* <TextField style={{width: '100%', marginTop:'10px'}} id="outlined-basic" label="Username" variant="outlined" onChange={(e) => {setUsername(e.target.value); setUsernameErrorMsg('')} } value={username} />      
            {usernameErrorMsg?  <Typography variant="subtitle1" color="error">{usernameErrorMsg}</Typography> : null}
            <TextField style={{width: '100%', marginTop:'10px'}} id="outlined-basic" label="Password" variant="outlined" onChange={(e) => {setPassword(e.target.value); setPasswordErrorMsg('')}} value={password} type="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" />
            {passwordErrorMsg?  <Typography variant="subtitle1" color="error">{passwordErrorMsg}</Typography> : null} */}
        </Grid>
        {/* <Button style={{width: '150px', borderRadius:'25px', marginTop: '10px', marginBottom: '0px', height:'50px'}} variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button> */}
           {IsSubmitLoading? 
                <Grid sx={{ width: '10%', marginLeft:'100px' }}>
                  <LinearProgress />
                </Grid>
                :
                <Button onClick={handleLogin} style={{marginLeft:'10px', marginTop:'20px', borderRadius:'20px', width:'100%', height:'15%'}} variant="contained" color="primary" endIcon={<SendIcon />}>
                    Login
                </Button>
                }
        </Grid>
            <Grid item xs={5}>
        <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_YnsM0o.json"  background="transparent"  speed="2"  style={{width: '500px', height: '400px'}} hover loop autoplay={true}></lottie-player>
        </Grid>
      </Grid>
      <a href="/Signup" style={{textDecoration: 'none',ml:40}}><Typography sx={{ml:5}}variant="subtitle1" color="default">New here? Click here to <b>Signup</b></Typography></a>
    </Box>
    </Paper>
    </Container>
    </>
  )
}

export default Login