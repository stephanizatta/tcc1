import './cadastro-material.css';
import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, TextField, Typography, Alert, AlertTitle, LinearProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router-dom';

function CadastroMaterial() {
    const navigate = useNavigate ();
    const [descriptions, setDescriptions] = useState(['']);
    const [successMessage, setSuccessMessage] = useState(false);
    const session = JSON.parse(localStorage.getItem("user_session"));
    const userType = session.data.usuario.tipoDeUsuario;
    const userSession = session.data.usuario.tipoDeUsuario;
    const params = useParams();

    const handleAddDescription = () => {
        setDescriptions([...descriptions, '']);
    };

    const handleDeleteDescription = (index) => {
        const updatedDescriptions = [...descriptions];
        
        updatedDescriptions.splice(index, 1);
        setDescriptions(updatedDescriptions);
    };

    const handleDescriptionChange = (index, value) => {
        const updatedDescriptions = [...descriptions];

        updatedDescriptions[index] = value;
        setDescriptions(updatedDescriptions);
    };

    function handleBackHome() {
        if (params.id) {
            navigate('/materiais-cadastrados');
        } else {
            navigate('/home?is'+{userType}+'=true');
        }
    }

    function onSubmit(event) {
        event.preventDefault();
    
        const data = new FormData(event.target);
        var object = {};
        data.forEach((value, key) => object[key] = value);
    
        if (!params.id) {
            fetch('http://localhost:3001/pub/cadastrarMaterial', {
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
            fetch(`http://localhost:3001/pub/editarMaterial/${params.id}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(object),
            }).then(() => {
                setSuccessMessage(true); 
                setTimeout(() => navigate('/home?is'+ userSession +'=true'), 3000); 
            });
        }
    }
    

    useEffect(() => {
        if (params.id) {
            fetch(`http://localhost:3001/pub/visualizarMateriais?id=${params.id}`, {
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
                    setDescriptions([retorno.data.materiais[0].descricao]);
                }
            )
        }
    }, [params.id])

    return (
        <div className='backgroundCadastroMateriais'>´
            <form onSubmit={onSubmit}>
                <Box display='flex' justifyContent='center' style={{ width: '100%' }}>
                    <Paper elevation={3} sx={{ p: 3 }} style={{ width: '30rem' }}>
                        <Box display='flex' justifyContent='center' flexDirection='column'>
                            <Typography variant='h4' component='h1' align='center'>
                                Cadastro de Material
                            </Typography>

                            <br />

                            {descriptions.map((description, index) => (
                                <Box key={index} display='flex' alignItems='center'>
                                    <TextField
                                        style={{ marginTop: '1rem', width: '100%' }}
                                        label='Descrição'
                                        type='text'
                                        value={description}
                                        name='descricao'
                                        onChange={(e) => handleDescriptionChange(index, e.target.value)}
                                    />
                                    {index > 0 && (
                                        <Button
                                            variant='text'
                                            color='error'
                                            onClick={() => handleDeleteDescription(index)}
                                            style={{ marginLeft: '0.5rem', marginTop: '1rem' }}
                                            startIcon={<DeleteIcon />}
                                            >
                                            Excluir
                                        </Button>
                                    )}
                                </Box>
                            ))}

                            {!params.id && (
                                <Button variant='text' onClick={handleAddDescription}>
                                    Adicionar mais +
                                </Button>
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
                                {successMessage && (
                                    <Box mt={2} width='100%'>
                                        <Alert severity="success">
                                            <AlertTitle> Salvo com sucesso! </AlertTitle>
                                            <LinearProgress color="success" size={24} />                                        
                                        </Alert>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </form>
        </div>
    );
}

export default CadastroMaterial;
