import './cadastro-relatorio.css';
import { Box, Button, Paper, TextField, Typography, Divider, Alert, AlertTitle, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

function CadastroRelatorio() {
  const [materiaisList, setMateriaisList] = useState([{ referencia: '', quantidade: '', descricao: '', lote: '' }]);
  const [isRelatorioCadastrado] = useState(false);
  const [isRedirecting] = useState(false);
  const navigate = useNavigate ();
  const [emptyFields] = useState([]);
  const session = JSON.parse(localStorage.getItem("user_session"));
  const userType = session.data.usuario.tipoDeUsuario;

  const handleAddMaterial = () => {
    setMateriaisList([...materiaisList, { referencia: '', quantidade: '', descricao: '', lote: '' }]);
  };

  const handleMaterialChange = (index, field, value) => {
    const updatedMateriaisList = [...materiaisList];

    updatedMateriaisList[index][field] = value;
    setMateriaisList(updatedMateriaisList);
  };

  const handleRemoveMaterial = (index) => {
    const updatedMateriaisList = [...materiaisList];

    updatedMateriaisList.splice(index, 1);
    setMateriaisList(updatedMateriaisList);
  };
 
  function handleBackHome() {
      navigate('/home?is'+{userType}+'=true');
  }

  function onSubmit(event){
    console.log('teste')
    event.preventDefault();

    const data = new FormData(event.target);
    var object = {};
    
    data.forEach((value, key) => object[key] = value);

    fetch('http://localhost:3001/pub/cadastrarRelatorio', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(object),
    });
  }

  return (
    <div className='backgroundCadastroRelatorio'>
      <form onSubmit={onSubmit}>
        <Box display='flex' justifyContent='center' style={{ width: '100%' }}>
          <Paper elevation={3} sx={{ p: 5 }} style={{ width: '75%' }}>
            <Box display='flex' justifyContent='center' flexDirection='column'>
              <Typography variant="h4" component="h1" align="center">
                Cadastro de Relatório
                  </Typography>

            <br />

            <Box display='flex' justifyContent='center' style={{ width: '100%' }} flexDirection='column'>
              <Typography variant="h5" align="left" style={{ marginTop: '1rem' }}>
                Consumo de material
              </Typography>
              
              {materiaisList.map((materiais, index) => (
                <div key={index}>
                  {index > 0 && <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />}
                  
                  <TextField
                    required
                    name="descricao"
                    error={emptyFields.includes(index)}
                    helperText={emptyFields.includes(index) && 'Campo obrigatório'}
                    style={{
                      marginTop: '1rem',
                      marginRight: '7rem',
                      width: '100%',
                      borderRadius: '4px'
                    }}
                    label="Descrição"
                    type="text"
                    value={materiais.descricao}
                    onChange={(e) => handleMaterialChange(index, 'descricao', e.target.value)}
                  />
                  <TextField
                    required
                    name="qtdMaterial"
                    error={emptyFields.includes(index)}
                    helperText={emptyFields.includes(index) && 'Campo obrigatório'}
                    style={{
                      marginTop: '1rem',
                      marginRight: '0.3rem',
                      width: '33%',
                      borderRadius: '4px'
                    }}
                    label="Quantidade"
                    type="number"
                    value={materiais.quantidade}
                    onChange={(e) => handleMaterialChange(index, 'quantidade', e.target.value)}
                  />
                  <TextField
                    required
                    name="referenciaMaterial"
                    error={emptyFields.includes(index)}
                    helperText={emptyFields.includes(index) && 'Campo obrigatório'}
                    style={{
                      marginTop: '1rem',
                      marginRight: '0.3rem',
                      width: '33%',
                      borderRadius: '4px'
                    }}
                    label="Referência"
                    type="text"
                    value={materiais.referencia}
                    onChange={(e) => handleMaterialChange(index, 'referencia', e.target.value)}
                  />
                  <TextField
                    required
                    name="loteMaterial"
                    error={emptyFields.includes(index)}
                    helperText={emptyFields.includes(index) && 'Campo obrigatório'}
                    style={{
                      marginTop: '1rem',
                      width: '25%',
                      borderRadius: '4px'
                    }}
                    label="Lote"
                    type="text"
                    value={materiais.lote}
                    onChange={(e) => handleMaterialChange(index, 'lote', e.target.value)}
                  />
                  {index > 0 && (
                    <Button
                      variant="text"
                      color="error"
                      onClick={() => handleRemoveMaterial(index)}
                      style={{ position: 'absolute', marginTop: '1.3%', marginLeft: '0%' }}
                      startIcon={<DeleteIcon />}
                    >
                      Excluir
                    </Button>
                  )}
                </div>
              ))}

              <Button
                variant='text'
                onClick={handleAddMaterial}
                style={{ marginTop: '1%' }}
              >
                Adicionar mais +
              </Button>
            </Box>

            <Box display='flex' justifyContent='center' style={{ width: '100%' }} flexDirection='column'>
              <Typography variant="h5" align="left" style={{ marginTop: '1rem' }}>
                Informações adicionais
              </Typography>

              <div>
                <TextField
                  required
                  name="hospital"
                  style={{ marginTop: '1rem', width: '100%' }}
                  label="Hospital"
                  type="text"
                />
                <TextField
                  required
                  name="nomePaciente"
                  style={{ marginTop: '1rem', marginRight: '0.4rem', width: '59%' }}
                  label="Paciente"
                  type="text"
                />
                <TextField
                  required
                  name="convenio"
                  style={{ marginTop: '1rem', width: '40%' }}
                  label="Convênio"
                  type="text"
                />
                <TextField
                  required
                  name="nome"
                  style={{ marginTop: '1rem', marginRight: '0.4rem', width: '59%' }}
                  label="Médico"
                  type="text"
                />
                <TextField
                  required
                  name="medicoCrm"
                  style={{ marginTop: '1rem', width: '40%' }}
                  label="CRM"
                  type="text"
                />

                <TextField
                  required
                  name="nome"
                  style={{ marginTop: '1rem', marginRight: '0.4rem', width: '59%' }}
                  label="Instrumentador"
                  type="text"
                />
                
                <TextField
                  required
                  name="data"
                  style={{ marginTop: '1rem', marginRight: '0.2rem', width: '19.8%' }}
                  label="Data"
                  type="date"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <TextField
                  required
                  name="hora"
                  style={{ marginTop: '1rem', width: '19.8%' }}
                  label="Hora"
                  type="time"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                
                
              </div>
            </Box>

            <Box style={{ marginTop: '3rem' }}>
              {isRelatorioCadastrado && isRedirecting ? (
                <Box display="flex" alignItems="center">
                  <Alert severity="success" style={{ marginRight: '1rem' }}>
                    <AlertTitle>Relatório cadastrado com sucesso!</AlertTitle>
                  </Alert>
                  <CircularProgress color="primary" size={24} />
                </Box>
              ) : (
                <>
                  <Button
                    color='primary'
                    variant='contained'
                    style={{ width: '7rem', marginRight: '1rem' }}
                    type='submit'
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
      </form>
    </div>
  );
}

export default CadastroRelatorio;
