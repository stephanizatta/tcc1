import './usuarios-cadastrados.css';
import { Box, Button, Paper, Typography, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';

function UsuariosCadastrados() {
    const navigate = useNavigate();
    const session = JSON.parse(localStorage.getItem("user_session"));
    const userType = session.data.usuario.tipoDeUsuario;
    const [usuarios, setUsuarios] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [idSelecionado, setIdSelecionado] = useState('');

    function handleOpen(id) {
        setIdSelecionado(id);
        setOpen(true);
    }

    const handleClose = () => {
        setIdSelecionado('');
        setOpen(false);
    };

   function handleBackHome() {
       navigate('/home?is'+{userType}+'=true');
   }

    function deleteUsuario(usuarioId) {
        handleClose();

        fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/pub/excluirUsuario/${usuarioId}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({}), 
        
        }).then(() => {
            fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/pub/visualizarUsuarios`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                },
            }).then((resposta) => resposta.json())
              .then((retorno) => {
                  setUsuarios(retorno.data.usuarios);
              });
        });
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/pub/visualizarUsuarios`, {
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
                setUsuarios(retorno.data.usuarios);
            }
        )
    }, [])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: '5px',
    };

    return (
        <div className='backgroundUsuariosCadastrados'>
        <Box display='flex' justifyContent='center' style={{ width: '100%' }}>
            <Paper elevation={3} sx={{ p: 3 }} style={{ width: '80%' }}>
                    <Box display='flex' justifyContent='center' flexDirection='column'>
                        <Typography variant='h4' component='h1' align='center'>
                            Usuários Cadastrados
                        </Typography>

                        <br />

                        <Box>
                            <Grid container spacing={2}>
                                {usuarios.map(usuario => (
                                    <Grid item xs={4}>
                                        <Card variant='outlined'>
                                            <CardContent>
                                                <Box display='flex' alignItems='center'>
                                                    {usuario.tipoDeUsuario !== "medico" && (
                                                        <Typography>
                                                            {usuario.nome} <br/>
                                                            {usuario.email} <br/>
                                                            Tipo: {usuario.tipoDeUsuario}
                                                        </Typography>
                                                    )}

                                                    {usuario.tipoDeUsuario === "medico" && (
                                                        <Typography>
                                                            {usuario.nome} <br/>
                                                            {usuario.email} <br/>
                                                            Tipo: {usuario.tipoDeUsuario} <br/>                                                            
                                                            Assinatura: <br/>
                                                            {usuario.assinaturaMedico && <img alt="Assinatura" src={usuario.assinaturaMedico}/>}
                                                        </Typography>
                                                    )}

                                                    {usuario.tipoDeUsuario !== "admin" && (
                                                        <Box ml='auto'>
                                                            <CardActions>
                                                                {usuario.tipoDeUsuario !== "medico" && (
                                                                    <Link to={"/cadastro-usuario/" + usuario.id}>
                                                                        <Button startIcon={<EditIcon />} />
                                                                    </Link>
                                                                )}  
                                                                {usuario.tipoDeUsuario === "medico" && (
                                                                    <Link to={"/cadastro-medicos/" + usuario.id}>
                                                                        <Button startIcon={<EditIcon />} />
                                                                    </Link>
                                                                )}

                                                                <Button 
                                                                    color='error' 
                                                                    startIcon={<DeleteIcon />} 
                                                                    onClick={() => handleOpen(usuario.id)}
                                                                />
                                                            </CardActions>
                                                        </Box>
                                                    )}
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Box>

                    <Box>
                    <Button
                        color='primary'
                        variant='contained'
                        style={{ width: '7rem', marginTop: '1rem' }}
                        onClick={handleBackHome}
                    >
                        Voltar
                    </Button>
                </Box>
            </Paper>
        </Box>

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-title" variant="h6" component="h2">
                    Confirmar exclusão
                </Typography>
                <Typography id="modal-description" sx={{ marginTop: '1rem' }}>
                    Tem certeza de que deseja excluir este usuário?
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem' }}>
                    <Button variant="contained" color="primary" onClick={() => deleteUsuario(idSelecionado)}>
                        Confirmar
                    </Button>
                    <Button variant="contained" color="error" onClick={handleClose}>
                        Cancelar
                    </Button>
                </Box>
            </Box>
        </Modal>
    </div>
    );
}

export default UsuariosCadastrados;
