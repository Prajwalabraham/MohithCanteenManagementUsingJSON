import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Send as SendIcon } from '@mui/icons-material';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material'
import AppBarComponent from './../../Components/AppBarComponent';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const columns = [
  { field: 'id', headerName: 'ID', width: 70, hidden: true, defaultVisible:false },
  { field: 'name', headerName: 'Menu Name', width: 150 },
  { field: 'description', headerName: 'Description', width: 200 },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 100,
  },
  { field: 'createdAt', headerName: 'Created Date', type: 'number', width: 100 },
  { field: 'image', headerName: 'Image', width: 250 },
  {
    field: 'delete',
    headerName: 'Delete',
    width: 100,
    renderCell: (params) => (
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => handleDelete(params.row.id)}
      >
        Delete
      </Button>
    ),
  },
];


const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/menu/${id}`)
      .then((response) => {
        console.log('Menu item deleted successfully!');
        // Handle any additional logic or UI updates
      })
      .catch((error) => {
        console.error('Error occurred while deleting menu item:', error);
        // Handle error and display appropriate error message
      });
  };

function AddMenuItem() {

    const navigate = useNavigate();

    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        if(!localStorage.getItem('username')){
            navigate('/Login')
        } 

        axios({
            method:'get',
            url: 'http://localhost:8080/api/menu',
          })
        .then(res => {
            setRows(res.data)
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
        }, []);

    const [isOpen, setIsOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [imageURL, setImageURL] = React.useState('');
    const [IsSubmitLoading, setIsSubmitLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [successMsg, setSuccessMsg] = React.useState('');
    const [severity, setSeverity] = React.useState('');
    
    const handleAddMenu = async()=>{
        console.log(name, description, price);
        axios({
            method:'post',
            url: 'http://localhost:8080/api/menu',
            data: {
                name: name,
                description: description,
                price: price,
                image: imageURL
            }
        })
        .then((res)=>{
            console.log(res);
            setSuccess(true);
            setSuccessMsg('Menu added successfully!!');
            setSeverity('success');
            setIsOpen(false);
            setName('');
            setDescription('');
            setPrice('');
            setImageURL('');
            window.location.reload();
        
        })
        .catch((err)=>{
            console.log(err);
            setSuccess(true);
            setSuccessMsg('Error occurred while adding menu!!');
            setSeverity('error');
            setIsOpen(false);
            setName('');
            setDescription('');
            setPrice('');
            setImageURL('');
        })
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
    <AppBarComponent/>
    <Container maxWidth="lg">
    <h3>Add Menu Item</h3>
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pprice: 0, ppriceSize: 5 },
          },
        }}
        ppriceSizeOptions={[5, 10]}
        checkboxSelection
      />
    <Button variant="contained" onClick={()=>setIsOpen(true)} sx={{background:'#000000'}} >
        Add Menu Item
      </Button>
    </div>
      
      </Container>
    <Modal  
        open={isOpen}
        onClose={()=>setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{display:'flex', justifyContent:'center', alignItems:'center'}}
      >
        <Box style={{background: '#ffffff', width:'80%', height: '90vh', display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center', boxSizing:'border-box', borderRadius:'25px' }}>
          <Typography variant="h5" color="default">Enter the Menu Details</Typography>
          <TextField
                  id="name"
                  label="Name"
                  type="text"
                  placeholder="Enter the OTP"
                  required
                  value={name}
                  onChange={(e)=>{setName(e.target.value)}}
                  style={{
                    marginTop:'70px',
                    marginLeft:'10px',
                    width:'90%'
                  }}
                /> 
                <TextField
                id="description"
                label="Description"
                multiline
                type="text"
                placeholder="Enter the Description"
                required
                value={description}
                onChange={(e)=>{setDescription(e.target.value)}}
                style={{
                  marginTop:'10px',
                  marginLeft:'10px',
                  width:'90%'
                }}
              /> 
              <TextField
              id="Price"
              label="Price"
              type="number"
              placeholder="Enter the Price"
              required
              value={price}
              onChange={(e)=>{setPrice(e.target.value)}}
              style={{
                marginTop:'10px',
                marginLeft:'10px',
                width:'90%'
              }}
            />
            <TextField
              id="image"
              label="Image URl"
              type="text"
              placeholder="Enter the Image URL"
              required
              value={imageURL}
              onChange={(e)=>{setImageURL(e.target.value)}}
              style={{
                marginTop:'10px',
                marginLeft:'10px',
                width:'90%'
              }}
            />
                {IsSubmitLoading? 
                <Grid sx={{ width: '90%', marginLeft:'10px' }}>
                  <LinearProgress />
                </Grid>
                :
                <Button onClick={handleAddMenu}  style={{marginLeft:'10px', marginTop:'20px', borderRadius:'20px', width:'90%', height:'8%'}} variant="contained" color="primary" endIcon={<SendIcon />}>
                    Add Menu Item
                </Button>
                }
        </Box>
    </Modal>
    </>
  )
}

export default AddMenuItem