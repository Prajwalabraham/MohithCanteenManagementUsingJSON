import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button'
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});







export default function UserOrdersCard({props}) {
    console.log(props);
    const [success, setSuccess] = React.useState(false);
    const [successMsg, setSuccessMsg] = React.useState('');
    const [severity, setSeverity] = React.useState('');
    
  const handleAddToCart = () => {
    console.log(props?.id);
    // axios({
    //   method:'post',
    //   url: 'http://localhost:8080/api/orders/add',
    //   data: {
    //     menuId: props?.id,
    //     quantity: 1,
    //     userId: localStorage.getItem('id'),
    //     menuName: props?.name,
    //     menuDescription: props?.description,
    //     menuPrice: props?.price,

    //   }
    // })
    // .then(res => {
    //   console.log(res);
    //   setSuccess(true);
    //   setSuccessMsg('Item added to cart');
    //   setSeverity('success');
    
    // })
    // .catch(err => {
    //   console.log(err);
    //   setSuccess(true);
    //   setSuccessMsg('Something went wrong');
    //   setSeverity('error');
    
    // })

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
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props?.menuName}
        subheader={new Date(props?.createdAt).toLocaleString()}
      />
      <CardMedia
        component="img"
        height="194"
        image={props?.image}
      />

      <CardContent>
        <Typography variant="h5" color="text.secondary">{"₹"+props?.menuPrice}</Typography>
        <Typography variant="h5" color="text.secondary">{"qty:"+props?.quantity}</Typography>
        <Typography variant="h5" color="text.secondary">{"₹"+props?.price}</Typography>
        <br/>
        <Typography variant="body2" color="text.secondary">
          {props?.menuDescription}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
            <Button variant="outlined" color="primary" onClick={handleAddToCart}>
                Buy Now
            </Button>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
    </>
  );
}