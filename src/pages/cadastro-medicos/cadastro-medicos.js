import { Box, Button, LinearProgress, Paper, TextField, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function CadastroMedicos() {
    const navigate = useNavigate ();
    const session = JSON.parse(localStorage.getItem("user_session"));
    const userSession = session.data.usuario.tipoDeUsuario;
    const [successMessage, setSuccessMessage] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const params = useParams();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [assinatura, setAssinatura] = useState('');
    const [crm, setCrm] = useState('');
    const [tipo, setTipo] = useState('');

    function handleBackHome() {
        navigate('/');
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
            setSuccessMessage(true);
            setTimeout(() => navigate('/'), 3000);
        });
    }

    function updateInput(setState){        
        return (ev) => {
            setState(ev.target.value)
        }
    }

    return (
        <div className='backgroundCadastro'>
            <form onSubmit={onSubmit}>
                <Box display='flex' justifyContent='center' style={{ width: '100%' }}>
                    <Paper elevation={3} sx={{ p: 3 }} style={{ width: '32rem' }}>
                        <Box component="h1" align="center" display='flex' justifyContent='center' flexDirection='column'>

                            <Typography variant='h4' component='h1' align='center'>
                                Cadastro de Médico
                            </Typography>
                            
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
                            
                            <FormControl style={{marginTop: '1rem'}}>
                                <InputLabel id="demo-simple-select-label">Tipo de usuário</InputLabel>
                                <Select
                                    required
                                    value={tipo}
                                    label="Tipo de usuário"
                                    name='tipoDeUsuario'
                                    onChange={updateInput(setTipo)}>
                                    
                                    <MenuItem value="medico">Médico</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                required
                                name="assinaturaMedico"
                                style={{marginTop: '1rem' }}
                                label="Assinatura"
                                value={assinatura}
                                onChange={updateInput(setAssinatura)}                        
                            />
                            <TextField
                                required
                                style={{marginTop: '1rem' }}
                                label="CRM"
                                type="text"
                                name='medicoCrm'
                                value={crm}
                                onChange={updateInput(setCrm)}                        
                            />
                                                         
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

export default CadastroMedicos;