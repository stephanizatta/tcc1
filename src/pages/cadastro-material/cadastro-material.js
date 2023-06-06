import React, { useState } from 'react';
import { Box, Button, Paper, TextField, Typography, Alert, AlertTitle, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

function CadastroMaterial() {
    const [isMaterialCadastrado, setIsMaterialCadastrado] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const navigate = useNavigate ();
    const [descriptions, setDescriptions] = useState(['']);

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

    function handleOk() {  
        setIsMaterialCadastrado(true);
        setIsRedirecting(true);

        setTimeout(() => {
            window.location.href = '/home?isAdmin=true';
        }, 3000);
    }

    function handleBackHome() {
        navigate('/home?isAdmin=true');
    }

  return (
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

                <Button variant='text' onClick={handleAddDescription}>
                    Adicionar mais +
                </Button>

                <Box style={{ marginTop: '1rem' }}>
                    {isMaterialCadastrado && isRedirecting ? (
                        <Box display="flex" alignItems="center">
                            <Alert severity="success" style={{ marginRight: '1rem' }}>
                                <AlertTitle>Salvo com sucesso!</AlertTitle>
                            </Alert>
                            <CircularProgress color="primary" size={24} />
                        </Box>
                        ) : (
                        <>
                            <Button
                                color='primary'
                                variant='contained'
                                style={{ width: '7rem', marginRight: '1rem' }}
                                onClick={handleOk}
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
                        </>
                    )}
                </Box>

            </Box>
        </Paper>
    </Box>
  );
}

export default CadastroMaterial;
