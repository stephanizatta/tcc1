import { Box, Button, Paper, Typography, Grid, Modal, Alert, AlertTitle, LinearProgress } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import CanvasDraw from "react-canvas-draw";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import './assinar-relatorio.css';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { fetchAutenticated } from '../../api';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

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
                            Médico: {relatorio.medico?.nome} <br/>
                            CRM: {relatorio.medicoCrm} <br/>
                            Paciente: {relatorio.nomePaciente} <br/>
                            Data: {relatorio.data.split('T')[0].split('-')[2] + '/' + relatorio.data.split('T')[0].split('-')[1] + '/' + relatorio.data.split('T')[0].split('-')[0]} <br/>
                            Hora: {relatorio.data.split('T')[1].split('.')[0].split(':')[0] + ':' + relatorio.data.split('T')[1].split('.')[0].split(':')[1]} <br/>
                            Instrumentador: {relatorio.instrumentador} <br/>
                            Convênio: {relatorio.convenio}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </CardContent>
        
        <CardActions>
            <Button startIcon={<BorderColorIcon />} onClick={onClickAssinar}>
                Assinar
            </Button>
        </CardActions>
  </React.Fragment>
);

function CadastroMedicos() {    
    const navigate = useNavigate ();
    const session = JSON.parse(localStorage.getItem("user_session"));
    const userType = session.data.usuario.tipoDeUsuario;
    const [successMessage, setSuccessMessage] = useState(false);

    const handleClose = () => setRelatorioAssinar(null)

    function handleBackHome() {
        navigate('/home?is'+{userType}+'=true');
    }

    const [relatorios, setRelatorios] = useState([]);

    useEffect(() => {
        fetchAutenticated('/api/visualizarRelatorios?assinatura=true', {
            method: 'GET',
            headers: {
            'content-type': 'application/json'
            },
        }).then(
            (resposta) => {
                return resposta.json();
            }
        ).then(
            (retorno) => {
                setRelatorios(retorno.data.relatorios);
            }
        )
    }, [])
    
    const [relatorioAssinar, setRelatorioAssinar] = useState(null);
    const assinaturaRef = useRef();

    function assinarRelatorio(relatorio) {
        setRelatorioAssinar(relatorio);
    }

    async function confirmarAssinatura() {
        const dataUrl =  assinaturaRef.current.getDataURL();

        fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/pub/assinarRelatorio/${relatorioAssinar.id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({dataUrl}),
        }).then(() => {        
            setRelatorioAssinar(null);
            setSuccessMessage(true);
            setTimeout(() => navigate('/home'), 3000); 
        });
    } 

    return (
        <div className='backgroundAssinarRelatorio'>
            <Box display="flex" justifyContent="center" style={{ width: '100%' }}>
            
                <Paper elevation={3} sx={{ p: 7 }} style={{ width: '70%' }}>
                    <Box display="flex" justifyContent="center" flexDirection="column">

                        <Typography variant="h4" component="h1" align="center">
                            Assinar Relatórios
                        </Typography>

                        <Modal
                            open={relatorioAssinar}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style} className='modal-assinatura'>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Cadastrar assinatura
                                </Typography>
                                <CanvasDraw className='modal-assinatura' lazyRadius='5' brushRadius='2' hideGrid ref={assinaturaRef}/>
                                
                                <Button startIcon={<CheckIcon />} onClick={confirmarAssinatura}> Confirmar </Button>
                                <Button startIcon={<CloseIcon />} onClick={handleClose}> Cancelar </Button>
                            </Box>
                        </Modal>

                        <br />

                        <Box>
                            <Grid container spacing={3}>
                                {relatorios.map(r => (
                                    <Grid item xs={12}>
                                        <Card>
                                            <CardRelatorio onClickAssinar={() => assinarRelatorio(r)} relatorio={r}/>
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

                        {successMessage && (
                            <Box mt={2} width='100%'>
                                <Alert severity="success">
                                    <AlertTitle> Assinado com sucesso! </AlertTitle>
                                    <LinearProgress color="success" size={24} />                                        
                                </Alert>
                            </Box>
                        )}
                    </Box>
                </Paper>
            </Box>
        </div>
    );
}

export default CadastroMedicos;
