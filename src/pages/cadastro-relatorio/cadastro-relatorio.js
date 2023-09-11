import './cadastro-relatorio.css';
import { Box, Button, Paper, TextField, Typography, Divider, Alert, AlertTitle, LinearProgress, Autocomplete } from '@mui/material';
import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router-dom';

function CadastroRelatorio() {
  const [materiaisList, setMateriaisList] = useState([{ referencia: '', quantidade: '', descricao: '', lote: '' }]);
  const navigate = useNavigate ();
  const session = JSON.parse(localStorage.getItem("user_session"));
  const userType = session.data.usuario.tipoDeUsuario;
  const [descricao, setDescricao] = useState('');
  const [qtdMaterial, setQtdMaterial] = useState('');
  const [referencia, setReferencia] = useState('');
  const [lote, setLote] = useState('');
  const [medico, setMedico] = useState('');
  const [instrumentador, setInstrumentador] = useState('');
  const [medicoCrm, setMedicoCrm] = useState('');
  const [paciente, setPaciente] = useState('');
  const [hospital, setHospital] = useState('');
  const [convenio, setConvenio] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const params = useParams();
  const userSession = session.data.usuario.tipoDeUsuario;
  const [materiais, setMateriais] = useState([]);

  const handleAddMaterial = () => {
    setMateriaisList([...materiaisList, { referencia: '', quantidade: '', descricao: '', lote: '' }]);
  };

  const handleRemoveMaterial = (index) => {
    const updatedMateriaisList = [...materiaisList];

    updatedMateriaisList.splice(index, 1);
    setMateriaisList(updatedMateriaisList);
  };
  
  const handleMaterialChange = (index, value) => {
    const updatedMaterials = [...materiaisList];

    updatedMaterials[index] = value;
    setMateriaisList(updatedMaterials);
  };
 
  function handleBackHome() {
      navigate('/home?is'+{userType}+'=true');
  }

  function updateInput(setState){        
    return (ev) => {
        setState(ev.target.value)
    }
  }

  function onSubmit(event){
    event.preventDefault();

    const data = new FormData(event.target);
    var object = {};
    data.forEach((value, key) => object[key] = value);

    if (!params.id) {
      fetch('http://localhost:3001/pub/cadastrarRelatorio', {
          method: 'POST',
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify(object),
      }).then(() => {
          setSuccessMessage(true);
          setTimeout(() => navigate('/home?is'+ userSession +'=true'), 3000);
      });
    } else {
      fetch(`http://localhost:3001/pub/editarRelatorio/${params.id}`, {
          method: 'POST',
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify(object),
      }).then(() => {
          setSuccessMessage(true); 
          setTimeout(() => navigate('/relatorios-cadastrados'), 3000); 
      });
    }
  }

  useEffect(() => {
    fetch('http://localhost:3001/pub/visualizarMateriais', {
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
            setMateriais(retorno.data.materiais);
        }
    )
}, [])

  useEffect(() => {
    if (params.id) {
        fetch(`http://localhost:3001/pub/visualizarRelatorios?id=${params.id}`, {
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
              setDescricao(retorno.data.relatorios[0].descricao);
              setQtdMaterial(retorno.data.relatorios[0].qtdMaterial);
              setReferencia(retorno.data.relatorios[0].referencia);
              setLote(retorno.data.relatorios[0].lote);
              setMedico(retorno.data.relatorios[0].medico);
              setInstrumentador(retorno.data.relatorios[0].instrumentador);
              setMedicoCrm(retorno.data.relatorios[0].medicoCrm);
              setPaciente(retorno.data.relatorios[0].paciente);
              setHospital(retorno.data.relatorios[0].hospital);
              setConvenio(retorno.data.relatorios[0].convenio);
            }
        )
    }
  }, [])

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

              {materiaisList.map((material, index) => (
                <div key={index}>
                  {index > 0 && <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />} 
                  <Autocomplete
                    options={materiais}
                    getOptionLabel={(material) => material.descricao}
                    onChange={updateInput(setDescricao)}                     
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Descrição"
                        name='descricao'
                        value={material.descricao}
                      />
                    )}
                  />

                  <TextField
                    required
                    style={{
                      marginTop: '1rem',
                      marginRight: '0.3rem',
                      width: '33%',
                      borderRadius: '4px'
                    }}
                    label="Quantidade"
                    type="number"
                    value={material.quantidade}
                    name="qtdMaterial"
                    onChange={(e) => handleMaterialChange(index, e.target.value)}
                  />

                  <TextField
                    required
                    style={{
                      marginTop: '1rem',
                      marginRight: '0.3rem',
                      width: '33%',
                      borderRadius: '4px'
                    }}
                    label="Referência"
                    name="referenciaMaterial"
                    value={material.referencia}
                    onChange={updateInput(setReferencia)}
                  />

                  <TextField
                    required
                    name="loteMaterial"
                    style={{
                      marginTop: '1rem',
                      width: '25%',
                      borderRadius: '4px'
                    }}
                    label="Lote"
                    value={material.lote}
                    onChange={updateInput(setLote)}
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
                  value={hospital}
                  onChange={updateInput(setHospital)}
                />

                <TextField
                  required
                  name="nomePaciente"
                  style={{ marginTop: '1rem', marginRight: '0.4rem', width: '59%' }}
                  label="Paciente"
                  value={paciente}
                  onChange={updateInput(setPaciente)}
                />

                <TextField
                  required
                  name="convenio"
                  style={{ marginTop: '1rem', width: '40%' }}
                  label="Convênio"
                  value={convenio}
                  onChange={updateInput(setConvenio)}
                />

                <TextField
                  required
                  name="medico"
                  style={{ marginTop: '1rem', marginRight: '0.4rem', width: '59%' }}
                  label="Médico"
                  value={medico}
                  onChange={updateInput(setMedico)}
                />

                <TextField
                  required
                  name="medicoCrm"
                  style={{ marginTop: '1rem', width: '40%' }}
                  label="CRM"
                  value={medicoCrm}
                  onChange={updateInput(setMedicoCrm)}
                />

                <TextField
                  required
                  name="instrumentador"
                  style={{ marginTop: '1rem', marginRight: '0.4rem', width: '59%' }}
                  label="Instrumentador"
                  value={instrumentador}
                  onChange={updateInput(setInstrumentador)}
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

            <Box style={{ marginTop: '1rem' }}>                                                            
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
            </Box>
            {successMessage && (
                <Box mt={2} width='100%'>
                    <Alert severity="success">
                        <AlertTitle> Salvo com sucesso! </AlertTitle>
                        <LinearProgress color="success" size={24} />                                        
                    </Alert>
                </Box>
            )}
          </Box>
        </Paper>
      </Box>
      </form>
    </div>
  );
}

export default CadastroRelatorio;
