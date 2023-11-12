import './materiais-cadastrados.css';
import { Box, Button, Paper, Typography, Grid, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from 'react-router-dom';

function MateriaisCadastrados() {
    const navigate = useNavigate();
    const session = JSON.parse(localStorage.getItem("user_session"));
    const userType = session.data.usuario.tipoDeUsuario;
    const [materiais, setMateriais] = useState([]);
    const [open, setOpen] = useState(false);
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
        navigate('/home?is' + userType + '=true');
    }

    function deleteMaterial(materialId) {
        handleClose();

        fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/pub/excluirMaterial/${materialId}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({}),
        }).then(() => {
            fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/pub/visualizarMateriais`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                },
            }).then((resposta) => resposta.json())
                .then((retorno) => {
                    setMateriais(retorno.data.materiais);
                });
        });
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/pub/visualizarMateriais`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        }).then(
            (resposta) => resposta.json()
        ).then(
            (retorno) => {
                setMateriais(retorno.data.materiais);
            }
        )
    }, []);

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
        <div className='backgroundMateriaisCadastrados'>
            <Box display='flex' justifyContent='center' style={{ width: '100%' }}>
                <Paper elevation={3} sx={{ p: 3 }} style={{ width: '80%' }}>
                    <Box display='flex' justifyContent='center' flexDirection='column'>
                        <Typography variant='h4' component='h1' align='center'>
                            Materiais Cadastrados
                        </Typography>

                        <br />

                        <Box>
                            <Grid container spacing={2}>
                                {materiais.map(material => (
                                    <Grid item xs={4} key={material.id}>
                                        <Card variant='outlined'>
                                            <CardContent>
                                                <Box display='flex' alignItems='center'>
                                                    <Typography>{material.descricao}</Typography>
                                                    <Box ml='auto'>
                                                        <CardActions>
                                                            <Link to={"/cadastro-material/" + material.id}>
                                                                <Button startIcon={<EditIcon />} />
                                                            </Link>
                                                            <Button
                                                                color='error'
                                                                startIcon={<DeleteIcon />}
                                                                onClick={() => handleOpen(material.id)}
                                                            />
                                                        </CardActions>
                                                    </Box>
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
                        Tem certeza de que deseja excluir este material?
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem' }}>
                        <Button variant="contained" color="primary" onClick={() => deleteMaterial(idSelecionado)}>
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

export default MateriaisCadastrados;
