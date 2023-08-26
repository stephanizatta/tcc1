import './usuarios-cadastrados.css';
import { Box, Button, Paper, Typography, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from 'react-router-dom';

function UsuariosCadastrados() {
    const navigate = useNavigate();
    const session = JSON.parse(localStorage.getItem("user_session"));
    const userType = session.data.usuario.tipoDeUsuario;
    const [usuarios, setUsuarios] = useState([]);

   function handleBackHome() {
       navigate('/home?is'+{userType}+'=true');
   }

    function deleteUsuario(usuarioId) {
        fetch(`http://localhost:3001/pub/excluirUsuario/${usuarioId}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({}), 
        
        }).then(() => {
            fetch('http://localhost:3001/pub/visualizarUsuarios', {
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
        fetch('http://localhost:3001/pub/visualizarUsuarios', {
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
                                                    <Typography>
                                                        {usuario.nome} <br/>
                                                        Tipo: {usuario.tipoDeUsuario}
                                                    </Typography>

                                                    <Box ml='auto'>
                                                        <CardActions>
                                                            <Link to={"/cadastro-usuario/" + usuario.id}>
                                                                <Button startIcon={<EditIcon />} />
                                                            </Link>
                                                            <Button 
                                                                color='error' 
                                                                startIcon={<DeleteIcon />} 
                                                                onClick={() => deleteUsuario(usuario.id)}
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

export default UsuariosCadastrados;
