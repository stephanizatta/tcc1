import './esqueceu-senha.css';
import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function EsqueceuSenha() {
    return (
        <div className='backgroundEsqueceuSenha'>
        <Box display='flex' justifyContent='center' style={{ width: '100%' }}>
            <Paper elevation={3} sx={{ p: 3 }} style={{ width: '30rem' }}>
                <Box display='flex' justifyContent='center' flexDirection='column'>
                    <Typography variant="h4" component="h1" align="center">Redefinir senha</Typography>
                    <br />
                    <Typography  component="h4" align="left">
                        Um e-mail foi enviado para a sua caixa de entrada para realizar a
                        redefinição de senha.
                    </Typography>
                    <br/>
                    <Box>
                        <Link to='/'>
                            <Button
                                color='primary'
                                variant='contained'
                                style={{ width: '7rem', marginRight: '10px' }}
                            >
                                OK
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Box>
        </div>
    );
}

export default EsqueceuSenha;