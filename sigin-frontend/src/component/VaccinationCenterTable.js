import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid , GridColDef, GridApi, GridCellValue} from '@mui/x-data-grid';
import { Button, Typography } from '@mui/material';

const handleClick = (param, event) => {
  event.stopPropagation();
  console.log("clicked",param,"event",event)
};

const handleRowClick = (param, event) => {
  event.stopPropagation();
};
const columns = [
  {
    field: 'action',
    headerName: 'Action',
    sortable: false,
    renderCell: (params) => <h1>{params.hospitalName} </h1> 
  },
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'hospitalName', headerName: 'Hospital name', width: 200 },
  { field: 'hospitalID', headerName: 'Hospital ID', width: 200 },
  {
    field: 'type',
    headerName: 'type',
    width: 100,
  },
  {
    field: 'address1',
    headerName: 'Address',
    width: 300,
  
 
},
  {
    field: 'block',
    headerName: 'Mobile Number',
    width: 200,
  },
  {
    field: 'block',
    headerName: 'Block',
    width: 200,
  },
  {
    field: 'state',
    headerName: 'states',
    width: 200,
  },
  {
    field: "Print",
    headerName:"Print",
    width: 200,
    renderCell: (cellValues) => {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={(event) => {
            handleClick(event, cellValues);
          }}
        >
          Print
        </Button>
      );
    }
  },
  {
    field: 'pincode',
    headerName: 'pincode',
    width: 200,
  },
  
  
];



export default function VacccinationCenterTable(props) {
    const [centers,setCenters]=useState([]);
    useEffect(()=>{
        console.log(props.centers)
        setCenters(props.centers)
    },[])
      const [ptypeSize, setPtypeSize] = React.useState(25);
    
  return (
      
      <div>
         <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={centers}
        columns={columns}
        ptypeSize={ptypeSize}
        onPtypeSizeChange={(newPtype) => setPtypeSize(newPtype)}
        pagination
      >
        
    
        </DataGrid>
    </div>
      </div>
    
  );
}