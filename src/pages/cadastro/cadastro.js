import './cadastro.css';
import React from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Cadastro() {
    return (
        <div className='backgroundCadastro'>
        <Box display='flex' justifyContent='center' style={{ width: '100%' }}>
            <Paper elevation={3} sx={{ p: 3 }} style={{ width: '40rem' }}>
                <Box component="h1" align="center" display='flex' justifyContent='center' flexDirection='column'>

                    <Typography variant="h4" component="h1" align="center"> Cadastro</Typography>
                    <TextField
                        required
                        style={{marginTop: '8px' }}
                        id="outlined-required"
                        label="Nome completo"
                        placeholder="Digite seu e-mail"
                    />

                    <TextField
                        required
                        style={{marginTop: '10px' }}
                        id="outlined-password-input"
                        label="CRM"
                        type="password"
                        autoComplete="current-password"
                    />

                    <TextField
                        required
                        style={{marginTop: '10px' }}
                        id="outlined-required"
                        label="E-mail"
                        placeholder="Digite seu e-mail"
                    />

                    <TextField
                        required
                        style={{marginTop: '10px' }}
                        id="outlined-password-input"
                        label="Senha"
                        type="password"
                        autoComplete="current-password"
                    />

                    <TextField
                        required
                        style={{marginTop: '10px' }}
                        id="outlined-password-input"
                        label="Repita sua senha"
                        type="password"
                        autoComplete="current-password"
                    />

                    <Box>
                        <Link to='/home'>
                            <Button
                                color='primary'
                                variant='contained'
                                style={{ width: '7rem', marginTop: '5px'  }}
                            >
                                OK
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Box>
        </div>
    );
}

export default Cadastro;