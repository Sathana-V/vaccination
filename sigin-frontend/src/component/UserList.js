import * as React from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import UserTable from './UserTable';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function UserList() {
 const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));
  const [FirstName, setFirstName] = React.useState('');
 const  handleClickOpen=()=>{
      setOpen(true)
  }
  const changeFirstName = (e) => 
  {
    setFirstName(e.target.value);
  };
  const [SecondName, setSecondName] = React.useState('');
  const changeSecondName = (e) => {
    setSecondName(e.target.value);
  };
  const [Address, setAddress] = React.useState('');
  const changeAddress = (e) => {
    setAddress(e.target.value);
  };
  const [Age, setAge] = React.useState('');
  const changeAge = (e) => {
    setAge(e.target.value);
  };
  const [StateName, setStateName] = React.useState('');
  const changeStateName = (e) => {
    setStateName(e.target.value);
  };
  const [City, setCity] = React.useState('');
  const changeCity = (e) => {
    setCity(e.target.value);
  };
  const [Pincode, setPincode] = React.useState('');
  const changePincode = (e) => {
    setPincode(e.target.value);
  };
  const [Gender, setGender] = React.useState('');
  const changeGender = (e) => {
    setGender(e.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const SubmitUser=()=>{
      console.log(FirstName,SecondName)
      console.log(StateName,City,Pincode,Address)
      console.log(Age,Gender)
  }
  const [type, setType] = React.useState('');
  const changeType = (event) => {
    setType(event.target.value);
  };
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
       ADD USERS
      </Button>
      <div style={{marginTop:'4%'}}>

     
      <UserTable></UserTable> </div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
          
        <DialogTitle id="responsive-dialog-title">
          {"Add Users"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          <Grid container spacing={4}>
  <Grid item xl={6}>
      
    <TextField fullWidth value={FirstName} onChange={changeFirstName} value={FirstName} onChange={changeFirstName} id="First Name" label="First Name" variant="filled" />
  </Grid>
  <Grid item xl={6}>
  <TextField fullWidth value={SecondName} onChange={changeSecondName} id="Second Name" label="Second Name" variant="filled" />
  </Grid>
  
  <Grid item xl={4}>
  <TextField fullWidth value={Age} onChange={changeAge} id="age" type="number" label="age" variant="filled" />
  </Grid>
  <Grid item xl={8}>
  <TextField fullWidth value={Address} onChange={changeAddress} id="address" label="Address" variant="filled" />
  </Grid>
  <Grid item xl={4}>
  <TextField fullWidth value={StateName} onChange={changeStateName} id="state"  label="state" variant="filled" />
  </Grid>
  <Grid item xl={4}>
  <TextField fullWidth value={City} onChange={changeCity} id="city"  label="city" variant="filled" />
  </Grid>
  <Grid item xl={4}>
  <TextField fullWidth value={Pincode} onChange={changePincode} id="pincode"  label="pincode" variant="filled" />
  </Grid>
  
 
  <Grid item xl={4}>
  <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={Gender}
          onChange={changeGender}
          label="Gender"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'Male'}>Male</MenuItem>
          <MenuItem value={'Female'}>Female</MenuItem>
          
        </Select>
      </FormControl>
  </Grid>
  <Grid item x={4}>
  <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">type</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={type}
          onChange={changeType}
          label="type"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'Vaccinator'}>Vaccinator</MenuItem>
          <MenuItem value={'Line Workers'}>Line Workers</MenuItem>
          
        </Select>
      </FormControl>
      </Grid>
</Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{color:'green'}} autoFocus onClick={SubmitUser}>
           Save
          </Button>
          <Button style={{color:'red'}} onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      </React.Fragment>
    );
}




     