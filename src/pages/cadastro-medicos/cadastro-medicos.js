import { Box, Button, LinearProgress, Modal, Paper, TextField, Tooltip, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CanvasDraw from "react-canvas-draw";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function CadastroMedicos() {
    const navigate = useNavigate ();
    const [successMessage, setSuccessMessage] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [crm, setCrm] = useState('');
    const [tipo, setTipo] = useState('');
    const params = useParams();
    const [assinaturaPreenchida, setAssinaturaPreenchida] = useState(false);

    function handleBackHome() {
        if (params.id) {
            navigate('/usuarios-cadastrados');
        } else {
            navigate('/');
        }
    }

    function onSubmit(event){
        event.preventDefault();

        const data = new FormData(event.target);
        var object = {};
        data.forEach((value, key) => object[key] = value);

        object.assinaturaMedico = assinatura;

        if (object.senha !== object.repitaSenha) {
            setPasswordsMatch(false);
            return;
        }

        if (!assinaturaPreenchida) {
            setAssinaturaPreenchida(false);
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
                setTimeout(() => navigate('/'), 3000);
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

    function updateInput(setState){        
        return (ev) => {
            setState(ev.target.value)
        }
    }

    const assinaturaRef = useRef();
    const [assinatura, setAssinatura] = useState();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function confirmar() {
        setAssinatura(assinaturaRef.current.getDataURL());
        setAssinaturaPreenchida(true);
        handleClose();
    }

    function assinar() {
        handleOpen(true);
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
                    setAssinatura(retorno.data.usuarios[0].assinaturaMedico);
                    setCrm(retorno.data.usuarios[0].medicoCrm);
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
                                    Cadastro de Médico
                                </Typography>
                            )}
                            {params.id && (
                                <Typography variant='h4' component='h1' align='center'>
                                    Edição de Médico
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
                            
                            {params.id && (
                                <FormControl style={{marginTop: '1rem'}}>
                                    <InputLabel id="demo-simple-select-label">Tipo de usuário</InputLabel>
                                    <Tooltip title="Não é possível a edição do tipo de usuário 'Médico'">
                                        <Select
                                            disabled
                                            value={tipo}
                                            label="Tipo de usuário"
                                            name='tipoDeUsuario'
                                            onChange={updateInput(setTipo)}>

                                            <MenuItem value="medico">Médico</MenuItem>
                                        </Select>
                                    </Tooltip>
                                </FormControl>
                            )}
                            {!params.id && (
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
                            )}

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

                            {!assinaturaPreenchida && (
                                <Box mt={2} width='100%'>
                                    <Alert severity="error">
                                        <AlertTitle>Cadastre a assinatura</AlertTitle>
                                    </Alert>
                                </Box>
                            )}

                            <div>
                                {params.id && (
                                    <Tooltip title="Não é possível a edição de assinatura">
                                        <span>
                                            <Button 
                                                disabled 
                                                startIcon={<BorderColorIcon />}>
                                                Cadastrar Assinatura 
                                            </Button>
                                        </span>
                                    </Tooltip>
                                )}
                                {!params.id && (
                                    <Button 
                                        startIcon={<BorderColorIcon />} 
                                        onClick={assinar}> 
                                        Cadastrar Assinatura 
                                    </Button>
                                )}

                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            Cadastrar assinatura
                                        </Typography>
                                        <CanvasDraw lazyRadius='20' brushRadius='5' hideGrid ref={assinaturaRef}/>
                                        
                                        <Button startIcon={<CheckIcon />} onClick={confirmar}> Confirmar </Button>
                                        <Button startIcon={<CloseIcon />} onClick={handleClose}> Cancelar </Button>
                                    </Box>
                                </Modal>
                            </div>    
                            
                                         
                            
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