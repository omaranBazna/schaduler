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
import { useState ,useEffect} from 'react';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from '@mui/icons-material/Save';

import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { addEvents } from '../API/events';
import { getScheduleTitle } from '../API/schedules';
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


function SchaduleBar({events,params,setParams,scheduleId,
  setSelectedCourse,setSelectedProfessor,loadLists}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const labels=["Year","Major","Semester"]
  const options=[
    ["First","Second","Third","Fourth","Graduate"],
    ["EE","Robotic","CS"],
    ["Fall","Winter","Summer"]
  ]
   const [title,setTitle]=useState("")

  const loadTitle=async()=>{
    try{
     const data=await getScheduleTitle(scheduleId)
     setTitle(data)

    }catch(err){
      console.log(err)
    }
  }
   useEffect(()=>{
     loadTitle();
   })
  
  const handleChange = (event,label) => {
    let new_params={...params,[label]:event.target.value}
    setParams(new_params)
    setSelectedCourse(0)
    setSelectedProfessor(0)
    loadLists(new_params,0,0);
  

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
                   value={params[label]}
                   label={label}
                   onChange={(e)=>handleChange(e,label)}
                   style={{background:"white"}}
                 >
                  {options[index].map((item,index)=>{
                    
                    return   <MenuItem value={index+1}>{item}</MenuItem>
                  })}
                  
                 </Select>
               </FormControl>
             </Box>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1,gap:2, display: { xs: 'none', md: 'flex' } }}>
            <div>
              {title}
            </div>
          <SaveIcon onClick={async()=>{
                let uploadedEvents=events.filter(item=>{
                  return !item.professor && !item.dead
                })
                try{
                    await addEvents(params.Major,params.Year,params.Semester,scheduleId,uploadedEvents)
                }catch(err){
                  console.log(err)
                }
              }} sx={{cursor:"pointer",width:30,height:30,color:"white"}}/>
       
         </Box>
    



          <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">
          Search schedule
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>

         {colors.map(color=>{
          return <Box sx={{m:2, gap:1, display:'flex',alignItems:"center",justifyContent:"center"}}> <Box sx={{height:30,width:30,borderRadius:"10px",background:color.color}}></Box> <Box>{color.label}</Box></Box>
         })}
         <FlagCircleIcon sx={{ml:3,height:40,width:40,cursor:"pointer"}}/>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default  SchaduleBar;
