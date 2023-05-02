import React from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function CadastroMedico() {
    return (
        <div className='backgroundCadastro'>
            <Box display='flex' justifyContent='center' style={{ width: '100%' }}>
                <Paper elevation={3} sx={{ p: 3 }} style={{ width: '40rem' }}>
                    <Box component="h1" align="center" display='flex' justifyContent='center' flexDirection='column'>

                        <Typography variant="h4" component="h1" align="center"> Cadastro de Médico </Typography>
                        <TextField
                            required
                            style={{marginTop: '1rem' }}
                            label="Nome completo"
                        />
                        <TextField
                            required
                            style={{marginTop: '1rem' }}
                            label="E-mail"
                        />
                        <TextField
                            required
                            style={{marginTop: '1rem' }}
                            label="CRM"
                        />
                        <TextField
                            required
                            style={{marginTop: '1rem' }}
                            label="Escolha uma senha"
                            type="password"
                        />
                        <TextField
                            required
                            style={{marginTop: '1rem' }}
                            label="Repita a senha"
                            type="password"
                        />
                        <TextField
                            required
                            style={{marginTop: '1rem' }}
                            label="Assinatura"
                        />

                        <Box style={{ marginTop: '1rem' }}>                        
                            <Link align='center' to='/home' >
                                <Button 
                                    color='primary'
                                    variant='contained'
                                    style={{ width: '7rem', marginRight: '1rem' }}
                                >
                                    Ok
                                </Button>
                            </Link>
                            <Link to='/home' align='center'>
                                <Button
                                    color='primary'
                                    variant='contained'
                                    style={{ width: '7rem' }}
                                >
                                    Voltar
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </div>
    );
}

export default CadastroMedico;