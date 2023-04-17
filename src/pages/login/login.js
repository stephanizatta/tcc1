import './login.css';
import React from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';

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
            placeholder="Digite seu e-mail"
          />

          <TextField
            required
            id="outlined-password-input"
            label="Senha"
            type="password"
            autoComplete="current-password"
          />

          <Box>
            <Box>
              <Button 
                color='primary' 
                variant='contained' 
                style={{ width: '7rem' }}
                onClick={() => {
                  alert('WIP-Entrar');
                }} 
              >
                Entrar
              </Button>

              <Button
                color='primary' 
                variant='contained' 
                style={{ width: '7rem' }}
                onClick={() => {
                  alert('WIP-Cadstrar');
                }} 
              >
                Cadastrar
              </Button>
            </Box>

            <Button 
              variant='text'
              onClick={() => {
                alert('WIP-Esqueceu a senha');
              }} 
            >
              Esqueceu sua senha?
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;