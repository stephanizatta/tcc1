import './materiais-cadastrados.css';
import { Box, Button, Paper, Typography, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate, useParams } from 'react-router-dom';

function MateriaisCadastrados() {
    const navigate = useNavigate();
    const session = JSON.parse(localStorage.getItem("user_session"));
    const userType = session.data.usuario.tipoDeUsuario;
    const [materiais, setMateriais] = useState([]);
    const params = useParams();

   function handleBackHome() {
       navigate('/home?is'+{userType}+'=true');
   }

    function deleteMaterial(materialId) {
        fetch(`http://localhost:3001/pub/excluirMaterial/${materialId}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({}), 
        
        }).then(() => {
            fetch('http://localhost:3001/pub/visualizarMateriais', {
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
        fetch('http://localhost:3001/pub/visualizarMateriais', {
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
                setMateriais(retorno.data.materiais);
            }
        )
    }, [])

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
                                    <Grid item xs={4}>
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
                                                                onClick={() => deleteMaterial(material.id)}
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
    </div>
    );
}

export default MateriaisCadastrados;
