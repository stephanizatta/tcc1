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
  const [instrumentador, setInstrumentador] = useState('');
  const [medicoCrm, setMedicoCrm] = useState('');
  const [paciente, setPaciente] = useState('');
  const [hospital, setHospital] = useState('');
  const [convenio, setConvenio] = useState('');
  const [hora, setHora] = useState('');
  const [data, setData] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const params = useParams();
  const userSession = session.data.usuario.tipoDeUsuario;
  const [materiais, setMateriais] = useState([]);
  const [medicosList, setMedicosList] = useState([{ nome: '' }]);
  const [medico, setMedico] = useState([]);
  const [instrumentadorList, setInstrumentadorList] = useState([{ nome: '' }]);

  const handleAddMaterial = () => {
    setMateriaisList([...materiaisList, { referencia: '', quantidade: '', descricao: '', lote: '' }]);
  };

  const handleRemoveMaterial = (index) => {
    const updatedMateriaisList = [...materiaisList];

    updatedMateriaisList.splice(index, 1);
    setMateriaisList(updatedMateriaisList);
  };
  
  const handleMaterialChange = (index, value, campo) => {
    const updatedMateriaisList = [...materiaisList];
    updatedMateriaisList[index][campo] = value;
    setMateriaisList(updatedMateriaisList);
  };
 
  function handleBackHome() {
      if (params.id) {
        navigate('/relatorios-cadastrados');
    } else {
      navigate('/home?is'+{userType}+'=true');
    }
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
    
    object.materiaisList = materiaisList;
    object.medico = medico;
   
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
    fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/pub/visualizarMateriais`, {
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
    fetch('http://localhost:3001/pub/visualizarMedicos', {
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
          setMedicosList(retorno.data.medicos);
        }
    )
  }, [])

  useEffect(() => {
    fetch('http://localhost:3001/pub/visualizarInstrumentadores', {
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
          setInstrumentadorList(retorno.data.instrumentadores);
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
            setMateriaisList(retorno.data.relatorios[0].RelatorioMaterials.map(
              relatorioMaterial => ({descricao: relatorioMaterial.Material.descricao,
                idMaterial: relatorioMaterial.idMaterial,
                quantidade: relatorioMaterial.qtdMaterial, 
                referencia: relatorioMaterial.referenciaMaterial, 
                lote: relatorioMaterial.loteMaterial })
              )
            );
            setInstrumentador(retorno.data.relatorios[0].instrumentador);
            setMedicoCrm(retorno.data.relatorios[0].medicoCrm);
            setMedico(retorno.data.relatorios[0].medico);
            setPaciente(retorno.data.relatorios[0].nomePaciente);
            setHospital(retorno.data.relatorios[0].hospital);
            setConvenio(retorno.data.relatorios[0].convenio);
            setData(retorno.data.relatorios[0].createdAt.split('T')[0]);
            setHora(retorno.data.relatorios[0].createdAt.split('T')[1].split('.')[0]);
          }
        )
    }
  }, [params.id])

  return (
    <div className='backgroundCadastroRelatorio'>
      <form onSubmit={onSubmit}>
        <Box display='flex' justifyContent='center' style={{ width: '100%' }}>
          <Paper elevation={3} sx={{ p: 5 }} style={{ width: '75%' }}>
            <Box display='flex' justifyContent='center' flexDirection='column'>
              
            {!params.id && (
                <Typography variant='h4' component='h1' align='center'>
                    Cadastro de Relatório
                </Typography>
            )}
            {params.id && (
                <Typography variant='h4' component='h1' align='center'>
                    Edição de Relatório
                </Typography>
            )}

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
                    value={materiais.find(m => m.id === material.idMaterial) ?? null}
                    getOptionLabel={(material) => material.descricao}
                    onChange={(e, value) => handleMaterialChange(index, value.id, 'idMaterial')}
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                        label="Descrição"
                        name='descricao'
                        value={material.descricao}
                      />
                    )}
                  />

                  <TextField
                    style={{
                      marginTop: '1rem',
                      marginRight: '0.3rem',
                      width: '33%',
                      borderRadius: '4px'
                    }}
                    required
                    label="Quantidade"
                    type="number"
                    value={material.quantidade}
                    name="qtdMaterial"
                    onChange={(e) => handleMaterialChange(index, e.target.value, 'quantidade')}
                  />

                  <TextField
                    style={{
                      marginTop: '1rem',
                      marginRight: '0.3rem',
                      width: '33%',
                      borderRadius: '4px'
                    }}
                    required
                    label="Referência"
                    name="referenciaMaterial"
                    value={material.referencia}
                    onChange={(e) => handleMaterialChange(index, e.target.value, 'referencia')}
                  />

                  <TextField
                    name="loteMaterial"
                    style={{
                      marginTop: '1rem',
                      width: '25%',
                      borderRadius: '4px'
                    }}
                    required
                    label="Lote"
                    value={material.lote}
                    onChange={(e) => handleMaterialChange(index, e.target.value, 'lote')}
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
                  style={{ marginTop: '1rem', width: '60%' }}
                  label="Paciente"
                  value={paciente}
                  onChange={updateInput(setPaciente)}
                />

                <TextField
                  required
                  name="convenio"
                  style={{ marginTop: '1rem', width: '60%' }}
                  label="Convênio"
                  value={convenio}
                  onChange={updateInput(setConvenio)}
                />              

                <Autocomplete
                  options={medicosList}
                  value={medicosList.find(m => m.id === medico) ?? null}
                  getOptionLabel={(medico) => medico.nome}
                  onChange={(_, value) => setMedico(value.id)}
                  renderInput={(params) => (
                    <TextField
                      required
                      {...params}
                      label="Médico"
                      name='medico'
                      style={{ marginTop: '1rem', width: '60%' }}
                    />
                  )}
                />                   

                <TextField
                  required
                  name="medicoCrm"
                  style={{ marginTop: '1rem', width: '60%' }}
                  label="CRM"
                  value={medicoCrm}
                  onChange={updateInput(setMedicoCrm)}
                />          
                
                <Autocomplete
                  options={instrumentadorList}
                  value={instrumentadorList.find(i => i.nome === instrumentador) ?? null}
                  getOptionLabel={(instrumentador) => instrumentador.nome}
                  onChange={(_, value) => setInstrumentador(value.nome)}
                  style={{ marginTop: '1rem', width: '60%' }}
                  renderInput={(params) => (
                    <TextField
                      required
                      {...params}
                      label="Instrumentador"
                      name='instrumentador'
                    />
                  )}
                />

                <TextField
                  required
                  name="data"
                  style={{ marginTop: '1rem', marginRight: '0.2rem', width: '30%' }}
                  label="Data"
                  value={data}
                  onChange={updateInput(setData)}
                  type="date"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <TextField
                  required
                  name="hora"
                  style={{ marginTop: '1rem', width: '30%' }}
                  label="Hora"
                  value={hora}
                  onChange={updateInput(setHora)}
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
