import './relatorios-cadastrados.css';
import { Box, Button, Paper, Typography, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from 'react-router-dom';

function RelatoriosCadastrados() {
    const navigate = useNavigate();
    const session = JSON.parse(localStorage.getItem("user_session"));
    const userType = session.data.usuario.tipoDeUsuario;
    const [relatorios, setRelatorios] = useState([]);

   function handleBackHome() {
       navigate('/home?is'+{userType}+'=true');
   }

    function deleteRelatorio(relatorioId) {
        fetch(`http://localhost:3001/pub/excluirUsuario/${relatorioId}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({}), 
        
        }).then(() => {
            fetch('http://localhost:3001/pub/visualizarRelatorios', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                },
            }).then((resposta) => resposta.json())
              .then((retorno) => {
                  setRelatorios(retorno.data.relatorios);
              });
        });
    }

    useEffect(() => {
        fetch('http://localhost:3001/pub/visualizarRelatorios', {
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
        <div className='backgroundRelatoriosCadastrados'>
        <Box display='flex' justifyContent='center' style={{ width: '100%' }}>
            <Paper elevation={3} sx={{ p: 3 }} style={{ width: '80%' }}>
                    <Box display='flex' justifyContent='center' flexDirection='column'>
                        <Typography variant='h4' component='h1' align='center'>
                            Relatórios Cadastrados
                        </Typography>

                        <br />

                        <Box>
                            <Grid container spacing={2}>
                                {relatorios.map(relatorio => (
                                    <Grid item xs={12}>
                                        <Card variant='outlined'>
                                            <CardContent>
                                                <Box display='flex' alignItems='center'>
                                                    <Typography>
                                                        {relatorio.RelatorioMaterials.map(item => (
                                                            <>
                                                                Quantidade: {item.qtdMaterial}  <br />
                                                                Descrição: {item.Material.descricao} <br />
                                                                Referência: {item.referenciaMaterial} <br />
                                                                Lote: {item.loteMaterial} <br />
                                                            </>
                                                        ))}

                                                        Hospital: {relatorio.hospital} <br/>
                                                        Médico: {relatorio.medico} <br/>
                                                        CRM: {relatorio.medicoCrm} <br/>
                                                        Paciente: {relatorio.nomePaciente} <br/>
                                                        Data e hora: {relatorio.data} <br/>
                                                        Instrumentador: {relatorio.instrumentador} <br/>
                                                        Convênio: {relatorio.convenio}
                                                    </Typography>

                                                    <Box ml='auto'>
                                                        <CardActions>
                                                            <Link to={"/cadastro-relatorio/" + relatorio.id}>
                                                                <Button startIcon={<EditIcon />} />
                                                            </Link>
                                                            <Button 
                                                                color='error' 
                                                                startIcon={<DeleteIcon />} 
                                                                onClick={() => deleteRelatorio(relatorio.id)}
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

export default RelatoriosCadastrados;
