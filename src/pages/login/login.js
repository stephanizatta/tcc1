import './login.css';
import React from 'react';
import { Box, Button, Checkbox, Input, Paper, TextField, Typography } from '@mui/material';

function Login(props) {
  return (
    <Box display='flex' justifyContent='center' style={{ width: '100%' }}>
      <Paper elevation={3} sx={{ p: 3 }} style={{ width: '30rem' }}>
        <Box display='flex' justifyContent='center' flexDirection='column'>
          <Typography>Login</Typography>
          <TextField
            required
            id="outlined-required"
            label="E-mail"
            type= "e-mail"
            placeholder="Digite seu e-mail"
          />
            <br></br>
          <TextField
            required
            id="outlined-password-input"
            label="Senha"
            type="password"
            autoComplete="current-password"
          />
          <br></br>
          <Box>
            <Button variant='text'>Esqueceu sua senha?</Button>
            <Button color='primary' variant='contained'>Entrar</Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;