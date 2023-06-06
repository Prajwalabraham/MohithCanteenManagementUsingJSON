import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'menuName', headerName: 'Name', width: 180 },
  { field: 'menuDescription', headerName: 'Description', width:230 },
  {
    field: 'menuPrice',
    headerName: 'Price',
    type: 'number',
    width: 150,
  },
  { field: 'quantity', headerName: 'Quantity', type: 'number', width: 110 },
  { field: 'username', headerName: 'User', width: 90 }
];
  
export default function Menu() {
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    axios({
      method:'get',
      url: 'http://localhost:8080/api/orders',
    })
    .then(res => {
      console.log(res);
      setRows(res.data);
      })
    .catch(err => {
      console.log(err);
    })
  }, []);


  return (
    <div style={{ height: 500, width: '100%' }}>
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
    </div>
  );
}