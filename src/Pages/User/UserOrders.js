import React from 'react'
import AppBarComponent from './../../Components/AppBarComponent';
import MenuCard from '../../Components/MenuCards'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import axios from 'axios';
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';
import UserOrdersCard from './../../Components/UserOrdersCard';
import Typography from '@mui/material/Typography'

function UserOrders() {
    const [menuItems, setMenuItems] = React.useState([]);
    React.useEffect(() => {
        axios({
            method:'get',
            url: `http://localhost:8080/api/orders/${localStorage.getItem('username')}`,
        })
        .then((response) => {
            setMenuItems(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    let total = 0;

  return (
    <>
    <AppBarComponent />
    <h2 style={{marginLeft:'20px', marginTop:'20px'}}>UserOrders</h2>
    <Grid container spacing={0} sx={{
        padding: 10,
        marginTop:'-100px'
      }}>
        {menuItems?.map((item, index) => {
          const subtotal = item?.menuPrice * item?.quantity || 0;

          // Add the subtotal to the total
          total += subtotal;
          console.log(total)
        return(
        <Grid key={index} sx={{
          padding: 2,
          backgroundColor: '#fff',
        }} 
        item xs={12} md={4} lg={3} xl={3}>
           <UserOrdersCard props={item} />
        </Grid>
      )})}
      <Typography variant="h5" color="black"> Total: {total}</Typography>
      </Grid>
    </>
  
  )
}

export default UserOrders