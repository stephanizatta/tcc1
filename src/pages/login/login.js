import './login.css';
import React from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';

function Login() {
  return (
    <Box display='flex' justifyContent='center' style={{ width: '100%' }}>
      <Paper elevation={3} sx={{ p: 3 }} style={{ width: '30rem' }}>
        <Box display='flex' justifyContent='center' flexDirection='column'>
          <Typography variant="h4" component="h1" align="center">Login</Typography>
          <br></br>
          <TextField
            required
            id="outlined-required"
            label="E-mail"
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

            <Box>
              <Button
                color='primary'
                variant='contained'
                style={{ width: '7rem', marginRight: '10px' }}
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