import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import { Grid, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import InputBase from '@mui/material/InputBase';
import PropTypes from 'prop-types';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { autocompleteClasses } from '@mui/material/Autocomplete';

const Root = styled('div')(
  ({ theme }) => `
  color: ${
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
  };
  font-size: 14px;
`,
);

const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled('div')(
  ({ theme }) => `
  width: 305px;
  border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: 'yellow';
  }

  &.focused {
    border-color: 'red';
    box-shadow: 0 0 3px 1px rgba(0, 128, 128, 0.4);
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    color: ${
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
    };
    height: 35px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`,
);

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 30px;
  margin: 2px;
  line-height: 30px;
  background-color: ${
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#fafafa'
  };
  border: 1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#e8e8e8'};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`,
);

const Listbox = styled('ul')(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
    font-weight: 600;

    & svg {
      color: '#1890ff';
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    cursor: pointer;

    & svg {
      color: 'currentColor';
    }
  }
`,
);




const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '.MuiInputBase-root' : {
    height: "44px"
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    height: "11px",
    top: "0px",
    caretColor : "teal",
    backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    fontSize: 16,
    padding: '10px 12px',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  // border: '1px solid',
  borderRadius : "10px",
  boxShadow : "0px 0px 11px -2px teal",
  backgroundColor : "rgb(236,238,243)",
  p: 4,
  diplay: "flex", 
  justifyContent : "center"
};


const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    margin : "0 10px",
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    fontSize: 16,
    width: '280px',
    height : "10px",
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow:  "0 0 0 0.2rem rgba(0, 128, 128, 0.25)", /* Modifier la couleur du box-shadow en focus à 'teal' avec une opacité de 0.25 */
      borderColor: 'teal',
    },
    '& .MuiInputLabel-root': {
    color: theme.palette.mode === 'light' ? '#000' : '#ffff', // Couleur du label
    '&.Mui-focused': {
      color: theme.palette.mode === 'light' ? '#000' : '#ffff', // Conserver la même couleur que le label par défaut en focus
    },
    },
    '&::placeholder': {  // Add placeholder styles here
      color: 'gray', // Adjust the color and other styles as needed
    },
    
  },
}));



const AffecterModules = () => {
  const { CIN } = useParams();
  const [groupes, setGroupes] = useState([])
  const [moduleGroups, setModuleGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [codeMod, setCodeMod] = useState("")


  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    multiple: true,
    options: groupes,
    getOptionLabel: (option) => option.nomGrp,
    onChange: (event, newValue) => setSelectedGroups(newValue)
  });

  // For Modal :
  const [open, setOpen] = React.useState(false);
  const handleOpen = (mod, codeMod) => {
    setOpen(true)
    setSelectedGroups([]);
    setCurrModule(mod)
    setCodeMod(codeMod)
  };
  const handleClose = () => setOpen(false); 

  const [modules, setModules] = useState([]);
  // const [moduleFil, setModuleFil] = useState([]);
  const [moduleSelectionner, setModuleSelectionner] = useState([])
  const [newAffectation, setNewAffectation] = useState({
    'Personnel_CIN' : '',
    'Module_codeModule' : ''
  });
  const [filiereN, setFiliereN] = useState(null);
  const [currName, setCurrName] = useState([]);
  const [currModule, setCurrModule] = useState("")

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token')).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    axios.get('http://localhost:7000/filiere', config)
    .then((res) => {
      setFiliereN(res.data)
    })

    
  }, [])

  console.log('Module Selectionner => ', moduleSelectionner)
  
  useEffect(() => {
    if (filiereN && moduleSelectionner.length > 0) {
      let arr = []
      for (let i = 0 ; i < moduleSelectionner.length ; i++ ) {
        let result = filiereN.find(e => e.codeFil === moduleSelectionner[i].Filiere_codeFil)
        console.log('FiliereN => ', result)
        arr.push(result.nomFil)
        setCurrName(arr)
        
      }
    }
  }, [filiereN, moduleSelectionner])

  console.log(currName)
  
  function createData(codeModule, nomModule, nomFiliere) {
    return { codeModule, nomModule, nomFiliere };
  }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token')).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    axios.get('http://localhost:7000/module', config)
      .then((res) => {
        const modu = res.data.find(m => m.codeModule === newAffectation.Module_codeModule);
        if (modu) {
          setModuleSelectionner((prev) => [...prev, modu]);
        }
      })
      .catch(error => {
        console.error("Error fetching modules:", error);
      });
  }, [newAffectation.Module_codeModule]);
  

  const rows = moduleSelectionner.map((modulee) => (
    createData(
      modulee.codeModule,
      modulee.nomModule,
    )
  ))

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token')).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    axios.get("http://localhost:7000/module", config)
      .then(res => {
        setModules(res.data);
      })
      .catch(error => {
        console.error("Error fetching modules:", error);
      });
  }, []);

  const handleDelete = (codeModule) => {
    const newModules = moduleSelectionner.filter(m => m.codeModule !== codeModule)
    setModuleSelectionner(newModules)
    const modulesAndGroupes = moduleGroups.filter(modgrp => modgrp.codeModule !== codeModule)
    setModuleGroups(modulesAndGroupes);
  }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token')).token;
    const config = {
      headers : {
        Authorization : `Bearer ${token}`
      }
    }
    axios
    .get('http://localhost:7000/groupe', config)
    .then(res => setGroupes(res.data))
    .catch(err => console.log(err.response.data.message))
  }, [])

  const handleAssignGroups = (moduleCode, selectedGroups) => {
    setModuleGroups(prevState => {
      const moduleIndex = prevState.findIndex(module => module.codeModule === moduleCode);
      if (moduleIndex >= 0) {
        const updatedModule = {
          ...prevState[moduleIndex],
          groupes: selectedGroups
        };
        const updatedModules = [...prevState];
        updatedModules[moduleIndex] = updatedModule;
        return updatedModules;
      } else {
        return [...prevState, { codeModule: moduleCode, groupes: selectedGroups }];
      }
    });
  };

  const handleStoreAffectation =  () => {
    const data = {
      "personnel_cin" : CIN,
      "ressources" : moduleGroups
    }

    if(!data.ressources.length === 0){
      return alert('Veuillez choisir les modules !')
    }

    const token = JSON.parse(localStorage.getItem('token')).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    axios.post(`http://localhost:7000/assignation`, data, config)
    .then(res => {
      setModuleSelectionner([])
      setModuleGroups([])
      alert(res.data.message)
    })
    .catch(err => console.log(err.response.data.message))
  }

  const handleEnregistrer = () => {
    handleAssignGroups(codeMod, selectedGroups);
    handleClose();
    setSelectedGroups([]); // Clear selected groups
  };


  return (
    <Layout>
      {console.log('those are groupes :> ', groupes)}
      <div style={{ padding: "30px" }}>
        <div style={{ width: "100%", height: "100%", marginBottom: "20px", boxShadow: "0.5px 2px 4px 1px rgb(203, 203, 203)", marginTop: "-20px", display: "flex", justifyContent: "start", alignItems: "center", borderRadius: "3px", padding: "20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} sm={12} style={{ "marginBottom": "30px" }}>
              <Typography
                style={{
                  fontSize: "19px",
                  fontWeight: "700",
                  width: "100%",
                  textAlign: "center",
                  color: "teal",
                  boxShadow: "0.5px 1px 4px 1px rgb(203, 203, 203)",
                  padding: "10px",
                  borderRadius: "5px"
                }}
              >
                Affectation Modules & Groupes
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} sm={12} style={{ marginBottom: "30px" }}>
              <Typography
                style={{
                  fontSize: "19px",
                  fontWeight: "700",
                  color: "teal",
                  boxShadow: "0.5px 1px 4px 1px rgb(203, 203, 203)",
                  padding: "10px",
                  borderRadius: "5px"
                }}
              >
                CIN FORMATEUR : {CIN}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} sm={12}>
              <FormControl variant="standard" style={{ maxWidth: "100%" }} required fullWidth>
                <br />
                <InputLabel shrink htmlFor="select" focused={false} style={{ fontSize: "19px" }}>
                  Module
                </InputLabel>
                <StyledAutocomplete
                  id="select"
                  options={modules}
                  getOptionLabel={(option) => (option ? option.nomModule || '' : '')}
                  getOptionSelected={(option, value) => option.codMod === value.codMod}
                  renderInput={(params) => <TextField {...params} sx={{ height: '44px' }} />}
                  onChange={(_, newValue) => {
                    setNewAffectation({ 'Personnel_CIN': CIN, 'Module_codeModule': newValue ? newValue.codeModule : '' });
                  }}
                  value={newAffectation && newAffectation.Module_codeModule !== '' ? modules.find((module) => module.codeModule === newAffectation.Module_codeModule) : null} // Définit la valeur en fonction du code du module dans l'état updateEval
                  fullWidth
                />
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              {console.log('moduleSelectionner => ', moduleSelectionner)}
              <TableRow>
                <TableCell style={{ fontWeight: "600" }} align="center">Code Module</TableCell>
                <TableCell style={{ fontWeight: "600" }} align="center">Nom Module</TableCell>
                <TableCell style={{ fontWeight: "600" }} align="center">Filière</TableCell>
                <TableCell style={{ fontWeight: "600" }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {row.codeModule}
                  </TableCell>
                  <TableCell align="center">{row.nomModule}</TableCell>
                  <TableCell align="center">{currName[index]}</TableCell>
                  <TableCell align="center" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                    <GroupAddOutlinedIcon
                      onClick={()=>{
                        handleOpen(row.nomModule, row.codeModule)
                      }}
                      style={{
                        margin: "0px 4px",
                        cursor: "pointer",
                        fontSize : '29px',
                        paddingBottom : '4px',
                        marginTop : '-0.3px'
                      }}></GroupAddOutlinedIcon>
                    <DeleteOutlineOutlinedIcon
                      onClick={()=>{
                        handleDelete(row.codeModule)
                      }}
                      style={{
                        margin: "0 4px",
                        cursor: "pointer"
                      }}></DeleteOutlineOutlinedIcon>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "45px" }}>
          <Button
            onClick={handleStoreAffectation}
            variant="contained"
            size='large'
            sx={{
              backgroundColor: 'teal',
              ":hover": {
                backgroundColor: "rgb(0, 158, 138)",
              }
            }}
          >
            Affecter
          </Button>
        </div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 400,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <h2 style={{marginTop : "-10px"}}>Ajouter Filière</h2>
            <hr />
            <br />
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} sm={12} style={{display : "flex", justifyContent : "center"}}>
                <FormControl variant="standard" style={{maxWidth : "100%"}}>
                  <InputLabel shrink htmlFor="nomFil" focused={false} style={{fontSize : "19px", marginLeft : "10px"}}>
                    Nom Module
                  </InputLabel>
                  <BootstrapInput value={currModule} disabled/>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12} sm={12} style={{display : "flex", justifyContent : "center"}}>
                <Root>
                  <div {...getRootProps()}>
                    <Label {...getInputLabelProps()} sx={{color : "gray"}}>Groupes</Label>
                    <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
                      {value.map((option, index) => (
                        <StyledTag label={option.nomGrp} {...getTagProps({ index })} />
                      ))}
                      <input {...getInputProps()} />
                    </InputWrapper>
                  </div>
                  {groupedOptions.length > 0 ? (
                    <Listbox {...getListboxProps()}>
                      {groupedOptions.map((option, index) => (
                        <li {...getOptionProps({ option, index })}>
                          <span>{option.nomGrp}</span>
                          <CheckIcon fontSize="small"/>
                        </li>
                      ))}
                    </Listbox>
                  ) : null}
                </Root>
              </Grid>
              <Grid item xs={12} md={12} sm={12} style={{marginTop : "25px", borderTop : "1px solid gray", display : "flex", justifyContent : "center", gap : 20}}>
                <Button
                  variant='outlined'
                  sx={{
                    height : "35px",
                    color : "teal",
                    borderColor : "teal",
                    marginTop : "5px",
                    ":hover" : {
                      "backgroundColor" : "teal",
                      "color" : "white",
                      "borderColor" : "white"
                    }
                  }}
                  onClick = {handleEnregistrer}
                >
                  Enregistrer
                </Button>
                {console.log('module et groupes => ', moduleGroups)}
                <Button
                  variant='outlined'
                  sx={{
                    height : "35px",
                    color : "red",
                    borderColor : "red",
                    marginTop : "5px",
                    ":hover" : {
                      "backgroundColor" : "red",
                      "color" : "white",
                      "borderColor" : "white"
                    }
                  }}
                  onClick = {handleClose}
                >
                  Annuler
                </Button>            
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </Layout>
  );
}

export default AffecterModules;