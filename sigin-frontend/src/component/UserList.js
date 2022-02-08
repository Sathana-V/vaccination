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
import EditUserList from './EditUserList';
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
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 ,address:'8/2345,kumar Nagar,CHennai-641602',mobileno:'9898989898',gender:'Female',type:'vaccinator'},
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 ,address:'8/2345,kumar Nagar,CHennai-641602',mobileno:'9898989898',gender:'Female',type:'vaccinator'},
  ];  
  const [blockAdmin,setblockAdmin]=useState([]);
  const [EditItem, setEditItem] = React.useState([]);
  const [open2, setOpen2] = React.useState(false);
  const fetchPost = async () => {
    const response = await axios.get(`http://localhost:4000/blockadmin`)
     const data = response.data.AdminDetails;
      console.log(data);
      setblockAdmin(data);
    };
    const handleClick = ( event,param) => {
      event.stopPropagation();
      event.preventDefault();
       
      setEditItem(param.row)
      console.log("values",param.row)
      setOpen2(true);
      console.log(param.row.hospitalId)
      console.log(param.row.hospitalName)
      // console.log("clicked",param);
      // console.log("event",event)
    };
    const deleteAdmin=(id)=>{
      console.log(id)
      axios.delete(`http://localhost:4000/blockadmin/`+id)
      .then(response=>{
          console.log(response)
          
      })
      .catch(error=>{
          console.log(error)
      })
      
       setblockAdmin(blockAdmin.filter(admin => admin.id !== id))
       console.log(blockAdmin);
    }
    const updatedCenters = ()=>{
        
      fetchPost();
   
      setOpen2(false);
  }
  
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
    field: 'phoneNumber',
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
    field: 'role',
    headerName: 'Role',
    width: 200,
  },
  {
    field: 'hospitalName',
    headerName: 'Hospital Name',
    width: 200,
  },
  {
    field: 'hospitalAddress',
    headerName: 'hospital Address',
    width: 200,
  },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 200,
  //   valueGetter: (params) =>
  //     `${params.getValue(params.id, 'firstName') || ''} ${
  //       params.getValue(params.id, 'lastName') || ''
  //     }`,
  // },
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
           deleteAdmin(cellValues.row.id);
        
          }}>
<DeleteIcon />
</IconButton>
  
        </div>

      );
    }
  }
];
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
    axios.post(`http://localhost:4000/blockadmin`,data)
    .then(response=>{
        console.log(response)
        console.log(response.data.AdminDetails)
        setblockAdmin([...blockAdmin,response.data.AdminDetails])
        console.log("cet centes",blockAdmin)
        handleClose();
    })
    .catch(error=>{
        console.log(error)
    })
  }
  
  
  const handleClose2 =  ()=>{
    
      fetchPost();
   
     setOpen2(false);
  };
  const getHospitalName = (e)=>{
   const myArray=HospitalList.find(x => x.id ===getValues('hospitalId'))
   
    console.log('called',getValues('hospitalId'));
  console.log('called',  myArray);
  setValue("hospitalName",myArray.hospitalName);
  let address ="";
  let fulladdress = address.concat(" ", myArray.address1, ", ", myArray.address2," ",myArray.block," ,",myArray.district," ,",myArray.state," ,",myArray.pincode);
  console.log(fulladdress)
  setValue("hospitalAddress",fulladdress);
  }
  useEffect(()=>{
    fetchPost();
          
    console.log("blockAdmin",blockAdmin)
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
  const [pageSize, setPageSize] = React.useState(25);
  return (
    
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        ADD USERS LIST
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open2}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <EditUserList items={EditItem} handleClick={handleClose2} updated={updatedCenters}></EditUserList>
      </Dialog>
      <div style={{ marginTop: '4%' }}>


      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={blockAdmin}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPage) => setPageSize(newPage)}
        pagination
      />
    </div> </div>
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




