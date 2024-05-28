// src/LoginForm.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Avatar, CssBaseline, Grid, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

//const serverlURL="http://localhost:8080"
const serverlURL="https://schaduler.onrender.com"

const theme = createTheme();

const LoginForm = ({setUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
        const {data}=await axios.post(serverlURL+"/auth",{
            email,password
        })
        if(data.accepted){
            setUser(true)
            window.localStorage.setItem("logged","true")
        }
    }catch(err){

    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="Username"
              autoComplete="username"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            
          </Box>
        </Box>
        <Typography>
            If you forget the username or the password, please contact the provider
        </Typography>
      </Container>
    </ThemeProvider>
  );
};

export default LoginForm;