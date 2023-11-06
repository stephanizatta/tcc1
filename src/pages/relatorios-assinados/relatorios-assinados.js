import { Box, Button, Paper, Typography, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import './relatorios-assinados.css';
import { fetchAutenticated } from '../../api';

function RelatoriosAssinados() {
    const navigate = useNavigate();
    const session = JSON.parse(localStorage.getItem("user_session"));
    const userType = session.data.usuario.tipoDeUsuario;
    const [relatorios, setRelatorios] = useState([]);

    function handleBackHome() {
        navigate('/home?is'+{userType}+'=true');
    }

    useEffect(() => {
        fetchAutenticated('/api/visualizarRelatorios', {
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
                setRelatorios(retorno.data.relatorios);
            }
        )
    }, [])

    return (
    <div className='backgroundRelatoriosAssinados'>
        <Box display="flex" justifyContent="center" style={{ width: '100%' }}>
            <Paper elevation={3} sx={{ p: 3 }} style={{ width: '80%' }}>
                <Box display="flex" justifyContent="center" flexDirection="column">
                    <Typography variant="h4" component="h1" align="center">
                        Relatórios Assinados
                    </Typography>

                    <br />

                    <Box>
                        <Grid container>
                            {relatorios.map(relatorio => (
                                <Grid style={{marginRight: '15px' }}>
                                    {relatorio.assinaturaMedico !== null && (
                                        <Card variant='outlined'>
                                            <CardContent>
                                                <Box>                                               
                                                    <br />
                                                    <Typography>
                                                        <Typography>
                                                            <h2>Consumo de Material</h2>
                                                            {relatorio.RelatorioMaterials.map(item => (
                                                                <>
                                                                    Descrição: {item.Material.descricao} <br />
                                                                    Quantidade: {item.qtdMaterial}  <br />                                                                
                                                                    Referência: {item.referenciaMaterial} <br />
                                                                    Lote: {item.loteMaterial} <br />
                                                                    <br />
                                                                </>
                                                            ))}

                                                            <h2>Informações Adicionais</h2>                                                            
                                                            Hospital: {relatorio.hospital} <br/>
                                                            Paciente: {relatorio.nomePaciente} <br/>
                                                            Data: {relatorio.data.split('T')[0].split('-')[2] + '/' + relatorio.data.split('T')[0].split('-')[1] + '/' + relatorio.data.split('T')[0].split('-')[0]} <br/>
                                                            Hora: {relatorio.data.split('T')[1].split('.')[0].split(':')[0] + ':' + relatorio.data.split('T')[1].split('.')[0].split(':')[1]} <br/>
                                                            Instrumentador: {relatorio.instrumentador} <br/>
                                                            Convênio: {relatorio.convenio} <br/>

                                                            <h2>Assinatura</h2>                                                            
                                                            Médico: {relatorio.medico.nome} <br/>
                                                            CRM: {relatorio.medicoCrm} <br/>
                                                            {relatorio.assinaturaMedico && <img alt="Assinatura" src={relatorio.assinaturaMedico}/>}
                                                        </Typography>
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    )}
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

export default RelatoriosAssinados;
