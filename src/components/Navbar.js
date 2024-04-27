import * as React from 'react';
import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';

import Container from '@mui/material/Container';

import { styled} from '@mui/material';
import {MenuItem,Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
function NavbarCo() {
 const navigator=useNavigate()

   

  return (
    <AppBar sx={{background:"rgb(255,160,150"}} position="static"  >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <MenuItem  onClick={()=>{ navigator("/schedule")}}>
                  <Typography textAlign="center">{"Schedule"}</Typography>
                </MenuItem>
                <MenuItem  onClick={()=>{ navigator("/addcourse")}}>
                  <Typography textAlign="center">{"Courses"}</Typography>
                </MenuItem>
                <MenuItem  onClick={()=>{ navigator("/addprofessor")}}>
                  <Typography textAlign="center">{"Professors"}</Typography>
                </MenuItem>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default  NavbarCo;
