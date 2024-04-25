import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom'
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { LocalChunkSize } from 'papaparse';




const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    fontSize: 16,
    // width: "auto",
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
  }
}));


const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '.MuiInputBase-root' : {
    height: "44px" /* Remplacez 10px par la valeur de hauteur souhaitée */
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





function DetailsEFM() {
  const [showAlertVide, setShowAlertVide] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [alertTimeout, setAlertTimeout] = useState(null);
  const [modules, setModules] = useState([])
  const [updateEval, setUpdateEval] = useState({
    "Module_codeModule" : "",
    "dateDebutPropositions" : "",
    "dateFinPropositions" : "",
    "nbrMinimPropositions" : ""
  })
  const [allEval, setAllEval] = useState([])
  const [info, setInfo] = useState([])

  const infoArray = () => {
    const token = JSON.parse(localStorage.getItem('token')).token;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const modulee = modules.find(mod => mod.codMod === updateEval.Module_codeModule ? updateEval.Module_codeModule : "");
    if(!modulee) {
      setShowAlertVide(true)
      const timeCloseAlert = setTimeout(() => {
        setShowAlertVide(false)
      }, 4000)
      setAlertTimeout(timeCloseAlert)
      return;
    }
    axios.get('http://localhost:7000/evalAnnee', config)
    .then((res) => {
      const typeModulee = res.data.find(e => e.Module_codeModule === modulee.codMod).typeEval;
      setInfo((prevState) => [
          ...prevState,
          {
              "module": modulee ? modulee.nomMod : "",
              "type": typeModulee,
              "dateDebutProposition": updateEval.dateDebutPropositions,
              "dateFinProposition": updateEval.dateFinPropositions
          }
      ]);
    })
    .catch(error => {
        console.error("Une erreur s'est produite lors de la récupération des données:", error);
    });
    setUpdateEval({ 
      "Module_codeModule" : "",
      "dateDebutPropositions" : "",
      "dateFinPropositions" : "",
      "nbrMinimPropositions" : ""
    });
};

  useEffect(() => {
    return () => {
      clearTimeout(alertTimeout); // Effacer le timeout lors du démontage du composant
    };
  }, [alertTimeout]);

    // pour la liste deroulante de filieres
    useEffect(() => {
      const token = JSON.parse(localStorage.getItem('token')).token
      const config = {
        headers : {
          Authorization: `Bearer ${token}`
        }
      }
      axios.get("http://localhost:7000/module", config)
      .then(res => {
        const data = res.data;
        const modulesArray = []
        for(let i = 0; i < data.length ; i++){
          modulesArray[i] = {
            "codMod" : data[i].codeModule,
            "nomMod" : data[i].nomModule
          }
        }
        setModules(modulesArray)
      })
    }, [])

  function createData(module, type ,dateDebutProposition ,dateFinProposition) {
    return {module, type ,dateDebutProposition ,dateFinProposition};
  }

  const rows = info && info.map((evalA) => (
    createData(
      evalA.module,
      evalA.type,
      evalA.dateDebutProposition,
      evalA.dateFinProposition,
    )
  ))
  
  const handleAjouter = async () => {
    const token = JSON.parse(localStorage.getItem('token')).token
    const config = {
      headers : {
        Authorization : `Bearer ${token}`
      }
    }
    if (allEval.length === 0) {
      alert('rien à annoncer')
      return ;
    }
    for (let i = 0; i < allEval.length; i++) {
      await axios
      .put("http://localhost:7000/evalAnnee", allEval[i] ,config)
      .then((res) => {
        console.log('annoncer avec succes !' + res.data.message)
        setShowAlertSuccess(true)
        const timeCloseAlert = setTimeout(() => {
          setShowAlertSuccess(false)
        }, 4000)
        setAlertTimeout(timeCloseAlert)
      })
      .catch(err => console.log(err))
    }
    setInfo([])
  }

  const handleDelete = (nomModule) => {
    
  }

  return (
    <>
        <div style={{marginTop : "20px", width : "100%", height : "100%",marginBottom : "20px", boxShadow: "0.5px 2px 4px 1px rgb(203, 203, 203)", display : "flex", justifyContent : "start", alignItems : "center", borderRadius : "3px", padding : "20px"}}>   
        <Grid container spacing={2}>
        <Grid item xs={12} md={12} sm={12}>
            <h2>Annoncer EFMs :</h2>
            <hr />
          </Grid>
        <Grid item xs={12} md={6} sm={12}>
            <FormControl variant="standard" style={{maxWidth : "100%" }} required fullWidth>
              <br/>
              <InputLabel shrink htmlFor="select" focused={false} style={{fontSize : "19px"}}>
                Module
              </InputLabel>                
              <StyledAutocomplete
                id="select"
                options={modules}
                getOptionLabel={(option) => option.nomMod} // Affiche le nom du module
                getOptionSelected={(option, value) => option.codMod === value.codMod} // Sélectionne l'option en fonction de son code de module
                renderInput={(params) => <TextField {...params} sx={{ height: '44px' }} />}
                onChange={(event, newValue) => {
                  setUpdateEval((prevState) => ({
                    ...prevState,
                    Module_codeModule: newValue ? newValue.codMod : "" // Stocke le code du module sélectionné ou une chaîne vide si aucun module n'est sélectionné
                  }));
                }}
                value={updateEval.Module_codeModule !== "" ? modules.find((module) => module.codMod === updateEval.Module_codeModule) : null} // Définit la valeur en fonction du code du module dans l'état updateEval
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
            <FormControl variant="standard" style={{maxWidth : "100%"}} required fullWidth>
              <InputLabel shrink htmlFor="dureePresence" focused={false} style={{fontSize : "19px"}}>
                Nbr Proposition
              </InputLabel>
              <BootstrapInput value={updateEval.nbrMinimPropositions !== "" ? updateEval.nbrMinimPropositions : ""} id="dureePresence" onChange={(e) => {setUpdateEval({ ...updateEval, "nbrMinimPropositions" : e.target.value})}}/>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
            <FormControl variant="standard" style={{maxWidth : "100%"}} required fullWidth>
              <InputLabel shrink htmlFor="dureeFad" focused={false} style={{fontSize : "19px"}}>
                Date Début Proposition
              </InputLabel>
              <BootstrapInput value={updateEval.dateDebutPropositions !== "" ? updateEval.dateDebutPropositions : ""} type='date' id="dureeFad" onChange={(e) => {setUpdateEval({ ...updateEval, "dateDebutPropositions" : e.target.value})}}/>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
            <FormControl variant="standard" style={{maxWidth : "100%"}} required fullWidth>
              <InputLabel shrink htmlFor="dureeGlobale" focused={false} style={{fontSize : "19px"}}>
                Date Fin Proposition
              </InputLabel>
              <BootstrapInput value={updateEval.dateFinPropositions !== "" ? updateEval.dateFinPropositions : ""} type='date' id="dureeGlobale" onChange={(e) => {setUpdateEval({ ...updateEval, "dateFinPropositions" : e.target.value})}}/>
            </FormControl>
          </Grid>
          <div style={{
            width :  "100%",
            display : "flex", 
            justifyContent : "center", 
            alignItems : "center", 
            marginTop : "45px"
            }}
          >
            <Button 
              onClick={() => {
                setAllEval((prevEval) => [
                  ...prevEval,
                  updateEval // Ajouter le nouvel updateEval à la fin du tableau
                ]);
                infoArray()
              }}
              variant="contained" 
              size='large'
              sx={{
                backgroundColor : 'teal',
                ":hover" : {
                  backgroundColor : "rgb(0, 158, 138)",
                }
              }}
            >
              AJOUTER
            </Button>
          </div>
        </Grid>
      </div>
      {showAlertVide && (
            <div style={{margin : "15px 0"}}>
              <Alert severity="warning">Veuillez remplir le formulaire !</Alert>
            </div>
        )}
      {showAlertSuccess && (
            <div style={{margin : "15px 0"}}>
              <Alert severity="success">Annonces envoyés avec succès !</Alert>
            </div>
        )}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{fontWeight : "600"}} align="center">Module</TableCell>
                <TableCell style={{fontWeight : "600"}} align="center">Type</TableCell>
                <TableCell style={{fontWeight : "600"}} align="center">Date début Propositions</TableCell>
                <TableCell style={{fontWeight : "600"}} align="center">Date Fin Propositions</TableCell>
                <TableCell style={{fontWeight : "600"}} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.module}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {row.module}
                  </TableCell>
                  <TableCell align="center">{row.type}</TableCell>
                  <TableCell align="center">{row.dateDebutProposition}</TableCell>
                  <TableCell align="center">{row.dateFinProposition || "-------"}</TableCell>
                  <TableCell align="center" style={{display : "flex", flexDirection : "row", justifyContent : "center"}}>
                    <DeleteOutlineOutlinedIcon 
                      onClick={()=>{
                        handleDelete(row.module)
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
        <div style={{
            width :  "100%",
            display : "flex", 
            justifyContent : "center", 
            alignItems : "center", 
            marginTop : "45px"
            }}
          >
            <Button 
              onClick={handleAjouter}
              variant="contained" 
              size='large'
              sx={{
                backgroundColor : 'teal',
                ":hover" : {
                  backgroundColor : "rgb(0, 158, 138)",
                }
              }}
            >
              ANNONCER
            </Button>
        </div>
    </>
  )
}
export default DetailsEFM
