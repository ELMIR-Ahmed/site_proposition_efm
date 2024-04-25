import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { useNavigate } from 'react-router-dom'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
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


const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '.MuiInputBase-root' : {
    height: "37px" /* Remplacez 10px par la valeur de hauteur souhaitée */
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    height: "9px",
    top: "-3px",
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


function ListerModule() {
  const navigate = useNavigate()
  const [newModule, setNewModule] = useState({
    "codeModule" : "",
    "nomModule" : "",
    "Filiere_codeFil" : ""
  })
  const [moduleFil, setModuleFil] = useState([]) // pour stocker les filieres (getAllFilieres)
  const [modules, setModules] = useState([]) // pour stocker les modules de la BD
  const [evalAnnee, setEvalAnnee] = useState([]) // pour stocker les enregistrement de EvalAnnee
  const [mergedData, setMergedData] = useState([]) // pour fusionner le module avec sa filiere et son evalAnnee
  const [filiere, setFiliere] = useState([]) // pour la liste deroulante de filieres
  const [newEvalAnnee, setNewEvalAnnee] = useState({
    "annee": null,
    "optimise": null,
    "dureeGlobale": null,
    "dureePresence": null,
    "dureeFAD": null,
    "typeEval": null,
    "modeEval": null,
    "dateDebutPropositions": null,
    "dateFinPropositions": null,
    "nbrMinimPropositions": null,
    "observation": null,
    "Module_codeModule": null
}) // pour creer un enregistrement evalannee pour un module
  const [searchValue, setSearchValue] = useState('') // pour stocker la valeur de recherche 
  const [filteredModules, setFilteredModules] = useState([]) // pour stocker le resultat de recherche

  // pour la liste deroulante de filieres
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token')).token
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
    axios.get("http://localhost:7000/filiere", config)
    .then(res => {
      const data = res.data;
      setModuleFil(data)
      const filiereArray = []
      for(let i = 0; i < data.length ; i++){
        filiereArray[i] = {
          "codeFil" : data[i].codeFil,
          "nomFil" : data[i].nomFil
        }
      }
      setFiliere(filiereArray)
    })
  }, [])

  // pour le modal de creation de module : 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // pour récuperer les modules :
  const getModules = async () => {
    const token = JSON.parse(localStorage.getItem('token')).token
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
    await axios
    .get("http://localhost:7000/module", config)
    .then((res) => {
      setModules(res.data)
    })
    .catch((err) => {
      console.log(err.response.data.message)
    })
  }
  
  // pour recuperer les enregistrements de EvalAnnee :
  const getEvalAnnee = async () => {
    const token = JSON.parse(localStorage.getItem('token')).token
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
    await axios
    .get("http://localhost:7000/evalAnnee", config)
    .then(res => {
      setEvalAnnee(res.data)
    })
    .catch(err => console.log(err.response.data.message))
  }
  

  useEffect(()=>{
    getModules()
    getEvalAnnee()
  }, [])
  
  useEffect(() => {
    const fusionData = () => {
      let merged = [];
      // Boucler sur les modules
      for (let i = 0; i < modules.length; i++) {
          let codeM = modules[i].codeModule;
          let codeFiliere = modules[i].Filiere_codeFil;
          let filiereTrouve = moduleFil.find((fil) => fil.codeFil === codeFiliere);
          let evalAnneMod = evalAnnee.find((evalA) => evalA.Module_codeModule === codeM);
  
          // Vérifier si filiereTrouve et evalAnneMod sont définis
          if (filiereTrouve && evalAnneMod) {
              merged.push({
                  codeModule: modules[i].codeModule,
                  nomModule: modules[i].nomModule,
                  filiere: filiereTrouve.nomFil,
                  annee: evalAnneMod.annee,
                  optimise: evalAnneMod.optimise,
                  dureeG: evalAnneMod.dureeGlobale,
                  dureeP: evalAnneMod.dureePresence,
                  dureeFad: evalAnneMod.dureeFAD,
                  typeEval: evalAnneMod.typeEval,
                  modEval: evalAnneMod.modeEval,
              });
          }
      }
      setMergedData(merged);
  };
  fusionData()
  }, [evalAnnee, moduleFil, modules])

  function createData(Code, Nom ,Filière, Année, Optimisé, DuréeGlobale, DuréePrésence, DuréeFAD, TypeEval, ModEval) {
    return {Code, Nom, Filière, Année, Optimisé, DuréeGlobale, DuréePrésence, DuréeFAD, TypeEval, ModEval};
  }

  console.log(mergedData)
  const rows = filteredModules.map((module) => (
    createData(
      module.codeModule,
      module.nomModule,
      module.filiere,
      module.annee,
      module.optimise,
      module.dureeG,
      module.dureeP,
      module.dureeFad,
      module.typeEval,
      module.modEval
    )
  ))
  
  useEffect(() => {
    setNewEvalAnnee(prevState => ({ ...prevState, Module_codeModule: newModule.codeModule }));
  }, [newModule]); // Dépendance : newModule


  // handleAjouter (pour créer un module et en meme temps creer son evalAnnee): 
  const handleAjouter = async () => {
    const token = JSON.parse(localStorage.getItem('token')).token
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
    await axios.post("http://localhost:7000/module", newModule, config)
    .then(res => {
      console.log(res.data.message);
      setNewModule({
        "codeModule" : "",
        "nomModule" : "",
        "Filiere_codeFil" : ""
      })
      const token2 = JSON.parse(localStorage.getItem('token')).token
      const config2 = {
        headers : {
          Authorization: `Bearer ${token2}`
        }
      }
      axios
      .post("http://localhost:7000/evalAnnee", newEvalAnnee, config2)
      .then(response => {
        console.log(response.data.message)
        getModules()
        getEvalAnnee()
      })
      .catch(err => alert(err.response.data.message))
      handleClose()
    })
    .catch(err => {
      alert(err.response.data.message)
      handleOpen()
    })
  }

  // pour filtrer les modules en fonction de la valeur recherchée :
  useEffect(() => {
    const filtered = mergedData.filter((module) =>
      module.nomModule.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredModules(filtered);
    
  }, [searchValue, mergedData]);

  // pour stocker la valeur recherchée dans searchValue state :
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };


  // pour supprimer un module avec son code :
  const handleDelete = async (codeM) => {
    const token = JSON.parse(localStorage.getItem('token')).token
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
    await axios
    .delete("http://localhost:7000/module/" + codeM, config)
    .then(res => console.log(res.data.message))
    .catch(err => console.log(err.response.data.message))
    getModules()
  }


  // pour supprimer toutes les modules :
  const handleDeleteAll = async () => {
    const token = JSON.parse(localStorage.getItem('token')).token
    const config = {
      headers : {
        Authorization : `Bearer ${token}`
      }
    }
    await axios
    .delete('http://localhost:7000/module', config)
    .then((res) => console.log(res.data.message))
    .catch(err => err.response.data.message)
    getModules()
  }


  return (
    <>
        <div style={{width : "100%", height : "50px",marginBottom : "10px", boxShadow: "0.5px 2px 4px 1px rgb(203, 203, 203)" ,display : "flex", justifyContent : "start", alignItems : "center", borderRadius : "3px"}}>
          <div style={{width : "100%", display : "flex", justifyContent : "space-between", alignItems : "center"}}>
            <div>
              <FormControl variant="standard">
                <BootstrapInput placeholder="Recherche..." onChange={handleSearch}/>
              </FormControl>
            </div>
            <div style={{display : "flex", margin : '0 10px', gap : 6}}>
              <Button 
                onClick={handleOpen}
                variant="outlined"
                sx={{
                  height : "33px",
                  color : "teal",
                  borderColor : "teal",
                  ":hover" : {
                    "backgroundColor" : "teal",
                    "color" : "white",
                    "borderColor" : "white"
                  }
                }}
              >
                Ajouter
              </Button>
              <Button 
                onClick={handleDeleteAll}
                variant="outlined"
                sx={{
                  height : "33px",
                  color : "red",
                  borderColor : "red",
                  ":hover" : {
                    "backgroundColor" : "red",
                    "color" : "white",
                    "borderColor" : "white"
                  }
                }}
              >
                Tout Supprimer
              </Button>
            </div>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{fontWeight : "600"}} align="center">Code</TableCell>
                <TableCell style={{fontWeight : "600"}} align="center">Nom Module</TableCell>
                <TableCell style={{fontWeight : "600"}} align="center">Filière</TableCell>
                <TableCell style={{fontWeight : "600"}} align="center">Année</TableCell>
                <TableCell style={{fontWeight : "600"}} align="center">Optimisé</TableCell>
                <TableCell style={{fontWeight : "600"}} align="center">Durée Glocale</TableCell>
                <TableCell style={{fontWeight : "600"}} align="center">Durée Présence</TableCell>
                <TableCell style={{fontWeight : "600"}} align="center">Durée FAD</TableCell>
                <TableCell style={{fontWeight : "600"}} align="center">Type d'Evaluation</TableCell>
                <TableCell style={{fontWeight : "600"}} align="center">Mode d'Evaluation</TableCell>
                <TableCell style={{fontWeight : "600"}} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.CIN}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {row.Code}
                  </TableCell>
                  <TableCell align="center">{row.Nom}</TableCell>
                  <TableCell align="center">{row.Filière}</TableCell>
                  <TableCell align="center">{row.Année || "-------"}</TableCell>
                  <TableCell align="center">{row.Optimisé === 'TRUE' ? "Oui" : row.Optimisé === 'FALSE' ? "Non" : "" || "-------"}</TableCell>
                  <TableCell align="center">{row.DuréeGlobale  || "-------"}</TableCell>
                  <TableCell align="center">{row.DuréePrésence || "-------"}</TableCell>
                  <TableCell align="center">{row.DuréeFAD || "-------"}</TableCell>
                  <TableCell align="center">{row.TypeEval || "-------"}</TableCell>
                  <TableCell align="center">{row.ModEval || "-------"}</TableCell>
                  <TableCell align="center" style={{display : "flex", flexDirection : "column", alignItems : "center"}}>
                    <DescriptionOutlinedIcon 
                      onClick={()=>{
                        navigate('/directeur/gestionModFilGrp/Module/Description/'+row.Code)
                      }}
                      style={{
                        margin : "0 7px", 
                        cursor : "pointer"
                      }}></DescriptionOutlinedIcon>
                    <EditOutlinedIcon 
                      onClick={()=>{
                        navigate('/directeur/gestionModFilGrp/Module/Update/' + row.Code)
                      }}
                      style={{
                        margin : "0 4px", 
                        cursor : "pointer"
                      }}
                    ></EditOutlinedIcon>
                    <DeleteOutlineOutlinedIcon 
                      onClick={()=>{
                        handleDelete(row.Code)
                      }}
                      style={{
                        margin : "0 4px", 
                        cursor : "pointer"
                      }}></DeleteOutlineOutlinedIcon>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
              <h2 style={{marginTop : "-10px"}}>Ajouter Module</h2>
              <hr />
              <br />
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} sm={12} style={{display : "flex", justifyContent : "center"}}>
                  <FormControl variant="standard" style={{maxWidth : "100%"}} required >
                    <InputLabel shrink htmlFor="codeModule" focused={false} style={{fontSize : "19px", marginLeft : "10px"}}>
                      Code Module
                    </InputLabel>
                    <BootstrapInput value={newModule.codeModule} id="codeModule" onChange={(e) => {setNewModule({...newModule, "codeModule" : e.target.value})}}/>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12} sm={12} style={{display : "flex", justifyContent : "center"}}>
                  <FormControl variant="standard" style={{maxWidth : "100%"}} required >
                    <InputLabel shrink htmlFor="nomModule" focused={false} style={{fontSize : "19px", marginLeft : "10px"}}>
                      Nom Module
                    </InputLabel>
                    <BootstrapInput value={newModule.nomModule} id="nomModule" onChange={(e) => {setNewModule({...newModule, "nomModule" : e.target.value})}}/>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12} sm={12} style={{display : "flex", justifyContent : "center"}}>
                  <FormControl variant="standard" style={{maxWidth : "100%"}} required>
                    <br/>
                    <InputLabel shrink htmlFor="filiere" focused={false} style={{fontSize : "19px"}}>
                      Filière
                    </InputLabel>                
                    <StyledAutocomplete
                      id="filiere"
                      sx={{
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          border: '1px solid rgb(0, 128, 128)',
                          boxShadow:  "0 0 0 0.2rem rgba(0, 128, 128, 0.25)",
                        },
                        width : "303px"
                      }}
                      disablePortal
                      options={filiere}
                      getOptionLabel={(option) => option.nomFil}
                      value={newModule.Filiere_codeFil ? filiere.find(item => item.codeFil === newModule.Filiere_codeFil) : null} // Récupérer l'objet filière correspondant au code
                      renderInput={(params) => <TextField {...params} sx={{height:'44px'}} />}
                      fullWidth
                      onChange={(_, filiere) => {setNewModule({...newModule, "Filiere_codeFil" : filiere ? filiere.codeFil : ""})}}
                    />
                  </FormControl>
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
                    onClick = {handleAjouter}
                  >
                    Enregistrer
                  </Button>
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
    </>
  )
}
export default ListerModule
