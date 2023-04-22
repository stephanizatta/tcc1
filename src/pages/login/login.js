import './login.css';
import React from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <Box display='flex' justifyContent='center' style={{ width: '100%' }}>
      <Paper elevation={3} sx={{ p: 3 }} style={{ width: '30rem' }}>
        <Box display='flex' justifyContent='center' flexDirection='column'>
          <Typography variant="h4" component="h1" align="center">Login</Typography>
          <br/>
          <TextField
            required
            id="outlined-required"
            label="E-mail"
            placeholder="Digite seu e-mail"
          />
          <br/>
          <TextField
            required
            id="outlined-password-input"
            label="Senha"
            type="password"
            autoComplete="current-password"
          />
          <br/>
          <Box>

            <Box>
              <Link to='/home'>
                <Button
                  color='primary'
                  variant='contained'
                  style={{ width: '7rem', marginRight: '10px' }}
                >
                  Entrar
                </Button>
              </Link>

              <Link to='/cadastro'>
                <Button
                  color='primary'
                  variant='contained'
                  style={{ width: '7rem' }}
                >
                  Cadastrar
                </Button>
              </Link>
            </Box>

            <Link to='esqueceu-senha'>
              <Button
                variant='text'
              >
                Esqueceu sua senha?
              </Button>
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;