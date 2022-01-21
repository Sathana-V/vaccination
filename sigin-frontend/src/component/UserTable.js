import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 200 },
  { field: 'lastName', headerName: 'Last name', width: 200 },
  {
    field: 'age',
    headerName: 'Age',
    width: 100,
  },
  {
    field: 'address',
    headerName: 'Address',
    width: 300,
  },
  {
    field: 'mobileno',
    headerName: 'Mobile Number',
    width: 200,
  },
  {
    field: 'gender',
    headerName: 'Gender',
    width: 200,
  },
  {
    field: 'type',
    headerName: 'Type',
    width: 200,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 200,
    valueGetter: (params) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 ,address:'8/2345,kumar Nagar,CHennai-641602',mobileno:'9898989898',gender:'Female',type:'vaccinator'},
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 ,address:'8/2345,kumar Nagar,CHennai-641602',mobileno:'9898989898',gender:'Female',type:'vaccinator'},
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 ,address:'8/2345,kumar Nagar,CHennai-641602',mobileno:'9898989898',gender:'Female',type:'vaccinator'},
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 ,address:'8/2345,kumar Nagar,CHennai-641602',mobileno:'9898989898',gender:'Female',type:'vaccinator'},
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null ,address:'8/2345,kumar Nagar,CHennai-641602',mobileno:'9898989898',gender:'Female',type:'vaccinator'},
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 ,address:'8/2345,kumar Nagar,CHennai-641602',mobileno:'9898989898',gender:'Female',type:'vaccinator'},
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 ,address:'8/2345,kumar Nagar,CHennai-641602',mobileno:'9898989898',gender:'Female',type:'vaccinator'},
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 ,address:'8/2345,kumar Nagar,CHennai-641602',mobileno:'9898989898',gender:'Female',type:'vaccinator'},
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 ,address:'8/2345,kumar Nagar,CHennai-641602',mobileno:'9898989898',gender:'Female',type:'vaccinator'},
];

export default function UserTable() {
   
      const [pageSize, setPageSize] = React.useState(25);
    
  return (
      
      <div>
         <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPage) => setPageSize(newPage)}
        pagination
      />
    </div>
      </div>
    
  );
}