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
    const [userType, setUserType] = useState('');
    const navigate = useNavigate ();
    const session = JSON.parse(localStorage.getItem("user_session"));
    const userSession = session.data.usuario.tipoDeUsuario;
    const [successMessage, setSuccessMessage] = useState(false);
    const [showAdditionalFields, setShowAdditionalFields] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const params = useParams();
    const [nomes, setNomes] = useState(['']);
    const [emails, setEmails] = useState(['']);
    const [assinaturas, setAssinaturas] = useState(['']);
    const [crms, setCrms] = useState(['']);

    const handleChange = (event) => {
        setUserType(event.target.value);
        setShowAdditionalFields(event.target.value === "medico");
    };

    function handleBackHome() {
        if (params.id) {
            navigate('/usuarios-cadastrados');
        } else {
            navigate('/home?is'+{userType}+'=true');
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
            }).then(() => {
                setSuccessMessage(true);
                setTimeout(() => navigate('/home?is'+ userSession +'=true'), 3000);
            });
        } else {
            fetch(`http://localhost:3001/pub/editarUsuario/${params.id}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(object),
            }).then(() => {
                setSuccessMessage(true); 
                setTimeout(() => navigate('/usuarios-cadastrados'), 3000); 
            });
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
                    setNomes([retorno.data.usuarios[0].nome]);
                    setEmails([retorno.data.usuarios[0].email]);
                    setAssinaturas([retorno.data.usuarios[0].assinaturaMedico]);
                    setCrms([retorno.data.usuarios[0].medicoCrm]);
                }
            )
        }
    }, [])

    return (
        <div className='backgroundCadastro'>
            <form onSubmit={onSubmit}>
                <Box display='flex' justifyContent='center' style={{ width: '100%' }}>
                    <Paper elevation={3} sx={{ p: 3 }} style={{ width: '32rem' }}>
                        <Box component="h1" align="center" display='flex' justifyContent='center' flexDirection='column'>

                            <Typography variant="h4" component="h1" align="center"> 
                                Cadastro de Usuário 
                            </Typography>

                            {nomes.map((nome) => (
                                <TextField
                                    required
                                    style={{marginTop: '1rem'}}
                                    label="Nome completo"
                                    name='nome'
                                    value={nome}                            
                                />
                            ))}

                            {emails.map((email) => (
                                <TextField
                                    required
                                    style={{marginTop: '1rem'}}
                                    label="E-mail"
                                    name='email'
                                    value={email}                            
                                />
                            ))}
                            
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
                                    {assinaturas.map((assinatura) => (
                                        <TextField
                                            required
                                            name="assinaturaMedico"
                                            style={{marginTop: '1rem' }}
                                            label="Assinatura"
                                            value={assinatura}
                                        />
                                    ))}

                                    {crms.map((cmr) => (
                                        <TextField
                                            required
                                            style={{marginTop: '1rem' }}
                                            label="CRM"
                                            type="text"
                                            name='medicoCrm'
                                            value={cmr}
                                        />
                                    ))}
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