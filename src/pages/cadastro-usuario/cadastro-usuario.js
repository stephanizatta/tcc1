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
    const isUsuarioCadastrado = useState(false);
    const isRedirecting = useState(false);
    const navigate = useNavigate ();
    const session = JSON.parse(localStorage.getItem("user_session"));
    const userSession = session.data.user.userType;

    const handleChange = (event) => {
        setUserType(event.target.value);
    };
   
    function handleBackHome() {
        navigate('/home?is'+{userSession}+'=true');
    }

    function onSubmit(event){
        event.preventDefault();
        const data = new FormData(event.target);
    
        var object = {};
        data.forEach((value, key) => object[key] = value);
        fetch('http://localhost:3001/pub/register', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(object),
        });
    }

    return (
        <div className='backgroundCadastro'>
            <form onSubmit={onSubmit}>
                <Box display='flex' justifyContent='center' style={{ width: '100%' }}>
                    <Paper elevation={3} sx={{ p: 3 }} style={{ width: '32rem' }}>
                        <Box component="h1" align="center" display='flex' justifyContent='center' flexDirection='column'>

                            <Typography variant="h4" component="h1" align="center"> Cadastro de Usuário </Typography>
                            <TextField
                                required
                                style={{marginTop: '1rem'}}
                                label="Nome completo"
                                name='firstName'
                            />
                            <TextField
                                required
                                style={{marginTop: '1rem'}}
                                label="E-mail"
                                name='email'
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
                                    name='userType'
                                    >
                                    <MenuItem value="admin">Administrador</MenuItem>
                                    <MenuItem value="financeiro">Financeiro</MenuItem>
                                    <MenuItem value="instrumentador">Instrumentador</MenuItem>
                                    <MenuItem value="medico">Médico</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                style={{marginTop: '1rem' }}
                                label="Assinatura"
                            />
                            <TextField
                                style={{marginTop: '1rem' }}
                                label="CRM"
                                type="crm"
                                name='crm'
                            />
                            <TextField
                                required
                                style={{marginTop: '1rem' }}
                                label="Senha"
                                type="password"
                                name='password'
                            />
                            <TextField
                                required
                                style={{marginTop: '1rem' }}
                                label="Repita a senha"
                                type="password"
                                name='confirmPassword'
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
                                            type='submit'
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
            </form>
        </div>
    );
}

export default CadastroUsuario;