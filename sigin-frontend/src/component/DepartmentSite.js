
import { styled, useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import  CentersList from './CentersList';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Avatar, Menu, MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import { AccountCircle, Home } from '@mui/icons-material';
import { lineHeight } from '@mui/system';
import { NavLink } from 'react-router-dom';
import UserList from './UserList';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});


const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const linkStyle={
    textDecoration:'none',
    color:'black'}
const nameStyle={
    height:'40px',
    fontSize:'14px',
    lineHeight:'2px',
    margin:'0px 20px',
    height:'70px',
    textAlign:'left',
    padding:'4px 6px 0px 20px',
    marginTop:'-20px',
    marginBottom:'-20px',
    borderLeft:'1px solid white'
}
const userName={
  fontWeight:'400px',
  fontSize:'15px',
  textTransform:'Capitalize'
}
const role={
    fontWeight:'300px',
    fontSize:'13px',
    textTransform:'Capitalize'
}
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);



export default function DepartmentSite() {
 
  const theme = useTheme();
 const [auth, setAuth] = React.useState(true);
const [anchorEl, setAnchorEl] = React.useState(null);
const [selectedOption, setSelectedOption] = React.useState(0);

  const [open, setOpen] = React.useState(false);
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
      
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
            Photos
          </Typography>
          <div style={nameStyle}>
                <h4 style={userName}>sathana</h4>
                <span style={role}>Site Manager</span>
                </div>
          {auth && (
            <div>
                
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
               
              >
               
                <AccountCircle  style={{fontSize:'50px'}} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
    
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem button>
              <ListItemIcon>
                 <InboxIcon /> 
              </ListItemIcon>
              <ListItemText onClick={()=>setSelectedOption(1)} primary='Vaccination Centers' />
            </ListItem>
        </List>
        <Divider />
        <List>
        <ListItem button>
              <ListItemIcon>
                 <InboxIcon /> 
              </ListItemIcon>
              <ListItemText onClick={()=>setSelectedOption(2)} primary='Users' />
              {/* <NavLink style={linkStyle} to='/vaccinator'>Users</NavLink>
                 */}
            </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      <div>
          
        {
            (selectedOption===2)?<UserList></UserList>:''
            
        }
         </div>
         <div>
        {
         
            (selectedOption===1)?<CentersList ></CentersList>:''
           
        }
       </div>
     
       
      </Box>
    </Box>
  );
}
