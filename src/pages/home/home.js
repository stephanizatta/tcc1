import './home.css';
import React from 'react';
import { Box, Button, Divider, Paper, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

function Home() {
    const location = useLocation();
    const isAdmin = new URLSearchParams(location.search).get('isAdmin') === 'true';
    const isInstrumentador = new URLSearchParams(location.search).get('isInstrumentador') === 'true';
    const isMedico = new URLSearchParams(location.search).get('isMedico') === 'true';
    const isFinanceiro = new URLSearchParams(location.search).get('isFinanceiro') === 'true';

    function handleLogout() {
        window.location.href = '/';
    }
  
    return (
        <div className='backgroundHome'>
            <Box display='flex' justifyContent='center' style={{ width: '100%' }}>
                <Paper elevation={3} sx={{ p: 3 }} style={{ width: '30rem' }}>
                    <Box display='flex' justifyContent='center' flexDirection='column'>
                        <Typography variant="h4" component="h1" align="center">
                            Bem-vindo,
                            <br/>
                            escolha uma opção
                        </Typography>

                        <br/>

                        {isAdmin && (
                        <React.Fragment>
                            <Link align='center'>
                                <Button variant='text'>
                                    Criar, Editar e Excluir Relatório
                                </Button>
                            </Link>
                            <Link to='/cadastro-relatorio' align='center'>
                                <Button variant='text'>
                                    Ver Relatórios Cadastrados
                                </Button>
                            </Link>
                            <Divider/>
                            <Link align='center'>
                                <Button variant='text'>
                                    Criar, Editar e Excluir Materiais
                                </Button>
                            </Link>
                            <Link to='/cadastro-material' align='center'>
                                <Button variant='text'>
                                    Ver Materiais Cadastrados
                                </Button>
                            </Link>
                            <Divider/>
                            <Link align='center'>
                                <Button variant='text'>
                                    Criar, Editar e Excluir Usuários
                                </Button>
                            </Link>
                            <Link to='/cadastro-medico' align='center'>
                                <Button variant='text'>
                                    Ver Usuários Cadastrados
                                </Button>
                            </Link>
                        </React.Fragment>
                        )}

                        {isInstrumentador && (
                        <React.Fragment>
                            <Link align='center'>
                                <Button variant='text'>
                                    Criar, Editar e Excluir Relatório
                                </Button>
                            </Link>
                            <Link to='/cadastro-relatorio' align='center'>
                                <Button variant='text'>
                                    Ver Relatórios Cadastrados
                                </Button>
                            </Link>
                            <Divider/>
                            <Link align='center'>
                                <Button variant='text'>
                                    Criar, Editar e Excluir Materiais
                                </Button>
                            </Link>
                            <Link to='/cadastro-material' align='center'>
                                <Button variant='text'>
                                    Ver Materiais Cadastrados
                                </Button>
                            </Link>
                            <Divider/>
                            <Link align='center'>
                                <Button variant='text'>
                                    Criar, Editar e Excluir Médicos
                                </Button>
                            </Link>
                            <Link to='/cadastro-medico' align='center'>
                                <Button variant='text'>
                                    Ver Usuários Cadastrados
                                </Button>
                            </Link>
                        </React.Fragment>
                        )}

                        {isMedico && (
                        <React.Fragment>
                            <Link align='center'>
                                <Button variant='text'>
                                    Ver Relatórios Assinados
                                </Button>
                            </Link>
                            <Divider/>
                            <Link align='center'>
                                <Button variant='text'>
                                    Assinar Relatório
                                </Button>
                            </Link>
                        </React.Fragment>
                        )}

                        {isFinanceiro && (
                        <React.Fragment>                            
                            <Link to='/cadastro-relatorio' align='center'>
                                <Button variant='text'>
                                    Ver Relatórios Cadastrados
                                </Button>
                            </Link>
                            <Divider/>                             
                            <Link to='/cadastro-medico' align='center'>
                                <Button variant='text'>
                                    Aprovar Relatório
                                </Button>
                            </Link>
                        </React.Fragment>
                        )}

                        <br/>
                        <Box display="flex" justifyContent="center">                      
                            <Button
                                color='primary' variant='contained' 
                                style={{ width: '7rem'}}
                                onClick={handleLogout}
                            >
                                Sair
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </div>
    );
}

export default Home;