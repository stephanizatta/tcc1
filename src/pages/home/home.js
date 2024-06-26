import './home.css';
import React from 'react';
import { Box, Button, Divider, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
    const session = JSON.parse(localStorage.getItem("user_session"));
    const userType = session.data.usuario.tipoDeUsuario;

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

                        {userType === "admin" && (
                        <React.Fragment>
                            <Link to='/cadastro-relatorio' align='center'>
                                <Button variant='text'>
                                    Cadastrar Novo Relatório
                                </Button>
                            </Link>
                            <Link to='/relatorios-cadastrados' align='center'>
                                <Button variant='text'>
                                    Ver Relatórios Cadastrados
                                </Button>
                            </Link>
                            <Link to='/relatorios-assinados' align='center'>
                                <Button variant='text'>
                                    Ver Relatórios Assinados
                                </Button>
                            </Link>
                            <Link to='/assinar-relatorio' align='center'>
                                <Button variant='text'>
                                    Assinar Relatório
                                </Button>
                            </Link>
                            <Divider/>
                            <Link to="/cadastro-material" align='center'>
                                <Button variant='text'>
                                Cadastrar Novo Material
                                </Button>
                            </Link>
                            <Link to='/materiais-cadastrados' align='center'>
                                <Button variant='text'>
                                    Ver Materiais Cadastrados
                                </Button>
                            </Link>
                            <Divider/>
                            <Link to='/cadastro-usuario' align='center'>
                                <Button variant='text'>
                                    Cadastrar Novo Usuário
                                </Button>
                            </Link>
                            <Link to='/usuarios-cadastrados' align='center'>
                                <Button variant='text'>
                                    Ver Usuários Cadastrados
                                </Button>
                            </Link>
                        </React.Fragment>
                        )}

                        {userType === "instrumentador" && (
                        <React.Fragment>
                            <Link to='/cadastro-relatorio' align='center'>
                                <Button variant='text'>
                                    Cadastrar Novo Relatório
                                </Button>
                            </Link>
                            <Link to='/relatorios-cadastrados' align='center'>
                                <Button variant='text'>
                                    Ver Relatórios Cadastrados
                                </Button>
                            </Link>
                            <Link to='/relatorios-assinados' align='center'>
                                <Button variant='text'>
                                    Ver Relatórios Assinados
                                </Button>
                            </Link>
                            <Divider/>
                            <Link to="/cadastro-material" align='center'>
                                <Button variant='text'>
                                    Cadastrar Novo Material
                                </Button>
                            </Link>
                            <Link to='/materiais-cadastrados' align='center'>
                                <Button variant='text'>
                                    Ver Materiais Cadastrados
                                </Button>
                            </Link>
                            <Divider/>
                            <Link to='/usuarios-cadastrados' align='center'>
                                <Button variant='text'>
                                    Ver Usuários Cadastrados
                                </Button>
                            </Link>
                        </React.Fragment>
                        )}

                        {userType === "financeiro" && (
                        <React.Fragment>
                            <Link to='/relatorios-cadastrados' align='center'>
                                <Button variant='text'>
                                    Ver Relatórios Cadastrados
                                </Button>
                            </Link>
                            <Link to='/relatorios-assinados' align='center'>
                                <Button variant='text'>
                                    Ver Relatórios Assinados
                                </Button>
                            </Link>
                            <Divider/>
                            <Link to='/materiais-cadastrados' align='center'>
                                <Button variant='text'>
                                    Ver Materiais Cadastrados
                                </Button>
                            </Link>
                            <Divider/>
                            <Link to='/usuarios-cadastrados' align='center'>
                                <Button variant='text'>
                                    Ver Usuários Cadastrados
                                </Button>
                            </Link>
                        </React.Fragment>
                        )}

                        {userType === "medico" && (
                        <React.Fragment>
                            <Link to='/assinar-relatorio' align='center'>
                                <Button variant='text'>
                                    Assinar Relatório
                                </Button>
                            </Link>
                            <Divider/>
                            <Link to='/relatorios-assinados' align='center'>
                                <Button variant='text'>
                                    Ver Relatórios Assinados
                                </Button>
                            </Link>
                        </React.Fragment>
                        )}

                        <br/>
                        <Box display="flex" justifyContent="center">
                            <Link to='/editar-perfil' >
                                <Button
                                    color='primary' variant='contained' 
                                    style={{ width: '8.5rem', marginRight: '8px'}}
                                >
                                    Editar perfil
                                </Button>
                            </Link>
                            
                            <Button
                                color='primary' variant='contained' 
                                style={{ width: '8.5rem'}}
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