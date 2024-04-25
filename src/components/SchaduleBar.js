import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

const pages = ['Products', 'Pricing', 'Blog'];


const colors=[
  {
    value:0,
    color:"red",
    label:"InPerson"
  },
  {
    value:1,
    color:"blue",
    label:"Online"
  },
  {
    value:2,
    color:"orange",
    label:"Lab"
  }
]


function SchaduleBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const labels=["Year","Major","Semester"]
  const options=[
    ["Jenior","First","Second","Third","Senior"],
    ["CS","EE","Robotic"],
    ["Fall","Winter","Summer"]
  ]
  const [state, setState] = useState([
    "Jenior",
    "CS",
    "Winter"
  ]);
  
  const handleChange = (event,index) => {
    let new_state=state.map(item=>item)
    new_state[index]=event.target.value
    setState(new_state);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

 

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
         
          <Box sx={{ flexGrow: 1,gap:2, display: { xs: 'none', md: 'flex' } }}>
            {labels.map((label,index) => (
               <Box sx={{ minWidth: 120 }}>
               <FormControl variant='filled' fullWidth>
                 <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                 <Select
                   labelId="demo-simple-select-label"
                   id="demo-simple-select"
                   value={state[index]}
                   label={label}
                   onChange={(e)=>handleChange(e,index)}
                   style={{background:"white"}}
                 >
                  {options[index].map((item)=>{
                    return   <MenuItem value={item}>{item}</MenuItem>
                  })}
                  
                 </Select>
               </FormControl>
             </Box>
            ))}
          </Box>

         {colors.map(color=>{
          return <Box sx={{m:2, gap:1, display:'flex',alignItems:"center",justifyContent:"center"}}> <Box sx={{height:30,width:30,borderRadius:"10px",background:color.color}}></Box> <Box>{color.label}</Box></Box>
         })}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default  SchaduleBar;
