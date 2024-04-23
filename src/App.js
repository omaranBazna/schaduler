import logo from './logo.svg';
import './App.css';

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import SchaduleBar from './components/SchaduleBar';

const Item = styled(Paper)(({ theme  ,width}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height:"100%",
  width:width
}));

function App() {
  return (
    <div className="App" style={{height:"100vh"}}>
      <Stack height="90%">
        <SchaduleBar />
      
      <Stack height={"100%"} direction="row" spacing={2}>
        <Item width={"200px"}>Item 1</Item>
        <Item width={"200px"}>Item 2</Item>
        <Item width={"100%"}>Item 3</Item>
      </Stack>

      </Stack>
       
    </div>
  );
}

export default App;
