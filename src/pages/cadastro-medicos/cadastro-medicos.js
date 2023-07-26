import { Box, Button, Paper, TextField, Typography, Alert, AlertTitle, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CadastroMedicos() {
    const [isUsuarioCadastrado, setIsUsuarioCadastrado] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const navigate = useNavigate ();

    function handleBackHome() {
        navigate('/home?isAdmin=true');
    }

    function handleOk() {
        setIsUsuarioCadastrado(true);
        setIsRedirecting(true);
    
        setTimeout(() => {
            window.location.href = '/home?isAdmin=true';
        }, 3000);
    }

    return (
        <div className='backgroundCadastro'>
            <Box display='flex' justifyContent='center' style={{ width: '100%' }}>
                <Paper elevation={3} sx={{ p: 3 }} style={{ width: '32rem' }}>
                    <Box component="h1" align="center" display='flex' justifyContent='center' flexDirection='column'>

                        <Typography variant="h4" component="h1" align="center"> Cadastro de Médico </Typography>
                        <TextField
                            required
                            style={{marginTop: '1rem'}}
                            label="Nome completo"
                        />
                        <TextField
                            required
                            style={{marginTop: '1rem'}}
                            label="E-mail"
                        />
                        
                        <TextField
                            required
                            style={{marginTop: '1rem' }}
                            label="Assinatura"
                        />
                        <TextField
                            required
                            style={{marginTop: '1rem' }}
                            label="Senha"
                            type="password"
                        />
                        <TextField
                            required
                            style={{marginTop: '1rem' }}
                            label="Repita a senha"
                            type="password"
                        />

                        <Box style={{ marginTop: '1rem' }}>
                            {isUsuarioCadastrado && isRedirecting ? (
                                <Box display="flex" alignItems="center">
                                    <Alert severity="success" style={{ marginRight: '1rem' }}>
                                        <AlertTitle>Usuário cadastrado com sucesso!</AlertTitle>
                                    </Alert>
                                    <CircularProgress color="primary" size={24} />
                                </Box>
                            ) : (
                                <>
                                    <Button
                                        color='primary'
                                        variant='contained'
                                        style={{ width: '7rem', marginRight: '1rem' }}
                                        onClick={handleOk}
                                        >
                                        Ok
                                    </Button>
                                    <Button
                                        color='primary'
                                        variant='contained'
                                        style={{ width: '7rem' }}
                                        onClick={handleBackHome}
                                        >
                                        Voltar
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </div>
    );
}

export default CadastroMedicos;