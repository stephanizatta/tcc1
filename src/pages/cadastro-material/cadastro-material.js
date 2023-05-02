import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';

function CadastroMaterial() {
    return(
        <Box display='flex' justifyContent='center' style={{ width: '100%' }}>
            <Paper elevation={3} sx={{ p: 3 }} style={{ width: '30rem' }}>
                <Box display='flex' justifyContent='center' flexDirection='column'>
                    <Typography variant="h4" component="h1" align="center">
                        Cadastro de Material
                    </Typography>
                    <br/>
                    
                    <TextField
                        required
                        style={{marginTop: '1rem' }}
                        label="Descrição"
                        type="text"
                    />
                    <Button
                        variant='text'
                    >
                        Adicionar mais +
                    </Button>

                    <Box style={{ marginTop: '1rem' }}>                        
                        <Link to='/home' align='center'>
                            <Button
                                color='primary'
                                variant='contained'
                                style={{ width: '7rem', marginRight: '1rem' }}
                            >
                                Ok
                            </Button>
                        </Link>
                        <Link to='/home' align='center'>
                            <Button
                                color='primary'
                                variant='contained'
                                style={{ width: '7rem' }}
                            >
                                Voltar
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

export default CadastroMaterial;