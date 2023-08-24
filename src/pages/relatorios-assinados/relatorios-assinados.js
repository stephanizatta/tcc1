import { Box, Button, Paper, Typography, Grid } from '@mui/material';
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import './relatorios-assinados.css';

const card = (
  <React.Fragment>
    <CardContent>
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Box>
                    <Typography variant="h5" component="div">
                        Consumo de material
                    </Typography>
                    <br />
                    <Typography>
                        Quantidade: 5 <br />
                        Descrição: Parafuso tipo 4 <br />
                        Referência: 123456789 <br />
                        Lote: 1234
                    </Typography>
                    <br />
                    <Typography>
                        Quantidade: 2 <br />
                        Descrição: Placa aço tipo 1 <br />
                        Referência: 987654321 <br />
                        Lote: 4321
                    </Typography>
                </Box>
            </Grid>

            <Grid item xs={4}>
                <Box>
                    <Typography variant="h5" component="div">
                        Informações adicionais
                    </Typography>
                    <br/>
                    <Typography>
                        Hospital: Santa Isabel <br/>
                        Médico: Dra. Maria Pereira <br/>
                        CRM: CDE987654321 <br/>
                        Paciente: João da Silva <br/>
                        Data: 12/12/2023 <br/>
                        Hora: 08:15 <br/>
                        Instrumentador: Ana Francisca <br/>
                        Convênio: Unimed
                    </Typography>
                </Box>
            </Grid>

            <br/>

            <Grid item xs={4}>
                <Box>
                    <Typography variant="h5" component="div">
                        Assinatura
                    </Typography>
                    <br/>
                    <Typography>
                        Médico: Dra. Maria Pereira <br/>
                        CRM: CDE987654321 <br/>
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    </CardContent>
  </React.Fragment>
);

function RelatoriosAssinados() {
    const navigate = useNavigate ();
    const session = JSON.parse(localStorage.getItem("user_session"));
    const userType = session.data.usuario.tipoDeUsuario;

    function handleBackHome() {
        navigate('/home?is'+{userType}+'=true');
    }

    return (
    <div className='backgroundRelatoriosAssinados'>
        <Box display="flex" justifyContent="center" style={{ width: '100%' }}>
            <Paper elevation={3} sx={{ p: 3 }} style={{ width: '80%' }}>
                <Box display="flex" justifyContent="center" flexDirection="column">
                    <Typography variant="h4" component="h1" align="center">
                        Relatórios Assinados
                    </Typography>

                    <br />

                    <Box sx={{ minWidth: 275 }}>
                        <Card variant="outlined">{card}</Card>
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

export default RelatoriosAssinados;
