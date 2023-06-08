import './cadastro-usuario.css';
import { Box, Button, Paper, TextField, Typography, Alert, AlertTitle, CircularProgress } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CadastroUsuario() {
    const [userType, setUserType] = React.useState('');
    const [isUsuarioCadastrado, setIsUsuarioCadastrado] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const navigate = useNavigate ();

    const handleChange = (event) => {
        setUserType(event.target.value);
    };

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

                        <Typography variant="h4" component="h1" align="center"> Cadastro</Typography>
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
                        <FormControl
                            style={{marginTop: '1rem'}}
                            >
                            <InputLabel id="demo-simple-select-label">Tipo de usuário</InputLabel>
                            <Select
                                required
                                value={userType}
                                label="Tipo de usuário"
                                onChange={handleChange}
                                >
                                <MenuItem value={10}>Administrador</MenuItem>
                                <MenuItem value={20}>Financeiro</MenuItem>
                                <MenuItem value={30}>Instrumentador</MenuItem>
                                <MenuItem value={40}>Médico</MenuItem>
                            </Select>
                        </FormControl>
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

export default CadastroUsuario;