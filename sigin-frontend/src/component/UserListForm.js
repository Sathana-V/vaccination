import  React ,{ useEffect, useState } from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { makeStyles ,createStyles} from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import EditCenters from './EditCenters';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import Select from '@mui/material/Select';
import { Controller, useForm } from 'react-hook-form';
export default function CentersList(props) {
  const [centers,setCenters]=useState([]);
  
  const fetchPost = async () => {
    const response = await axios.get(`http://localhost:4000/centers`)
     const data = response.data;
      console.log(data);
      setCenters(data);
    };
    const [open, setOpen] = React.useState(false);
    const [EditItem, setEditItem] = React.useState([]);
    const [open2, setOpen2] = React.useState(false);
    useEffect( ()=>{
      
       fetchPost();
           
      
      
       console.log("centers",centers)
    },[])
    const handleClick = ( event,param) => {
      event.stopPropagation();
      event.preventDefault();
      
      setEditItem(param.row)
      console.log("values",param.row)
      setOpen2(true);
      console.log("clicked",param);
      console.log("event",event)
    };
    const filterTasks=(id)=>{
      const tasks =centers.filter(center => center.id !== id);
      return { tasks };
    }
    const deleteCenter=(id)=>{
      console.log(id)
      axios.delete(`http://localhost:4000/centers/`+id)
      .then(response=>{
          console.log(response)
          
      })
      .catch(error=>{
          console.log(error)
      })
      
       setCenters(centers.filter(center => center.id !== id))
       console.log(centers);
    }
  
  const { register,reset, control, handleSubmit, formState: { errors }, } = useForm();
 
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));
  const columns = [
    {
      field: 'id',
      renderCell: (cellValues) => {
        return (
          <h1></h1>
        )}
    },
   
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
      headerName: 'state',
      width: 200,
    },
   
    {
      field: 'pincode',
      headerName: 'pincode',
      width: 200,
    },
    {
      field: "Actions",
      headerName:"Actions",
      width: 100,
      
      renderCell: (cellValues) => {
        return (
          <div>
            
            <IconButton aria-label="delete"   color="success"   onClick={(event) => {
              handleClick(event,cellValues);
            }}>
   < EditIcon></ EditIcon>
   </IconButton>
  <IconButton aria-label="delete"    color="primary"  onClick={(event) => {
              deleteCenter(cellValues.row.id);
            }}>
  <DeleteIcon />
</IconButton>
    
          </div>

        );
      }
    },
  ];
  
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    reset();
    setOpen(false);
  };
  const handleClose2 =  ()=>{
    
      fetchPost();
   
     setOpen2(false);
  };
  const updatedCenters = ()=>{
        
      fetchPost();
   
      setOpen2(false);
  }
  const SubmitUser = (data) => {
    console.log('called')
    console.log(data)
    axios.post(`http://localhost:4000/centers`,data)
        .then(response=>{
            console.log(response)
            console.log(response.data.createdcenters)
            setCenters([...centers,response.data.createdcenters])
            console.log("cet centes",centers)
            handleClose();
        })
        .catch(error=>{
            console.log(error)
        })
  }
  const [ptypeSize, setPtypeSize] = React.useState(25);
 
  return (
    
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        ADD VACCINATION CENTER
      </Button>
      <div style={{ marginTop: '4%' }}>


      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
         disableSelectionOnClick={true}
        rows={centers}
        disableSelectionOnClick
        columns={columns}
        ptypeSize={ptypeSize}
        onPtypeSizeChange={(newPtype) => setPtypeSize(newPtype)}
        pagination
        checkboxSelection={false}
      />
    </div>
    </div>
    <Dialog
        fullScreen={fullScreen}
        open={open2}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <EditCenters items={EditItem} handleClick={handleClose2} updated={updatedCenters}></EditCenters>
      </Dialog>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <form id="userform" onSubmit={handleSubmit(SubmitUser)} >
          <DialogTitle id="responsive-dialog-title">
            {"VACCINATION CENTER"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>

              <Grid container spacing={4}>
                <Grid item xl={6}>

                  <TextField fullWidth  {...register("hospitalName", { required: "Name id required" })} 
                   error={!!errors?.hospitalName}
                   helpertext={errors?.hospitalName ? errors.hospitalName.message : null}
                  id="HospitalName" label="HospitalName" variant="filled" />
                </Grid>
                <Grid item xl={6}>
                  <TextField fullWidth
                    {...register("hospitalID", { required: "hospitalID id required" })}
                    error={!!errors?.hospitalID}
                    helpertext={errors?.hospitalID ? errors.hospitalID.message : null}
                    id="Hospital ID" label="Hospital ID" variant="filled" />
                </Grid>

                <Grid item xl={4}>
                <FormControl variant="filled" fullWidth error={Boolean(errors.type)}
                    helpertext={errors?.type ? errors.type.message : null} >
                    <InputLabel id="demo-simple-select-standard-label2">Fee Type</InputLabel>
                    <Controller
                      render={({ field: { onChange, value } }) => (
                        <Select onChange={onChange} value={value}>
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={'Paid'}>Paid</MenuItem>
                          <MenuItem value={'Free'}>Free</MenuItem>
                        </Select>
                      )}
                      name="type"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: 'chose Fee Type'
                      }}
                    >

                    </Controller>

                  </FormControl>
                </Grid>
                <Grid item xl={4}>
                  <TextField fullWidth  {...register("latitude", { required: " required" })}
                    error={!!errors?.latitude}
                    helpertext={errors?.latitude ? errors.latitude.message : null}
                    id="Latitude" label="Latitude" variant="filled" />
                </Grid>
                <Grid item xl={4}>
                  <TextField fullWidth    {...register("longitude", { required: " required" })}
                    error={!!errors?.longitude}
                    helpertext={errors?.longitude ? errors.longitude.message : null}
                    id="Longitude" label="Longitude" variant="filled" />
                </Grid>
                <Grid item xl={4}>
                  <TextField fullWidth  {...register("address1", { required: " required" })}
                    error={!!errors?.address1}
                    helpertext={errors?.address1 ? errors.address1.message : null}
                    id="Address1" label="Address 1" variant="filled" />
                </Grid>
                <Grid item xl={4}>
                  <TextField fullWidth    {...register("address2", { required: " required" })}
                    error={!!errors?.address2}
                    helpertext={errors?.address2 ? errors.address2.message : null}
                    id="Address2" label="Address 2" variant="filled" />
                </Grid>
                <Grid item xl={4}>
                  <TextField fullWidth   {...register("block", { required: " required" })}
                    error={!!errors?.block}
                    helpertext={errors?.block ? errors.block.message : null}
                    id="Block" label="Block" variant="filled" />
                </Grid>
                <Grid item xl={4}>
                  <TextField fullWidth  {...register("district", { required: " required" })}
                    error={!!errors?.district}
                    helpertext={errors?.district ? errors.district.message : null}
                    id="District" label="District" variant="filled" />
                </Grid>
                <Grid item xl={4}>
                  <TextField fullWidth    {...register("state", { required: " required" })}
                    error={!!errors?.state}
                    helpertext={errors?.state ? errors.state.message : null}
                    id="State" label="State" variant="filled" />
                </Grid>
                <Grid item xl={4}>
                  <TextField fullWidth   {...register("pincode", { required: " required" })}
                    error={!!errors?.pincode}
                    helpertext={errors?.pincode ? errors.pincode.message : null}
                    id="pincode" label="pincode" variant="filled" />
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




