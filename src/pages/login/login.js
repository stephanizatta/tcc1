import './login.css';
import React from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';

function Login() {
  return (
    <Box display='flex' justifyContent='center' style={{ width: '100%' }}>
      <Paper elevation={3} sx={{ p: 3 }} style={{ width: '30rem' }}>
        <Box display='flex' justifyContent='center' flexDirection='column'>
          <Typography>Teste</Typography>
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
            <Button variant='text'>Esqueceu sua senha?</Button>
            <Button color='primary' variant='contained'>Entrar</Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;
