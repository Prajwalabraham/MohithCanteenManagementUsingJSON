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






export default function UserOrdersCard({props}) {
    console.log(props);
  
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
    //   alert('Item added to cart');
    // })
    // .catch(err => {
    //   console.log(err);
    //   alert('Something went wrong');
    // })

  }
  return (
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
  );
}