import * as React from 'react';
import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';

import Container from '@mui/material/Container';

import {MenuItem,Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
function NavbarCo({setUser}) {
 const navigator=useNavigate()

   

  return (
    <AppBar sx={{bgcolor: "rgb(210,80,80)" }} position="static"  >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <MenuItem  onClick={()=>{ navigator("/")}}>
                  <Typography textAlign="center">{"Schedules"}</Typography>
                </MenuItem>
                <MenuItem  onClick={()=>{ navigator("/addcourse")}}>
                  <Typography textAlign="center">{"Courses"}</Typography>
                </MenuItem>
                <MenuItem  onClick={()=>{ navigator("/addprofessor")}}>
                  <Typography textAlign="center">{"Professors"}</Typography>
                </MenuItem>
                 <MenuItem onClick={()=>{
            setUser(false)
            window.localStorage.setItem("logged","false")
            
            }}>
          <Typography textAlign="center">{"LogOut"}</Typography>
          </MenuItem>
        
        </Toolbar>

         
      </Container>
    </AppBar>
  );
}
export default  NavbarCo;
