import './cadastro-usuario.css';
import { Box, Button, LinearProgress, Paper, TextField, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function CadastroUsuario() {
    const navigate = useNavigate ();
    const session = JSON.parse(localStorage.getItem("user_session"));
    const userSession = session.data.usuario.tipoDeUsuario;
    const [successMessage, setSuccessMessage] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const params = useParams();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [tipo, setTipo] = useState('');
    const [emailExistente, setEmailExistente] = useState(false);

    function handleBackHome() {
        if (params.id) {
            navigate('/usuarios-cadastrados');
        } else {
            navigate('/home?is'+{userType: tipo}+'=true');
        }
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

        if (!params.id) {
            fetch('http://localhost:3001/pub/cadastrarUsuario', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(object),
            }).then(async (response) => {
                if (response.status === 500) {
                    setEmailExistente(true);
                } else {
                    setEmailExistente(false);
                    setSuccessMessage(true);
                    setTimeout(() => navigate('/home?is'+ userSession +'=true'), 3000);
                }
            });
        } else {
            fetch(`http://localhost:3001/pub/editarUsuario/${params.id}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(object),
            }).then(async (response) => {
                if (response.status === 500) {
                    setEmailExistente(true);
                } else {
                    setEmailExistente(false);
                    setSuccessMessage(true);
                    setTimeout(() => navigate('/usuarios-cadastrados'), 3000); 
                }
            });
        }
    }

    function updateInput(setState){        
        return (ev) => {
            setState(ev.target.value)
        }
    }

    useEffect(() => {
        if (params.id) {
            fetch(`http://localhost:3001/pub/visualizarUsuarios?id=${params.id}`, {
                method: 'GET',
                headers: {
                'content-type': 'application/json'
                },
            }).then(
                (resposta) => {
                    return resposta.json()
                }
            ).then(
                (retorno) => {
                    setNome(retorno.data.usuarios[0].nome);
                    setEmail(retorno.data.usuarios[0].email);
                    setTipo(retorno.data.usuarios[0].tipoDeUsuario);
                }
            )
        }
    }, [params.id])

    return (
        <div className='backgroundCadastro'>
            <form onSubmit={onSubmit}>
                <Box display='flex' justifyContent='center' style={{ width: '100%' }}>
                    <Paper elevation={3} sx={{ p: 3 }} style={{ width: '32rem' }}>
                        <Box component="h1" align="center" display='flex' justifyContent='center' flexDirection='column'>

                            {!params.id && (
                                <Typography variant='h4' component='h1' align='center'>
                                    Cadastro de Usuário
                                </Typography>
                            )}
                            {params.id && (
                                <Typography variant='h4' component='h1' align='center'>
                                    Edição de Usuário
                                </Typography>
                            )}
                            
                            <TextField
                                required
                                style={{marginTop: '1rem'}}
                                label="Nome completo"
                                name='nome'
                                value={nome}
                                onChange={updateInput(setNome)}                        
                            />

                            <TextField
                                required
                                style={{marginTop: '1rem'}}
                                label="E-mail"
                                name='email'
                                value={email}
                                onChange={updateInput(setEmail)}                        
                            />
                            
                            <FormControl
                                style={{marginTop: '1rem'}}
                                >
                                <InputLabel id="demo-simple-select-label">Tipo de usuário</InputLabel>
                                <Select
                                    required
                                    value={tipo}
                                    label="Tipo de usuário"
                                    name='tipoDeUsuario'
                                    onChange={updateInput(setTipo)}                        
                                >
                                    <MenuItem value="admin">Administrador</MenuItem>
                                    <MenuItem value="financeiro">Financeiro</MenuItem>
                                    <MenuItem value="instrumentador">Instrumentador</MenuItem>
                                </Select>
                            </FormControl>
                            
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

                            {emailExistente && (
                                <Box mt={2} width='100%'>
                                <Alert severity="error">
                                    <AlertTitle>Email já existente</AlertTitle>
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
                                        <AlertTitle> Salvo com sucesso! </AlertTitle>
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