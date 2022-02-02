import  React ,{ useEffect, useState } from 'react';
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

import axios from 'axios';
import Select from '@mui/material/Select';
import { Controller, useForm } from 'react-hook-form';
export default function UserList() {
  const { register,reset, control, handleSubmit,setValue, getValues ,formState: { errors }, } = useForm();
  const [open, setOpen] = useState(false);
  const [HospitalList, setHospitalList] = useState([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    reset();
    setOpen(false);
  };
  const SubmitUser = (data) => {
    console.log('called')
    console.log(data)
  }
  const getHospitalAddress = (e)=>{
   const myArray=HospitalList.find(x => x.id ===getValues('hospitalName'))
   
    console.log('called',getValues('hospitalName'));
  console.log('called',  myArray.address1);
  setValue("hospitalAddress",myArray.address1);
  }
  useEffect(()=>{
    axios.get('http://localhost:4000/centers')
    .then((response)=>{
       console.log(response)
       setHospitalList(response.data)
       console.log(HospitalList)
    })
    .catch(error=>{
      console.log(error)
    })
  },[])
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        ADD USERS LIST
      </Button>
      <div style={{ marginTop: '4%' }}>


        <UserTable></UserTable> </div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <form id="userform" onSubmit={handleSubmit(SubmitUser)} >
          <DialogTitle id="responsive-dialog-title">
            {"Add Users"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>

              <Grid container spacing={4}>
                <Grid item xl={6}>

                  <TextField fullWidth  {...register("FirstName", { required: "Name id required" })} 
                   error={!!errors?.FirstName}
                   helpertext={errors?.FirstName ? errors.FirstName.meassage : null}
                  id="First Name" label="First Name" variant="filled" />
                </Grid>
                <Grid item xl={6}>
                  <TextField fullWidth
                    {...register("LastName", { required: "LastName id required" })}
                    error={!!errors?.LastName}
                    helpertext={errors?.LastName ? errors.LastName.meassage : null}
                    id="Last Name" label="Last Name" variant="filled" />
                </Grid>
               
                <Grid item xl={4}>
                  <TextField
                    fullWidth
                    {...register("Age", { required: "Age id required" })}
                    error={!!errors?.Age}
                    helpertext={errors?.Age ? errors.Age.meassage : null}


                    id="age" type="number" label="age" variant="filled" />
                </Grid>
                <Grid item xl={8}>
                  <TextField fullWidth  {...register("Address", { required: "Address id required" })}
                    error={!!errors?.Address}
                    helpertext={errors?.Address ? errors.Address.meassage : null}
                    id="address" label="Address" variant="filled" />
                </Grid>
                <Grid item xl={4}>
                  <TextField fullWidth  {...register("State", { required: " required" })}
                    error={!!errors?.State}
                    helpertext={errors?.State ? errors.State.meassage : null}
                    id="state" label="state" variant="filled" />
                </Grid>
                <Grid item xl={4}>
                  <TextField fullWidth    {...register("City", { required: " required" })}
                    error={!!errors?.City}
                    helpertext={errors?.City ? errors.City.meassage : null}
                    id="city" label="city" variant="filled" />
                </Grid>
                <Grid item xl={4}>
                  <TextField fullWidth   {...register("Pincode", { required: " required" })}
                    error={!!errors?.Pincode}
                    helpertext={errors?.Pincode ? errors.Pincode.meassage : null}
                    id="pincode" label="pincode" variant="filled" />
                </Grid>


                <Grid item xl={4}>
                  <FormControl variant="filled" fullWidth error={Boolean(errors.Gender)}
                    helpertext={errors?.Gender ? errors.Gender.message : null} >
                    <InputLabel id="demo-simple-select-standard-label2">Gender</InputLabel>
                    <Controller
                      render={({ field: { onChange, value } }) => (
                        <Select onChange={onChange} value={value}>
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={'Male'}>Male</MenuItem>
                          <MenuItem value={'Female'}>Female</MenuItem>
                        </Select>
                      )}
                      name="Gender"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: 'chose Gender'
                      }}
                    >

                    </Controller>

                  </FormControl>
                </Grid>
                <Grid item xl={4}>
                  <FormControl variant="filled" fullWidth error={Boolean(errors.Type)}
                    helperText={errors?.Type ? errors.Type.message : null} >
                    <InputLabel id="demo-simple-select-standard-label2">type</InputLabel>
                    <Controller
                      render={({ field: { onChange, value } }) => (
                        <Select onChange={onChange} value={value}>
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={'Public'}>Public</MenuItem>
                          <MenuItem value={'Private'}>Private</MenuItem>
                        </Select>
                      )}
                      name="Type"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: 'chose type'
                      }}
                    >

                    </Controller>

                  </FormControl>
                </Grid>
                <Grid item xl={4}>
                  <FormControl variant="filled" fullWidth error={Boolean(errors.Role)}
                    helperText={errors?.Role ? errors.Role.message : null} >
                    <InputLabel id="demo-simple-select-standard-label2">Role</InputLabel>
                    <Controller
                      render={({ field: { onChange, value } }) => (
                        <Select onChange={onChange} value={value}>
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={'Vaccinators'}>Vaccinators</MenuItem>
                          <MenuItem value={'Line Workers'}>Line Workers</MenuItem>
                        </Select>
                      )}
                      name="Role"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: 'chose Role'
                      }}
                    >

                    </Controller>

                  </FormControl>
                </Grid>
                <Grid item xl={4}>
                  <FormControl   variant="filled" fullWidth error={Boolean(errors.hospitalName)}
                    helperText={errors?.hospitalName ? errors.hospitalName.message : null} >
                    <InputLabel id="demo-simple-select-standard-label2">hospitalName</InputLabel>
                    <Controller
                      render={({ field: { onChange, value } }) => (
                        <Select onChange={(e) => {
                          onChange(e)
                          getHospitalAddress(e)
                        }}  value={value}>
                          <MenuItem value="">
                            <em>None</em>
                            </MenuItem>
                          {HospitalList.map((list)=>{return <MenuItem value={list.id}>{list.hospitalName}</MenuItem>})}
                          
                        </Select>
                      )}
                      name="hospitalName"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: 'chose hospitalName'
                      }}
                    >

                    </Controller>

                  </FormControl>
                </Grid>
                <Grid item xl={6}>
                  <TextField fullWidth
                    {...register("hospitalAddress", { required: "hospitalAddress id required" })}
                    error={!!errors?.hospitalAddress}
                    helpertext={errors?.hospitalAddress ? errors.hospitalAddress.message : null}
                    id="Hospital ID" label="Hospital ID" variant="filled" />
                </Grid>
              </Grid>

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button style={{ color: 'green' }} type="submit" autoFocus >
              Save
            </Button>
            <Button style={{ color: 'red' }} onClick={handleClose} autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>

    </React.Fragment>
  );
}




