import './cadastro-usuario.css';
import { Box, Button, LinearProgress, Paper, TextField, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function CadastroUsuario() {
    const [userType, setUserType] = React.useState('');
    const navigate = useNavigate ();
    const session = JSON.parse(localStorage.getItem("user_session"));
    const userSession = session.data.usuario.tipoDeUsuario;
    const [successMessage, setSuccessMessage] = useState(false);
    const [showAdditionalFields, setShowAdditionalFields] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleChange = (event) => {
        setUserType(event.target.value);
        setShowAdditionalFields(event.target.value === "medico");
    };

    function handleBackHome() {
        navigate('/home?is'+{userSession}+'=true');
    }

    function onSubmit(event){
        event.preventDefault();

        const data = new FormData(event.target);
        var object = {};        

        data.forEach((value, key) => object[key] = value);

        if (object.senha !== object.repitaSenha) {
            setPasswordsMatch(false);
            return;
        }

        fetch('http://localhost:3001/pub/cadastrarUsuario', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(object),
        }).then(() => {
            setPasswordsMatch(true);
            setSuccessMessage(true); 
            setTimeout(() => navigate('/home?is'+ userSession +'=true'), 3000); 
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
                                name='nome'
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
                                    name='tipoDeUsuario'
                                    >
                                    <MenuItem value="admin">Administrador</MenuItem>
                                    <MenuItem value="financeiro">Financeiro</MenuItem>
                                    <MenuItem value="instrumentador">Instrumentador</MenuItem>
                                    <MenuItem value="medico">Médico</MenuItem>
                                </Select>
                            </FormControl>
                            {showAdditionalFields && (
                                <>
                                    <TextField
                                        required
                                        name="assinaturaMedico"
                                        style={{marginTop: '1rem' }}
                                        label="Assinatura"
                                    />
                                    <TextField
                                        required
                                        style={{marginTop: '1rem' }}
                                        label="CRM"
                                        type="text"
                                        name='medicoCrm'
                                    />
                                </>
                            )}
                            <TextField
                                required
                                style={{marginTop: '1rem' }}
                                label="Senha"
                                type="password"
                                name='senha'
                            />
                            <TextField
                                required
                                style={{marginTop: '1rem' }}
                                label="Repita a senha"
                                type="password"
                                name='repitaSenha'
                            />
                            {!passwordsMatch && (
                                <Box mt={2} width='100%'>
                                    <Alert severity="error">
                                        <AlertTitle>Senhas não coincidem</AlertTitle>
                                    </Alert>
                                </Box>
                            )}
                            
                            <Box style={{ marginTop: '1rem' }}>                                                            
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
                            </Box>
                            {successMessage && (
                                <Box mt={2} width='100%'>
                                    <Alert severity="success">
                                        <AlertTitle>Usuário cadastrado com sucesso! </AlertTitle>
                                        <LinearProgress color="success" size={24} />                                        
                                    </Alert>
                                </Box>
                            )}
                        </Box>
                    </Paper>
                </Box>
            </form>
        </div>
    );
}

export default CadastroUsuario;