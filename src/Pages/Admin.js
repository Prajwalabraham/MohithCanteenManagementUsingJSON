import React from 'react'
import Menu from './Admin/Menu';
import AppBarComponent from './../Components/AppBarComponent';
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/addMenuItem');
  }
  return (
    <>
      <AppBarComponent />
      <Container maxWidth="lg">
        <h1>Admin Dashboard</h1>
        <h4>Food Orders:</h4>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Menu />
          </Grid>
        </Grid>
      <Button variant="contained" onClick={handleClick} sx={{background:'#000000'}} >
        Add Menu Item
      </Button>
      </Container>
    </>
  )
}

export default Admin