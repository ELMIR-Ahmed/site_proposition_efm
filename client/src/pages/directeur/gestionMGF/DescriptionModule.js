import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { Button, FormControl, FormLabel, InputBase, InputLabel, Radio, RadioGroup } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import {FormControlLabel} from '@mui/material'
import { useNavigate } from 'react-router-dom'


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



function DescriptionModule() {
  const navigate = useNavigate()
  const { codeMod } = useParams()
  const [InsertEvalAnnee, setInsertEvalAnnee] = useState({
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
    "Module_codeModule": codeMod
})

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

  const typeEval = ["Local", "Régionnal"]

  const modeEval = ["TP", "TH"]

  const handleAjouter = async() => {
    const token = JSON.parse(localStorage.getItem('token')).token
    const config = {
      headers : {
        Authorization : `Bearer ${token}`
      }
    }
    await axios
    .put("http://localhost:7000/evalAnnee", InsertEvalAnnee, config)
    .then(res => {
      console.log(res.data.message)
    })
    .catch(err => {
      console.log(err.response.data.message)
    })
    setInsertEvalAnnee({
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
      "observation": null
    })
    navigate('/directeur/gestionModFilGrp/Module')
  }

  return (
    <div style={{marginTop : "60px"}}>
      <div style={{width : "100%", height : "100%",marginBottom : "20px", boxShadow: "0.5px 2px 4px 1px rgb(203, 203, 203)",marginTop : "-40px", display : "flex", justifyContent : "start", alignItems : "center", borderRadius : "3px", padding : "20px"}}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} sm={12}>
            <h2>Description Module <u>{codeMod}</u> :</h2>
            <hr />
          </Grid>
          <Grid item xs={12} md={4} sm={12}>
            <FormControl variant="standard" style={{maxWidth : "100%"}} required fullWidth>
              <InputLabel shrink htmlFor="dureeGlobale" focused={false} style={{fontSize : "19px"}}>
                Durée Globale
              </InputLabel>
              <BootstrapInput id="dureeGlobale" onChange={(e) => {setInsertEvalAnnee({...InsertEvalAnnee, "dureeGlobale" : e.target.value})}}/>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} sm={12}>
            <FormControl variant="standard" style={{maxWidth : "100%"}} required fullWidth>
              <InputLabel shrink htmlFor="dureePresence" focused={false} style={{fontSize : "19px"}}>
                Durée Présence
              </InputLabel>
              <BootstrapInput id="dureePresence" onChange={(e) => {setInsertEvalAnnee({...InsertEvalAnnee, "dureePresence" : e.target.value})}}/>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} sm={12}>
            <FormControl variant="standard" style={{maxWidth : "100%"}} required fullWidth>
              <InputLabel shrink htmlFor="dureeFad" focused={false} style={{fontSize : "19px"}}>
                Durée FAD
              </InputLabel>
              <BootstrapInput id="dureeFad" onChange={(e) => {setInsertEvalAnnee({...InsertEvalAnnee, "dureeFAD" : e.target.value})}}/>
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
                value={InsertEvalAnnee.typeEval ? InsertEvalAnnee.typeEval : ""}
                renderInput={(params) => <TextField {...params} sx={{height:'44px'}} />}
                fullWidth
                onChange={(_, typeEval) => {setInsertEvalAnnee({...InsertEvalAnnee, "typeEval" : typeEval})}}
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
                value={InsertEvalAnnee.modeEval ? InsertEvalAnnee.modeEval : ""}
                renderInput={(params) => <TextField {...params} sx={{height:'44px'}} />}
                fullWidth
                onChange={(_, modeEval) => {setInsertEvalAnnee({...InsertEvalAnnee, "modeEval" : modeEval})}}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
            <FormControl variant="standard" style={{maxWidth : "100%"}} required fullWidth>
              <InputLabel shrink htmlFor="annee" focused={false} style={{fontSize : "19px"}}>
                Année
              </InputLabel>
              <BootstrapInput id="annee" onChange={(e) => {setInsertEvalAnnee({...InsertEvalAnnee, "annee" : e.target.value})}}/>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
            {/* <FormControl variant="standard" style={{maxWidth : "100%"}} required fullWidth>
              <InputLabel shrink htmlFor="" focused={false} style={{fontSize : "19px"}}>
                Optimisé
              </InputLabel>
              <div style={{boxShadow: "0.5px 1px 3px 0.5px rgb(203, 203, 203)" ,height : "44px", borderRadius : '4px',marginTop : "23.5px", display : "flex", justifyContent : "space-around"}}>
                <FormControlLabel name='oprimise' value={"TRUE"}  control={<Radio sx={{color : "gray"}} inputProps={{ 'aria-label': 'controlled' }}/>} label="OUI" />
                <FormControlLabel name='optimise' value={"FALSE"} control={<Radio sx={{color : "gray"}} inputProps={{ 'aria-label': 'controlled' }}/>} label="NON" />
              </div>
            </FormControl> */}
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
                        onChange={(e) => {setInsertEvalAnnee({...InsertEvalAnnee, "optimise" : e.target.value})}}
                        sx={{
                          color: 'gray',
                          '&.Mui-checked': {
                            color: 'teal',
                          },
                        }}
                        size='small'
                      />
                    } 
                    label="OUI" 
                  />
                  <FormControlLabel 
                    value="FALSE" 
                    control={
                      <Radio 
                        onChange={(e) => {setInsertEvalAnnee({...InsertEvalAnnee, "optimise" : e.target.value})}}
                        sx={{
                          color: 'gray',
                          '&.Mui-checked': {
                            color: 'teal',
                          },
                        }}
                        size='small'
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
              Enregistrer
            </Button>
          </div>
        </Grid>
      </div>
      {console.log(InsertEvalAnnee)}
    </div>
  )
}

export default DescriptionModule
