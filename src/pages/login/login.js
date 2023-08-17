import './login.css';
import React, { useState } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const session = JSON.parse(localStorage.getItem("user_session"));

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleLogin() {
    const login = await fetch('http://localhost:3001/pub/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({email, password}),
    });

    localStorage.setItem("user_session", JSON.stringify(await login.json()));

    if (session.success === false || session.email === "" || session.password === "") {
      setErrorMessage('Credenciais inválidas. Por favor, verifique seu e-mail e senha.');
    } else {
      window.location.href = '/home';
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
              id="outlined-email"
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