import './esqueceu-senha.css';
import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';

function EsqueceuSenha() {
    function handleOk() {
        window.location.href = '/';
    }
    
    return (
        <div className='backgroundEsqueceuSenha'>
            <Box display='flex' justifyContent='center' style={{ width: '100%' }}>
                <Paper elevation={3} sx={{ p: 3 }} style={{ width: '30rem' }}>
                    <Box display='flex' justifyContent='center' flexDirection='column'>
                        <Typography variant="h4" component="h1" align="center">Esqueceu a senha?</Typography>
                        <br />
                        <Typography  component="h4" align="left">
                            Favor entrar em contato com o número (00) 0000-0000 ou 
                            e-mail orthodoc@orthodoc.com.br para a redefinição de senha.
                        </Typography>
                        <br/>
                        <Box display="flex" justifyContent="center">
                            <Button
                                color='primary'
                                variant='contained'
                                style={{ width: '7rem', marginRight: '10px' }}
                                onClick={handleOk}
                            >
                                OK
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </div>
    );
}

export default EsqueceuSenha;