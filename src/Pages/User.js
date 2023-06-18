import React from 'react'
import AppBarComponent from './../Components/AppBarComponent';
import MenuCard from './../Components/MenuCards';
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import axios from 'axios';
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { Send as SendIcon } from '@mui/icons-material';
import LinearProgress from '@mui/material/LinearProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});





function User() {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);
  const [IsSubmitLoading, setIsSubmitLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState('');
  const [severity, setSeverity] = React.useState('');
  
  const addToCart = (item) => {
    console.log(item);
    setCartItems((prevItems) => [...prevItems, item]);
    setTotal((prevTotal) => prevTotal + item.menuPrice);
  };


  React.useEffect(() => {
    console.log(localStorage.getItem('id'))
    axios({
      method:'get',
      url: 'http://localhost:8080/api/menu',
    })
    .then(res => {
      console.log(res);
      setMenuItems(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  const handleSubmit = () => {
    console.log(cartItems)
    if(cartItems.length<0 || total===0){
      setSeverity('error')
      setSuccessMsg('No items in the Cart')
      setSuccess(true)
      return
    }
    else{
    setIsSubmitLoading(true);
    for (let index = 0; index < cartItems.length; index++) {
      setTimeout(() => {
        let item = cartItems[index];
        console.log(item);
        axios({
          method:'post',
          url: 'http://localhost:8080/api/orders/add',
          data: { 
            menuId: item.id,
            quantity: item.quantity,
            userId: item.userId,
            price: total,
            menuName: item.menuName,
            menuDescription: item.menuDescription,
            menuPrice: item.quantity * item.menuPrice,
            image: item.image,
            username: localStorage.getItem('username'),
          }
        })
        .then(res => {
          console.log(res);
          setIsSubmitLoading(false);
          setIsOpen(false);
          setCartItems([]);
          setTotal(0);
          setSuccess(true);
          setSuccessMsg('Order Placed Successfully');
          setSeverity('success');
        })
        .catch(async err => {
          console.log(err);
          setIsSubmitLoading(false);
          setIsOpen(false);
          setCartItems([]);
          setTotal(0);
          setSuccess(true);
          await setSeverity('error');
          setSuccessMsg('Order was not Placed');
        });
      }, index * 1000);
    }
    
    setIsSubmitLoading(false);
    }
  }

  React.useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  const calculateTotal = () => {
    let totalPrice = 0;
    for (const item of cartItems) {
      totalPrice += item.quantity * item.menuPrice;
    }
    setTotal(totalPrice);
  };

  const updateQuantity = (index, value) => {
    setCartItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index].quantity = value;
      return newItems;
    });
  };

  const handleLogout = () => {
    localStorage.clear()
    navigate('/Login')
  }

  
    
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccess(false);
  };

  let totalPrice = 0;
  return (
    <>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%', background:'#4BB543' }}>
        {successMsg}
      </Alert>
      </Snackbar>
      <AppBarComponent />
      <h2 style={{textAlign: 'left', padding: 20, marginLeft:'20px'}}>Canteen Menu:</h2>
      <Button variant="contained" onClick={()=>navigate('/userOrders')} sx={{background:'#000000', marginLeft:'100px',marginBottom:'10px', marginTop:'0px', fontSize: '20px', fontWeight:'bold'}}>
        Your Orders 
      </Button>
      <br/>
      <Grid container spacing={0} sx={{
        padding: 10,
        marginTop:'-100px'
      }}>
        {menuItems?.map((item, index) => {
        return(
        <Grid key={index} sx={{
          padding: 2,
          backgroundColor: '#fff',
        }} 
        item xs={12} md={4} lg={3} xl={3}>
           <MenuCard props={item} addToCart={addToCart} />
        </Grid>
      )})}
      </Grid>
      <Button sx={{marginLeft:'100px',marginTop:'-100px', fontSize: '20px', fontWeight:'bold'}} onClick={()=>setIsOpen(true)} variant="outlined" color="primary">
        Checkout
      </Button>
      <Button  sx={{marginLeft:'100px',marginTop:'-100px', fontSize: '20px', fontWeight:'bold'}} onClick={handleLogout} variant="outlined" color="primary">
        LogOut
      </Button>
      <Modal  
        open={isOpen}
        onClose={()=>setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{display:'flex', justifyContent:'center', alignItems:'center'}}
      >
        <Box style={{background: '#ffffff', width:'80%', height: '90vh', display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center', boxSizing:'border-box', borderRadius:'25px' }}>
          <Typography variant="h5" color="default">Cart Details</Typography>
          <TableContainer component={Paper} sx={{ width: '90%', marginLeft:'10px' }}>
      <Table sx={{ minWidth: 600, padding: '50px' }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell><strong> Description</strong></TableCell>
            <TableCell align="right"><strong>Qty.</strong> </TableCell>
            <TableCell align="right"><strong>Price</strong> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((row, index) => {
            console.log(total);
            return(
            <TableRow>
              <TableCell>{row.menuName}</TableCell>
              <TableCell align="right"><TextField
                id="quantity"
                label="Quantity"
                value={row.quantity}
                type='number'
                onChange={(e) => updateQuantity(index, e.target.value)}
                
              /></TableCell>
              <TableCell align="right">{row.quantity * row.menuPrice}</TableCell>
            </TableRow>
          )})}
          
          <TableRow>
            <TableCell align="right"><b> Total</b></TableCell>
            <TableCell align="right"></TableCell>  
            <TableCell align="right"><b>{total}</b></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
                {IsSubmitLoading? 
                <Grid sx={{ width: '90%', marginLeft:'10px' }}>
                  <LinearProgress />
                </Grid>
                :
                <Button onClick={handleSubmit}  style={{marginLeft:'10px', marginTop:'20px', borderRadius:'20px', width:'90%', height:'8%'}} variant="contained" color="primary" endIcon={<SendIcon />}>
                    Check-Out
                </Button>
                }
        </Box>
    </Modal>
    </>
  )
}

export default User