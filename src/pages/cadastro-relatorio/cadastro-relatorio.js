import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import './cadastro-relatorio.css';
import React from 'react';
import { Link } from 'react-router-dom';

function CadastroRelatorio() {
    return(
        <Box display='flex' justifyContent='center' style={{ width: '100%' }}>
            <Paper elevation={3} sx={{ p: 3 }} style={{ width: '30rem' }}>
                <Box display='flex' justifyContent='center' flexDirection='column'>
                    <Typography variant="h4" component="h1" align="center">
                        Cadastro de Relatório
                    </Typography>
                    <br/>

                    <Typography variant="h5" align="left" style={{marginTop: '1rem' }}>
                        Consumo de material
                    </Typography>
                    <TextField
                        required
                        style={{marginTop: '1rem' }}
                        label="Referência"
                        type="text"
                    />
                    <TextField
                        required
                        style={{marginTop: '1rem' }}
                        label="Quantidade"
                        type="number"
                    />
                    <TextField
                        required
                        style={{marginTop: '1rem' }}
                        label="Descrição"
                        type="text"
                    />
                    <TextField
                        required
                        style={{marginTop: '1rem' }}
                        label="Lote"
                        type="text"
                    />
                    <Button variant='text'>
                        Adicionar mais +
                    </Button>

                    <Typography variant="h5" align="left" style={{marginTop: '1rem' }}>
                        Informações adicionais
                    </Typography>
                    <TextField
                        required
                        style={{marginTop: '1rem' }}
                        label="Hospital"
                        type="text"
                    />
                    <TextField
                        required
                        style={{marginTop: '1rem' }}
                        label="Médico"
                        type="text"
                    />
                    <TextField
                        required
                        style={{marginTop: '1rem' }}
                        label="Paciente"
                        type="text"
                    />
                    <TextField
                        required
                        style={{marginTop: '1rem' }}
                        type="date"
                    /> 
                    <TextField
                        required
                        style={{marginTop: '1rem' }}
                        type="time"
                    />
                    <TextField
                        required
                        style={{marginTop: '1rem' }}
                        label="Instrumentador"
                        type="text"
                    />
                    <TextField
                        style={{marginTop: '1rem' }}
                        label="Convênio"
                        type="text"
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
    );
}

export default CadastroRelatorio;