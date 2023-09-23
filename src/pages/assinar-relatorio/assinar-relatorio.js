import { Box, Button, Paper, Typography, Grid } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import CanvasDraw from "react-canvas-draw";
import './assinar-relatorio.css';

const CardRelatorio = ({ relatorio, onClickAssinar }) => (
  <React.Fragment>
    <CardContent>
        <Grid container spacing={9}>
            <Grid item xs={4}>
                <Box>
                    <Typography variant="h5" component="div">
                        Consumo de material
                    </Typography>
                    <br />
                    {relatorio.RelatorioMaterials.map(item => (
                        <Typography>
                            Quantidade: {item.qtdMaterial}  <br />
                            Descrição: {item.Material.descricao} <br />
                            Referência: {item.referenciaMaterial} <br />
                            Lote: {item.loteMaterial} <br />
                        </Typography>
                    ))}
                </Box>
            </Grid>

            <Grid item xs={5}>
                <Box>
                    <Typography variant="h5" component="div">
                        Informações adicionais
                    </Typography>
                    <br/>
                    <Typography>
                        Hospital: {relatorio.hospital} <br/>
                        Médico: {relatorio.medico} <br/>
                        CRM: {relatorio.medicoCrm} <br/>
                        Paciente: {relatorio.nomePaciente} <br/>
                        Data e hora: {relatorio.data} <br/>
                        Instrumentador: {relatorio.instrumentador} <br/>
                        Convênio: {relatorio.convenio}
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    </CardContent>
    <CardActions>
        <Button
            onClick={onClickAssinar}
        >
            Assinar
        </Button>
    </CardActions>
  </React.Fragment>
);

function CadastroMedicos() {
    
    const navigate = useNavigate ();

    const session = JSON.parse(localStorage.getItem("user_session"));
    const userType = session.data.usuario.tipoDeUsuario;

    function handleBackHome() {
        navigate('/home?is'+{userType}+'=true');
    }
    const [relatorios, setRelatorios] = useState([])

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

    
    const [relatorioAssinar, setRelatorioAssinar] = useState(null)
    const assinaturaRef = useRef()
    function assinarRelatorio(relatorio) {
        setRelatorioAssinar(relatorio)
    }
    const [imagem, setImagem] = useState(null)
    async function confirmarAssinatura() {
        const dataUrl =  assinaturaRef.current.getDataURL()
        console.log('Salvar o seguinte valor no campo da assinatura no banco', dataUrl)
        setImagem(dataUrl)
    }

    return (
    <div className='backgroundAssinarRelatorio'>
        {imagem && <img src={imagem}/>}
        <Box display="flex" justifyContent="center" style={{ width: '100%' }}>
            
            <Paper elevation={3} sx={{ p: 7 }} style={{ width: '70%' }}>
                <Box display="flex" justifyContent="center" flexDirection="column">
                    <Typography variant="h4" component="h1" align="center">
                        Assinar Relatórios
                    </Typography>
                    {relatorioAssinar && (
                        <div>
                            <CanvasDraw hideGrid ref={assinaturaRef}/>
                            <Button onClick={confirmarAssinatura}>
                                Confirmar assinatura
                            </Button>
                        </div>
                        
                    )}

                    <br />

                    <Box sx={{ minWidth: 275 }}>
                        {relatorios.map(r => (
                            <Card>
                                <CardRelatorio onClickAssinar={() => assinarRelatorio(r)} relatorio={r}/>
                            </Card>
                        ))}
                        
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

export default CadastroMedicos;
