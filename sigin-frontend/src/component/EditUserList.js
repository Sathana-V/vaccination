
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


function EditUserList(props) {
    const { register,reset, control, handleSubmit,getValues,setValue, formState: { errors }, } = useForm();
    const [HospitalList,setHospitalList]=useState([]);
    const  updateAdmin=  async (data)=>{
        console.log(`called update http://localhost:4000/blockadmin/`+props.items.id)
        getHospitalName();
        console.log("submit",getValues('hospitalId'))
        console.log(getValues('hospitalName'))
        console.log(getValues('hospitalAddress'))
     console.log(data)
   try
    {
        const res= await axios.put(`http://localhost:4000/blockadmin/`+props.items.id,data);
       // console.log(res)
        props.updated();
    }
    catch(error)
    {
        console.log(error)

    }
           
          
       
        
    }
    const fetchPost = async () => {
        const response = await axios.get(`http://localhost:4000/centers`)
         const data = response.data;
         // console.log(data);
          setHospitalList(data);
        };
    useEffect(()=>{
      
        fetchPost();
        setValue("address", props.items.address)
        setValue("age", props.items.age)
        setValue("firstName", props.items.firstName)
        setValue("lastName", props.items.lastName)
        setValue("role", props.items.role)
        setValue("phoneNumber", props.items.phoneNumber)
        setValue("gender", props.items.gender)
        setValue("city", props.items.city)
        setValue("hospitalId", props.items.hospitalId)
        console.log(getValues('hospitalId'));
        setValue("hospitalName", props.items.hospitalName)
        setValue("hospitalAddress", props.items.hospitalAddress)
        setValue("pincode", props.items.pincode)
        setValue("state", props.items.state)
        setValue("type", props.items.type)
       
       
    },[]);
    const getHospitalName = (e)=>{
        const myArray=HospitalList.find(x => x.id ===getValues('hospitalId'))
        let address ="";
       // console.log("my",myArray)
        setValue("hospitalName",myArray.hospitalName);
  let fulladdress = address.concat(" ", myArray.address1, ", ", myArray.address2," ",myArray.block," ,",myArray.district," ,",myArray.state," ,",myArray.pincode);
  console.log(fulladdress)
  setValue("hospitalAddress",fulladdress);
  console.log("change",getValues('hospitalId'))
  console.log(getValues('hospitalName'))
  console.log(getValues('hospitalAddress'))
       }
    return (
        <React.Fragment>
             <form id="userform" onSubmit={handleSubmit(updateAdmin)} >
          <DialogTitle id="responsive-dialog-title">
            {"BLOCK ADMIN"}
          </DialogTitle>
          <DialogContent>
          <DialogContentText>

<Grid container spacing={4}>
  <Grid item xl={6}>

    <TextField fullWidth  {...register("firstName", { required: "Name id required" })} 
     error={!!errors?.FirstName}
     helpertext={errors?.FirstName ? errors.FirstName.meassage : null}
    id="First Name" label="First Name" variant="filled" />
  </Grid>
  <Grid item xl={6}>
    <TextField fullWidth
      {...register("lastName", { required: "LastName id required" })}
      error={!!errors?.lastName}
      helpertext={errors?.lastName ? errors.lastName.meassage : null}
      id="Last Name" label="Last Name" variant="filled" />
  </Grid>
 
  <Grid item xl={4}>
    <TextField
      fullWidth
      {...register("age", { required: "Age id required" })}
      error={!!errors?.Age}
      helpertext={errors?.Age ? errors.Age.meassage : null}


      id="age" type="number" label="age" variant="filled" />
  </Grid>
  <Grid item xl={8}>
    <TextField fullWidth  {...register("address", { required: "Address id required" })}
      error={!!errors?.Address}
      helpertext={errors?.Address ? errors.Address.meassage : null}
      id="address" label="Address" variant="filled" />
  </Grid>
  <Grid item xl={4}>
    <TextField fullWidth  {...register("state", { required: " required" })}
      error={!!errors?.State}
      helpertext={errors?.State ? errors.State.meassage : null}
      id="state" label="state" variant="filled" />
  </Grid>
  <Grid item xl={4}>
    <TextField fullWidth    {...register("city", { required: " required" })}
      error={!!errors?.City}
      helpertext={errors?.City ? errors.City.meassage : null}
      id="city" label="city" variant="filled" />
  </Grid>
  <Grid item xl={4}>
    <TextField fullWidth   {...register("pincode", { required: " required" })}
      error={!!errors?.Pincode}
      helpertext={errors?.Pincode ? errors.Pincode.meassage : null}
      id="pincode" label="pincode" variant="filled" />
  </Grid>


  <Grid item xl={4}>
    <FormControl variant="filled" fullWidth error={Boolean(errors.gender)}
      helpertext={errors?.gender ? errors.gender.message : null} >
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
        name="gender"
        control={control}
        defaultValue=""
        rules={{
          required: 'chose gender'
        }}
      >

      </Controller>

    </FormControl>
  </Grid>
  <Grid item xl={4}>
    <FormControl variant="filled" fullWidth error={Boolean(errors.type)}
      helperText={errors?.type ? errors.type.message : null} >
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
        name="type"
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
    <FormControl variant="filled" fullWidth error={Boolean(errors.role)}
      helperText={errors?.role ? errors.role.message : null} >
      <InputLabel id="demo-simple-select-standard-label2">role</InputLabel>
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
        name="role"
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
    <TextField fullWidth
      {...register("phoneNumber", { required: "phoneNumber id required" })}
      error={!!errors?.phoneNumber}
      helpertext={errors?.phoneNumber ? errors.phoneNumber.message : null}
      id="Phone Number" label="Phone Number" variant="filled" />
  </Grid>
  <Grid item xl={8}>
    <FormControl   variant="filled" fullWidth error={Boolean(errors.hospitalId)}
      helperText={errors?.hospitalId ? errors.hospitalId.message : null} >
      <InputLabel id="demo-simple-select-standard-label2">hospitalName</InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select onChange={(e) => {
            onChange(e)
            getHospitalName(e)
          }}  value={value}>
            <MenuItem value="">
              <em>None</em>
              </MenuItem>
            {HospitalList.map((list)=>{return <MenuItem value={list.id}>{list.hospitalName}</MenuItem>})}
            
          </Select>
        )}
        name="hospitalId"
        control={control}
        defaultValue=""
        rules={{
          required: 'chose hospitalName'
        }}
      >

      </Controller>

    </FormControl>
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

export default EditUserList;