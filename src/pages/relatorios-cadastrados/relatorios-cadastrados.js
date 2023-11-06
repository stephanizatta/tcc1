import './relatorios-cadastrados.css';
import { Box, Button, Paper, Typography, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import { fetchAutenticated } from '../../api';

function RelatoriosCadastrados() {
    const navigate = useNavigate();
    const session = JSON.parse(localStorage.getItem("user_session"));
    const userType = session.data.usuario.tipoDeUsuario;
    const [relatorios, setRelatorios] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [idSelecionado, setIdSelecionado] = useState('');

    function handleOpen(id) {
        setIdSelecionado(id);
        setOpen(true);
    }

    const handleClose = () => {
        setIdSelecionado('');
        setOpen(false);
    };


   function handleBackHome() {
       navigate('/home?is'+{userType}+'=true')
   }

    function deleteRelatorio(relatorioId) {
        handleClose();

        fetch(`http://localhost:3001/pub/excluirRelatorio/${relatorioId}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({}),        
        }).then(() => {
            setRelatorios((prevRelatorios) =>
              prevRelatorios.filter((relatorio) => relatorio.id !== relatorioId)
            );
        });
    }

    useEffect(() => {
        fetchAutenticated('/api/visualizarRelatorios', {
            method: 'GET',
            headers: {
              'content-type': 'application/json'
            },
        }).then((resposta) => resposta.json())
        .then((retorno) => {
          setRelatorios(retorno.data.relatorios);
        })
        .catch((error) => {
          console.error('Error fetching reports:', error);
        });
    }, [])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: '5px',
    };

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
                                                                Descrição: {item.Material.descricao} <br />
                                                                Quantidade: {item.qtdMaterial}  <br />                                                                
                                                                Referência: {item.referenciaMaterial} <br />
                                                                Lote: {item.loteMaterial} <br />
                                                                <br />
                                                            </>
                                                        ))}

                                                        Hospital: {relatorio.hospital} <br/>
                                                        Médico: {relatorio.medico?.nome} <br/>
                                                        CRM: {relatorio.medicoCrm} <br/>
                                                        Paciente: {relatorio.nomePaciente} <br/>
                                                        Data: {relatorio.data.split('T')[0].split('-')[2] + '/' + relatorio.data.split('T')[0].split('-')[1] + '/' + relatorio.data.split('T')[0].split('-')[0]} <br/>
                                                        Hora: {relatorio.data.split('T')[1].split('.')[0].split(':')[0] + ':' + relatorio.data.split('T')[1].split('.')[0].split(':')[1]} <br/>
                                                        Instrumentador: {relatorio.instrumentador} <br/>
                                                        Convênio: {relatorio.convenio} <br/>
                                                        Assinatura do médico: <br/>
                                                        {relatorio.assinaturaMedico && <img alt="Assinatura" src={relatorio.assinaturaMedico}/>}
                                                    
                                                        {!relatorio.assinaturaMedico && (
                                                            <Typography variant='h6' component='h6' align='center'>
                                                                Relatório ainda não assinado
                                                            </Typography>
                                                        )}
                                                        
                                                    </Typography>

                                                    <Box ml='auto'>
                                                        <CardActions>
                                                            <Link to={"/cadastro-relatorio/" + relatorio.id}>
                                                                <Button startIcon={<EditIcon />} />
                                                            </Link>
                                                            <Button 
                                                                color='error' 
                                                                startIcon={<DeleteIcon />}
                                                                onClick={() => handleOpen(relatorio.id)}
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
            {open && (
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-title" variant="h6" component="h2">
                            Confirmar exclusão
                        </Typography>
                        <Typography id="modal-description" sx={{ marginTop: '1rem' }}>
                            Tem certeza de que deseja excluir este material?
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem' }}>
                            <Button variant="contained" color="primary" onClick={() => deleteRelatorio(idSelecionado)}>
                                Confirmar
                            </Button>
                            <Button variant="contained" color="error" onClick={handleClose}>
                                Cancelar
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            )}
        </div>
    );
}

export default RelatoriosCadastrados;
