import './usuarios-cadastrados.css';
import { Box, Button, Paper, Typography, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

function UsuariosCadastrados() {
    const navigate = useNavigate();
    const session = JSON.parse(localStorage.getItem("user_session"));
    const userType = session.data.usuario.tipoDeUsuario;
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    async function getUsers() {
        try {const response = await fetch('http://localhost:3001/pub/visualizarUsuarios');
            const data = await response.json();
            setUsers(data); 
        } catch (error) {
            console.error('Erro');
        }
    }

    function handleBackHome() {
        navigate('/home?is' + userType + '=true');
    }

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
                                {users.map((user) => (
                                    <Grid item xs={4} key={user.id}>
                                        <Card variant='outlined'>
                                            <CardContent>
                                                <Typography>
                                                    Name: {user.name}
                                                </Typography>
                                                <Typography>
                                                    Email: {user.email}
                                                </Typography>
                                                <Box ml='auto'>
                                                    <CardActions>
                                                        <Button startIcon={<EditIcon />} />
                                                        <Button color='error' startIcon={<DeleteIcon />} />
                                                    </CardActions>
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
