import './cadastro.css';
import React from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';

function Cadastro() {
    return (
        <Box display='flex' justifyContent='center' style={{ width: '100%' }}>
            <Paper elevation={3} sx={{ p: 3 }} style={{ width: '40rem' }}>
                <Box display='flex' justifyContent='center' flexDirection='column'>

                    <Typography>Cadastro</Typography>
                    <TextField
                        required
                        id="outlined-required"
                        label="Nome completo"
                        placeholder="Digite seu e-mail"
                    />

                    <TextField
                        required
                        id="outlined-password-input"
                        label="CRM"
                        type="password"
                        autoComplete="current-password"
                    />

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

                    <TextField
                        required
                        id="outlined-password-input"
                        label="Repita sua senha"
                        type="password"
                        autoComplete="current-password"
                    />

                    <Box>
                        <Button
                            color='primary'
                            variant='contained'
                            style={{ width: '7rem' }}
                            onClick={() => {
                                alert('WIP-Ok');
                            }}
                        >
                            OK
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

export default Cadastro;