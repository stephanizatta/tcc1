import './usuarios-cadastrados.css';
import { Box, Button, Paper, Typography, Grid } from '@mui/material';
import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

function UsuariosCadastrados() {
    const navigate = useNavigate();
    const session = JSON.parse(localStorage.getItem("user_session"));
    const userType = session.data.user.userType;

    function handleBackHome() {
        navigate('/home?is'+{userType}+'=true');
    }
    return (
    <div className='backgroundUsuariosCadastrados'>
        <Box display='flex' justifyContent='center' style={{ width: '100%' }}>
            <Paper elevation={3} sx={{ p: 3 }} style={{ width: '90%' }}>
                <Box display='flex' justifyContent='center' flexDirection='column'>
                    <Typography variant='h4' component='h1' align='center'>
                        Usuários Cadastrados
                    </Typography>

                    <br />

                    <Box>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Card variant='outlined'>
                                    <CardContent>
                                        <Box display='flex' alignItems='center'>
                                            <Typography>
                                                Admin Orthodoc <br />
                                                Tipo: Adminsitrador
                                            </Typography>
                                            <Box ml='auto'>
                                                <CardActions>
                                                    <Button startIcon={<EditIcon />} />
                                                    <Button color='error' startIcon={<DeleteIcon />} />
                                                </CardActions>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={4}>
                                <Card variant='outlined'>
                                    <CardContent>
                                        <Box display='flex' alignItems='center'>
                                            <Typography>
                                                Ana Francisca <br />
                                                Tipo: Instrumentador
                                            </Typography>
                                            <Box ml='auto'>
                                                <CardActions>
                                                    <Button startIcon={<EditIcon />} />
                                                    <Button color='error' startIcon={<DeleteIcon />} />
                                                </CardActions>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={4}>
                                <Card variant='outlined'>
                                    <CardContent>
                                        <Box display='flex' alignItems='center'>
                                        <Typography>
                                            Bruna Meireles <br />
                                            Tipo: Instrumentador
                                        </Typography>
                                            <Box ml='auto'>
                                                <CardActions>
                                                    <Button startIcon={<EditIcon />} />
                                                    <Button color='error' startIcon={<DeleteIcon />} />
                                                </CardActions>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={4}>
                                <Card variant='outlined'>
                                    <CardContent>
                                        <Box display='flex' alignItems='center'>
                                            <Typography>
                                                Cristian Gonçalves <br />
                                                Tipo: Médico
                                            </Typography>
                                            <Box ml='auto'>
                                                <CardActions>
                                                    <Button startIcon={<EditIcon />} />
                                                    <Button color='error' startIcon={<DeleteIcon />} />
                                                </CardActions>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={4}>
                                <Card variant='outlined'>
                                    <CardContent>
                                        <Box display='flex' alignItems='center'>
                                            <Typography>
                                                Paulo Eduardo Muniz <br />
                                                Tipo: Médico
                                            </Typography>
                                            <Box ml='auto'>
                                                <CardActions>
                                                    <Button startIcon={<EditIcon />} />
                                                    <Button color='error' startIcon={<DeleteIcon />} />
                                                </CardActions>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={4}>
                                <Card variant='outlined'>
                                    <CardContent>
                                        <Box display='flex' alignItems='center'>
                                            <Typography>
                                                Fernanda dos Santos <br />
                                                Tipo: Instrumentador
                                            </Typography>
                                            <Box ml='auto'>
                                                <CardActions>
                                                    <Button startIcon={<EditIcon />} />
                                                    <Button color='error' startIcon={<DeleteIcon />} />
                                                </CardActions>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={4}>
                                <Card variant='outlined'>
                                    <CardContent>
                                        <Box display='flex' alignItems='center'>
                                            <Typography>
                                                Financeiro Orthodoc <br />
                                                Tipo: Financeiro
                                            </Typography>
                                            <Box ml='auto'>
                                                <CardActions>
                                                    <Button startIcon={<EditIcon />} />
                                                    <Button color='error' startIcon={<DeleteIcon />} />
                                                </CardActions>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={4}>
                                <Card variant='outlined'>
                                    <CardContent>
                                        <Box display='flex' alignItems='center'>
                                            <Typography>
                                                Leandro Albuquer <br />
                                                Tipo: Instrumentador
                                            </Typography>
                                            <Box ml='auto'>
                                                <CardActions>
                                                    <Button startIcon={<EditIcon />} />
                                                    <Button color='error' startIcon={<DeleteIcon />} />
                                                </CardActions>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={4}>
                                <Card variant='outlined'>
                                    <CardContent>
                                        <Box display='flex' alignItems='center'>
                                            <Typography>
                                                Monique Vaz <br />
                                                Tipo: Instrumentador
                                            </Typography>
                                            <Box ml='auto'>
                                                <CardActions>
                                                    <Button startIcon={<EditIcon />} />
                                                    <Button color='error' startIcon={<DeleteIcon />} />
                                                </CardActions>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={4}>
                                <Card variant='outlined'>
                                    <CardContent>
                                        <Box display='flex' alignItems='center'>
                                            <Typography>
                                                Pedro Heinz <br />
                                                Tipo: Instrumentador
                                            </Typography>
                                            <Box ml='auto'>
                                                <CardActions>
                                                    <Button startIcon={<EditIcon />} />
                                                    <Button color='error' startIcon={<DeleteIcon />} />
                                                </CardActions>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={4}>
                                <Card variant='outlined'>
                                    <CardContent>
                                        <Box display='flex' alignItems='center'>
                                            <Typography>
                                                Sara Munchen <br />
                                                Tipo: Instrumentador
                                            </Typography>
                                            <Box ml='auto'>
                                                <CardActions>
                                                    <Button startIcon={<EditIcon />} />
                                                    <Button color='error' startIcon={<DeleteIcon />} />
                                                </CardActions>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
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
