import React from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link, InputAdornment, FormControl, InputLabel, OutlinedInput, IconButton } from '@mui/material'

import {Checkbox} from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { HealthAndSafetyOutlined, LockOutlined, PhoneAndroid, PhoneAndroidOutlined, Visibility, VisibilityOff } from '@mui/icons-material';

const Login=()=>{

    const paperStyle={padding :40,height:'60vh',width:380, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#045193',height:'7vh',width:50}
    const btnstyle={margin:'8px 0',backgroundColor:'#045193'}
    const padInput={marginTop:'20px'}
    const forget={color: '#045193',textDecoration: 'none',fontWeight: '600'}
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    
    return(
        <Grid sx={{ m: "5rem" }}>
          
            <Paper  elevation={10} style={paperStyle}>
                <Grid align='center' style={{marginTop:'-10px'}}>
                     <Avatar style={avatarStyle}><HealthAndSafetyOutlined style={{fontSize:'45px'}}/></Avatar>
                     <image src="https://admin.cowin.gov.in/assets/images/cowin-login-logo-blue.png" alt="image"></image>
                     <h3 style={{color:'GrayText',fontSize:'13px',fontWeight:'400'}}>Ministry of family and welfare</h3>
                    <h3 style={{color:'GrayText',fontWeight:'300',fontSize:'15px'}}>Welcome !</h3>
                    <p style={{marginTop:'-15px',fontSize:'15px',fontWeight:'500'}}>Health Facility Managers</p>
                </Grid>
                <FormControl variant="outlined" style={padInput}  fullWidth required>
          <InputLabel htmlFor="outlined-adornment-phonenumber">Phone Number</InputLabel>
          <OutlinedInput
            id="outlined-adornment-phonenumber"
           
            startAdornment={
               
                <InputAdornment>
                <PhoneAndroid></PhoneAndroid>
                </InputAdornment>
              }
          
            label="Phone Number"
          />
        </FormControl>
       
                <FormControl style={padInput}  variant="outlined" fullWidth required>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            startAdornment={
               
                <InputAdornment>
                <LockOutlined></LockOutlined>
                 
                
                </InputAdornment>
              }
            endAdornment={
               
              <InputAdornment>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Typography align='right' style={padInput} >
                     <Link style={forget} href="#" >
                        Forgot password ?
                     </Link>
                </Typography>
               
                {/* <TextField label='Username'    variant="standard" fullWidth required/>
                <TextField style={padInput} label='Password'   variant="standard" placeholder='Enter password' type='password' fullWidth required/>
               */}
                <FormControlLabel
                style={padInput}
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button type='submit' variant="contained" style={btnstyle} fullWidth>Login</Button>
              
            </Paper>
        </Grid>
    )
}

export default Login