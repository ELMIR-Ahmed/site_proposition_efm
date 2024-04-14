import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { FormControl, FormControlLabel, FormLabel, InputBase, InputLabel, Radio, RadioGroup } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';



const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '.MuiInputBase-root' : {
    height: "44px" /* Remplacez 10px par la valeur de hauteur souhaitée */
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    height:'40%',
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


const UpdateModule = () => {
  const navigate = useNavigate()
  const { codeMod } = useParams()
  const [filieres, setFilieres] = useState([])
  const [updatedMod, setUpdatedMod] = useState({
    "codeModule" : "",
    "nomModule" : "",
    "Filiere_codeFil" : ""
  })
  const [updatedEvalAnnee, setUpdatedEvalAnnee] = useState({
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
  })

  const typeEval = ["Local", "Régionnal"]
  const modeEval = ["TP", "TH"]

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
        console.log(res.data)
        const data = res.data;
        const filiereArray = []
        for(let i = 0; i < data.length ; i++){
          filiereArray[i] = {
            "codeFil" : data[i].codeFil,
            "nomFil" : data[i].nomFil
          }
        }
        setFilieres(filiereArray)
      })
    }, [])

    useEffect(() => {
      getEvalAnnee()
      getModules()
    }, [])
    
    const getModules = async () => {
      const token = JSON.parse(localStorage.getItem('token')).token
      const config = {
        headers : {
          Authorization : `Bearer ${token}`
        }
      }
      await axios
      .get(`http://localhost:7000/module`, config)
      .then((res) => {
        console.log(res.data)
        const current = res.data.find(Mod => Mod.codeModule === codeMod)
        setUpdatedMod(current)
      })
      .catch((err) => {
        console.log(err.response.data.message)
      })
    }

    const getEvalAnnee = async () => {
      const token = JSON.parse(localStorage.getItem('token')).token
      const config = {
        headers : {
          Authorization : `Bearer ${token}`
        }
      }
      await axios
      .get(`http://localhost:7000/evalAnnee/`, config)
      .then(res => {
        console.log(res.data)
        const current = res.data.find(evalA => evalA.Module_codeModule === codeMod)
        setUpdatedEvalAnnee(current)
      })
      .catch(err => {
        console.log(err.response.data.message)
      })
    }

    const handleUpdate = async () => {
      const token = JSON.parse(localStorage.getItem('token')).token
      const config = {
        headers : {
          Authorization : `Bearer ${token}`
        }
      }
      await axios
        .put(`http://localhost:7000/evalAnnee`, updatedEvalAnnee, config)
        .then(resp => console.log(resp.data.message))
        .catch(err => console.log(err.response.data.message))
      await axios
        .put(`http://localhost:7000/module`, updatedMod, config)
        .then(res => console.log(res.data.message))
        .catch(err => console.log(err))


      getModules()
      getEvalAnnee()
      navigate('/directeur/gestionModFilGrp/Module')
    }

  return (
    <div style={{marginTop : "60px"}}>
      <div style={{width : "100%", height : "100%",marginBottom : "20px", boxShadow: "0.5px 2px 4px 1px rgb(203, 203, 203)",marginTop : "-40px", display : "flex", justifyContent : "start", alignItems : "center", borderRadius : "3px", padding : "20px"}}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} sm={12}>
            <h1>Modifier Module {codeMod}</h1>
          </Grid>
          <Grid item xs={12} md={4} sm={12}>
            <FormControl variant="standard" style={{maxWidth : "100%"}} required fullWidth>
              <InputLabel shrink htmlFor="codeModule" focused={false} style={{fontSize : "19px"}}>
                Code
              </InputLabel>
              <BootstrapInput id="codeModule" value={updatedMod.codeModule || ""} readOnly onChange={(e) => {setUpdatedMod({...updatedMod, "codeModule" : e.target.value})}}/>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} sm={12}>
            <FormControl variant="standard" style={{maxWidth : "100%"}} required fullWidth>
              <InputLabel shrink htmlFor="nom" focused={false} style={{fontSize : "19px"}}>
                Nom Module
              </InputLabel>
              <BootstrapInput id="nom" value={updatedMod.nomModule || ""} onChange={(e) => {setUpdatedMod({...updatedMod, "nomModule" : e.target.value})}}/>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} sm={12} style={{display : "flex", justifyContent : "center"}}>
            <FormControl variant="standard" style={{maxWidth : "100%"}} required  fullWidth>
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
                options={filieres}
                getOptionLabel={(option) => option.nomFil}
                value={updatedMod.Filiere_codeFil ? filieres.find(item => item.codeFil === updatedMod.Filiere_codeFil) : null} // Récupérer l'objet filière correspondant au code
                renderInput={(params) => <TextField {...params} sx={{height:'44px'}} />}
                fullWidth
                onChange={(_, filiere) => {setUpdatedMod({...updatedMod, "Filiere_codeFil" : filiere ? filiere.codeFil : ""})}}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} sm={12}>
            <FormControl variant="standard" style={{maxWidth : "100%"}} required fullWidth>
              <InputLabel shrink htmlFor="codeModule" focused={false} style={{fontSize : "19px"}}>
                Durée FAD
              </InputLabel>
              <BootstrapInput id="codeModule" value={updatedEvalAnnee.dureeFAD || ""} onChange={(e) => {setUpdatedEvalAnnee({...updatedEvalAnnee, "dureeFAD" : e.target.value})}}/>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={4} sm={12}>
            <FormControl variant="standard" style={{maxWidth : "100%"}} required fullWidth>
              <InputLabel shrink htmlFor="codeModule" focused={false} style={{fontSize : "19px"}}>
                Durée Présence
              </InputLabel>
              <BootstrapInput id="codeModule" value={updatedEvalAnnee.dureePresence || ""} onChange={(e) => {setUpdatedEvalAnnee({...updatedEvalAnnee, "dureePresence" : e.target.value})}}/>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} sm={12}>
            <FormControl variant="standard" style={{maxWidth : "100%"}} required fullWidth>
              <InputLabel shrink htmlFor="codeModule" focused={false} style={{fontSize : "19px"}}>
                Durée Globale
              </InputLabel>
              <BootstrapInput id="codeModule" value={updatedEvalAnnee.dureeGlobale || ""} onChange={(e) => {setUpdatedEvalAnnee({...updatedEvalAnnee, "dureeGlobale" : e.target.value})}}/>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
            <FormControl variant="standard" style={{maxWidth : "100%" }} required fullWidth>
              <br/>
              <InputLabel shrink htmlFor="select" focused={false} style={{fontSize : "19px"}}>
                Type d'Evaluation
              </InputLabel>                
              <StyledAutocomplete
                id = "select"
                sx={{
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid rgb(0, 128, 128)',
                    boxShadow:  "0 0 0 0.2rem rgba(0, 128, 128, 0.25)",
                  },
                }}
                disablePortal
                options={typeEval}
                value={updatedEvalAnnee.typeEval ? updatedEvalAnnee.typeEval : ""}
                renderInput={(params) => <TextField {...params} sx={{height:'44px'}} />}
                fullWidth
                onChange={(_, typeEval) => {setUpdatedEvalAnnee({...updatedEvalAnnee, "typeEval" : typeEval})}}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
            <FormControl variant="standard" style={{maxWidth : "100%" }} required fullWidth>
              <br/>
              <InputLabel shrink htmlFor="select" focused={false} style={{fontSize : "19px"}}>
                Mode d'Evaluation
              </InputLabel>                
              <StyledAutocomplete
                id = "select"
                sx={{
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid rgb(0, 128, 128)',
                    boxShadow:  "0 0 0 0.2rem rgba(0, 128, 128, 0.25)",
                  },
                }}
                disablePortal
                options={modeEval}
                value={updatedEvalAnnee.modeEval ? updatedEvalAnnee.modeEval : ""}
                renderInput={(params) => <TextField {...params} sx={{height:'44px'}} />}
                fullWidth
                onChange={(_, modeEval) => {setUpdatedEvalAnnee({...updatedEvalAnnee, "modeEval" : modeEval})}}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
            <FormControl variant="standard" style={{maxWidth : "100%"}} required fullWidth>
              <InputLabel shrink htmlFor="statut" focused={false} style={{fontSize : "19px"}}>
                Année
              </InputLabel>
              <BootstrapInput id="statut" value={updatedEvalAnnee.annee || ""} onChange={(e) => {setUpdatedEvalAnnee({...updatedEvalAnnee, "annee" : e.target.value})}}/>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
            <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label" style={{ color: 'gray' }}>Optimisé</FormLabel>
                <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="optimise"
                style={{
                  marginTop : "5px"
                }}
              >
                <FormControlLabel
                  value="TRUE" 
                  control={
                    <Radio
                      onChange={(e) => {setUpdatedEvalAnnee({...updatedEvalAnnee, "optimise" : e.target.value})}}
                      sx={{
                        color: 'gray',
                        '&.Mui-checked': {
                          color: 'teal',
                        },
                      }}
                      size='small'
                      checked = {updatedEvalAnnee.optimise === 'TRUE' ? true : false}
                    />
                  } 
                  label="OUI" 
                />
                <FormControlLabel 
                  value="FALSE" 
                  control={
                    <Radio 
                      onChange={(e) => {setUpdatedEvalAnnee({...updatedEvalAnnee, "optimise" : e.target.value})}}
                      sx={{
                        color: 'gray',
                        '&.Mui-checked': {
                          color: 'teal',
                        },
                      }}
                      size='small'
                      checked = {updatedEvalAnnee.optimise === 'FALSE' ? true : false}
                    />
                  } 
                  label="NON" 
                />
              </RadioGroup>
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
              onClick={handleUpdate}
              variant="contained" 
              size='large'
              sx={{
                backgroundColor : 'teal',
                ":hover" : {
                  backgroundColor : "rgb(0, 158, 138)",
                }
              }}
            >
              Modifier
            </Button>
          </div>
        </Grid>
        </div>
      </div>
  )
}

export default UpdateModule
