import './materiais-cadastrados.css';
import { Box, Button, Paper, Typography, Grid } from '@mui/material';
import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

function MateriaisCadastrados() {
    const navigate = useNavigate();

    function handleBackHome() {
        navigate('/home?isAdmin=true');
    }

    return (
        <div className='backgroundMateriaisCadastrados'>
        <Box display='flex' justifyContent='center' style={{ width: '100%' }}>
            <Paper elevation={3} sx={{ p: 3 }} style={{ width: '90%' }}>
                    <Box display='flex' justifyContent='center' flexDirection='column'>
                        <Typography variant='h4' component='h1' align='center'>
                            Materiais Cadastrados
                        </Typography>

                        <br />

                        <Box>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Card variant='outlined'>
                                        <CardContent>
                                            <Box display='flex' alignItems='center'>
                                            <Typography>Serra titanium</Typography>
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
                                                <Typography>Alicate modelo 8</Typography>
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
                                                <Typography>Alicate modelo 1</Typography>
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
                                                <Typography>Parafuso Cortical</Typography>
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
                                                <Typography>Placa bloqueada</Typography>
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
                                                <Typography>Placa em ponte</Typography>
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
                                                <Typography>Haste flexível</Typography>
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
                                                <Typography>Parafuso tipo 4</Typography>
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

export default MateriaisCadastrados;
