import './login.css';
import React, { useState } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleLogin() {
    if (email === 'admin' && password === 'admin') {
      window.location.href = '/home?isAdmin=true';

    } else if (email === 'instrumentador' && password === 'instrumentador'){
      window.location.href = '/home?isInstrumentador=true';

    } else if  (email === 'medico' && password === 'medico') {
      window.location.href = '/home?isMedico=true';

    } else if (email === 'financeiro' && password === 'financeiro') {
      window.location.href = '/home?isFinanceiro=true';
      
    } else {
      setErrorMessage('Credenciais inválidas. Por favor, verifique seu e-mail e senha.');
    }
  }

  return (    
    <div className='backgroundLogin'>
      <Box display='flex' justifyContent='center' style={{ width: '100%' }}>
        <Paper elevation={3} sx={{ p: 3 }} style={{ width: '25rem' }}>
          <Box display='flex' justifyContent='center' flexDirection='column'>
            <Typography variant="h4" component="h1" align="center">Login</Typography>

            <br/>

            <TextField
              required
              id="outlined-required"
              label="E-mail"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={handleEmailChange}
            />

            <br/>

            <TextField
              required
              id="outlined-password-input"
              label="Senha"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />

            <br/>

            {errorMessage && (
              <p style={{ color: 'red', textAlign: 'center'}}>
                {errorMessage}
              </p>
            )}

            <Box>
              <Box display="flex" justifyContent="center">
                <Button
                  color='primary'
                  variant='contained'
                  style={{ width: '7rem', marginRight: '1rem' }}
                  onClick={handleLogin}
                >
                  Entrar
                </Button>
              </Box>

              <Box display="flex" justifyContent="center">
                <Link to='esqueceu-senha'>
                  <Button variant='text'>
                    Esqueceu sua senha?
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </div>
  );
}

export default Login;