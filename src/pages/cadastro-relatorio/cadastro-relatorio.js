import './cadastro-relatorio.css';
import { Box, Button, Paper, TextField, Typography, Divider, Alert, AlertTitle, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

function CadastroRelatorio() {
  const [materiaisList, setMateriaisList] = useState([{ referencia: '', quantidade: '', descricao: '', lote: '' }]);
  const [isRelatorioCadastrado, setIsRelatorioCadastrado] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate ();
  const [emptyFields, setEmptyFields] = useState([]);
  const session = JSON.parse(localStorage.getItem("user_session"));
  const userType = session.data.user.userType;

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

  function handleOk() {
    const updatedErrorFields = [];
  
    const emptyFieldIndexes = materiaisList
    .map((materiais) => (
      !materiais.referencia || !materiais.quantidade || !materiais.descricao || !materiais.lote
    ))
    .map((isEmpty, index) => (isEmpty ? index : -1))
    .filter(index => index !== -1);

    setEmptyFields(emptyFieldIndexes);

    const areAllFieldsFilled = materiaisList.every((materiais, index) => {
      const isReferenciaEmpty = !materiais.referencia;
      const isQuantidadeEmpty = !materiais.quantidade;
      const isDescricaoEmpty = !materiais.descricao;
      const isLoteEmpty = !materiais.lote;
  
      if (isReferenciaEmpty || isQuantidadeEmpty || isDescricaoEmpty || isLoteEmpty) {
        updatedErrorFields[index] = true;
      } else {
        updatedErrorFields[index] = false;
      }
  
      return !isReferenciaEmpty && !isQuantidadeEmpty && !isDescricaoEmpty && !isLoteEmpty;
    });
  
    if (!areAllFieldsFilled) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
  
    setIsRelatorioCadastrado(true);
    setIsRedirecting(true);

    setTimeout(() => {
        window.location.href = '/home?isAdmin=true';
    }, 3000);
  }

  return (
    <div className='backgroundCadastroRelatorio'>
      <Box display='flex' justifyContent='center' style={{ width: '100%' }}>
        <Paper elevation={3} sx={{ p: 3 }} style={{ width: '90%' }}>
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
                  error={emptyFields.includes(index)}
                  helperText={emptyFields.includes(index) && 'Campo obrigatório'}
                  style={{
                    marginTop: '1rem',
                    marginRight: '0.3rem',
                    width: '14%',
                    borderRadius: '4px'
                  }}
                  label="Quantidade"
                  type="number"
                  value={materiais.quantidade}
                  onChange={(e) => handleMaterialChange(index, 'quantidade', e.target.value)}
                />
                <TextField
                  required
                  error={emptyFields.includes(index)}
                  helperText={emptyFields.includes(index) && 'Campo obrigatório'}
                  style={{
                    marginTop: '1rem',
                    width: '85%',
                    borderRadius: '4px'
                  }}
                  label="Descrição"
                  type="text"
                  value={materiais.descricao}
                  onChange={(e) => handleMaterialChange(index, 'descricao', e.target.value)}
                />
                <TextField
                  required
                  error={emptyFields.includes(index)}
                  helperText={emptyFields.includes(index) && 'Campo obrigatório'}
                  style={{
                    marginTop: '1rem',
                    marginRight: '0.3rem',
                    width: '27%',
                    borderRadius: '4px'
                  }}
                  label="Referência"
                  type="text"
                  value={materiais.referencia}
                  onChange={(e) => handleMaterialChange(index, 'referencia', e.target.value)}
                />
                <TextField
                  required
                  error={emptyFields.includes(index)}
                  helperText={emptyFields.includes(index) && 'Campo obrigatório'}
                  style={{
                    marginTop: '1rem',
                    width: '30%',
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
                    style={{ position: 'absolute', marginTop: '2%', marginLeft: '1%' }}
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
                style={{ marginTop: '1rem', marginRight: '0.3rem', width: '50%' }}
                label="Hospital"
                type="text"
              />
              <TextField
                style={{ marginTop: '1rem', marginRight: '0.3rem', width: '30%' }}
                label="Médico"
                type="text"
              />
               <TextField
                style={{ marginTop: '1rem', width: '19%' }}
                label="CRM"
                type="text"
              />
              <TextField
                style={{ marginTop: '1rem', marginRight: '0.4rem', width: '50%' }}
                label="Paciente"
                type="text"
              />
              <TextField
                style={{ marginTop: '1rem', marginRight: '0.4rem', width: '24.5%' }}
                label="Data"
                type="date"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                style={{ marginTop: '1rem', width: '24.3%' }}
                label="Hora"
                type="time"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                style={{ marginTop: '1rem', marginRight: '0.5rem', width: '50%' }}
                label="Instrumentador"
                type="text"
              />
              <TextField
                style={{ marginTop: '1rem', width: '49%' }}
                label="Convênio"
                type="text"
              />
            </div>
          </Box>

          <Box style={{ marginTop: '1rem' }}>
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
    </div>
  );
}

export default CadastroRelatorio;
