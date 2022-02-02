
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
import VaccinationCenterTable from './VaccinationCenterTable';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import Select from '@mui/material/Select';
import { Controller, useForm } from 'react-hook-form';


function EditCenters(props) {
    const { register,reset, control, handleSubmit,setValue, formState: { errors }, } = useForm();
    const  updateCenter=  async (data)=>{
        console.log(`called update http://localhost:4000/centers/`+props.items.id)
     console.log(data)
   try
    {
        const res= await axios.put(`http://localhost:4000/centers/`+props.items.id,data);
        console.log(res)
        props.updated();
    }
    catch(error)
    {
        console.log(error)

    }
           
          
       
        
    }
    useEffect(()=>{
        console.log(props.items);
      
        setValue("hospitalName", props.items.hospitalName)
        setValue("address1", props.items.address1)
        setValue("address2", props.items.address2)
        setValue("block", props.items.block)

        setValue("hospitalID", props.items.hospitalID)
        setValue("latitude", props.items.latitude)
        setValue("district", props.items.district)
        setValue("longitude", props.items.longitude)
        setValue("pincode", props.items.pincode)
        setValue("state", props.items.state)
        setValue("type", props.items.type)
    },[])
    
    return (
        <React.Fragment>
             <form id="userform" onSubmit={handleSubmit(updateCenter)} >
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
            <Button style={{ color: 'green' }}  type="submit" autoFocus >
              Save
            </Button>
            <Button style={{ color: 'red' }} onClick={props.handleClick} autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </form>
        </React.Fragment>
    );
}

export default EditCenters;