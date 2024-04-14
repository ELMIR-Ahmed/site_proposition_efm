import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { FormControl, InputBase, InputLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Button from '@mui/material/Button';
import axios from 'axios';
import Papa from 'papaparse'
import { useNavigate , useParams} from 'react-router-dom';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


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


function UpdateFormateur() {
  const navigate = useNavigate()
  const { CIN } = useParams()
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState("")
  const [modifiedFormateur, setModifiedFormateur] = useState({
    "CIN" : "",
    "nom" : "",
    "prenom" : "",
    "statut" : "",
    "matricule" : null,
    "fonction" : "",    
    "secteur" : "",
    "motDePasse" : ""
  })


  const Secteurs = [
    'Services à la Personne',
    "l'Artisanat",
    'Commerce et de Gestion',
    'Aéronautique',
    'Agroalimentaire',
    'Arts Graphiques',
    'Audiovisuel et du Cinéma',
    'Bâtiment et Travaux Publics',
    'Cuir',
    'Industrie Mécanique',
    'Froid & Génie Thermique',
    'Industrie Electrique',
    'Automobile',
    'Digital & Intelligence Artificielle',
    'Santé',
    'Plasturgie',
    'Sport',
    'Industrie Textile & Habillement',
    'Tourisme, Hôtellerie & Restauration',
    'Transport et de la Logistique'
  ];


  const handleUpdate = async () => {
    const token = JSON.parse(localStorage.getItem('token')).token
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
    if (file) {
      // localStorage.setItem('added', JSON.stringify(true))
      for (let i = 0; i < file.length; i++) {
        const row = {
          "CIN" : file[i].CIN,
          "nom" : file[i].nom,
          "prenom" : file[i].prenom,
          "statut" : file[i].statut,
          "matricule" : file[i].secteur ? file[i].secteur : null,
          "fonction" : file[i].fonction,    
          "secteur" : file[i].secteur,
          "motDePasse" : file[i].motDePasse
        }
        await axios.put("http://localhost:7000/personnel", row, config)
        .then(res => {
          console.log(res.data.message);
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
      }
      setFile(null);
      setFileName('')
      // localStorage.setItem('added', JSON.stringify(false))
    } else {
      await axios.put("http://localhost:7000/personnel", modifiedFormateur, config)
      .then(res => {
        console.log(res.data.message);
      })
      .catch(err => {
        console.log(err.response.data.message)
      })
      setModifiedFormateur({
        "CIN" : "",
        "nom" : "",
        "prenom" : "",
        "statut" : "",
        "matricule" : null,
        "fonction" : "",    
        "secteur" : "",
        "motDePasse" : ""
      })
    }
    // console.log(file)
    navigate('/directeur/gestionFormateurs/Liste')
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file.name)
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvData = e.target.result;
        Papa.parse(csvData, {
          headers : true,
          skipEmptyLines : true,
          complete : (results) => {
            const jsonData = results.data;
            const header = jsonData[0];
            const arrayOfObjects = jsonData.slice(1).filter(row => row.length > 0).map(row => {
              const obj = {};
              header.forEach((key, index) => {
                obj[key] = row[index];
              });
              return obj;
            });
            setFile(arrayOfObjects)
          }
        })
      }
      reader.readAsText(file);
    }
  };

  // const getFormateurs = async () => {
  //   const token = JSON.parse(localStorage.getItem('token')).token
  //   const config = {
  //     headers : {
  //       Authorization : `Bearer ${token}`
  //     }
  //   }
  //   await axios
  //   .get(`http://localhost:7000/personnel`, config)
  //   .then(res => {
  //     const currFormateur = res.data.find((forma) => forma.CIN === CIN)
  //     setModifiedFormateur(currFormateur)
  //   })
  //   .catch(err => {
  //     console.log(err.response.data.message)
  //   })
  // }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token')).token
    const config = {
      headers : {
        Authorization : `Bearer ${token}`
      }
    }
    axios
    .get(`http://localhost:7000/personnel`, config)
    .then(res => {
      const currFormateur = res.data.find((forma) => forma.CIN === CIN)
      setModifiedFormateur(currFormateur)
    })
    .catch(err => {
      console.log(err.response.data.message)
    })
  }, [CIN])

  return (
    <div style={{marginTop : "60px"}}>
      <div style={{width : "100%", height : "100%",marginBottom : "20px", boxShadow: "0.5px 2px 4px 1px rgb(203, 203, 203)",marginTop : "-40px", display : "flex", justifyContent : "start", alignItems : "center", borderRadius : "3px", padding : "20px"}}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} sm={12}>
            <FormControl variant="standard" style={{maxWidth : "100%"}} required fullWidth>
              <InputLabel shrink htmlFor="cin" focused={false} style={{fontSize : "19px"}}>
                CIN
              </InputLabel>
              <BootstrapInput id="cin" readOnly value={modifiedFormateur.CIN || ""}/>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} sm={12}>
            <FormControl variant="standard" style={{maxWidth : "100%"}} required fullWidth>
              <InputLabel shrink htmlFor="nom" focused={false} style={{fontSize : "19px"}}>
                Nom
              </InputLabel>
              <BootstrapInput id="nom" value={modifiedFormateur.nom || ""} onChange={(e) => {setModifiedFormateur({...modifiedFormateur, "nom" : e.target.value})}}/>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} sm={12}>
            <FormControl variant="standard" style={{maxWidth : "100%"}} required fullWidth>
              <InputLabel shrink htmlFor="prenom" focused={false} style={{fontSize : "19px"}}>
                Prénom
              </InputLabel>
              <BootstrapInput id="prenom" value={modifiedFormateur.prenom || ""} onChange={(e) => {setModifiedFormateur({...modifiedFormateur, "prenom" : e.target.value})}}/>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
            <FormControl variant="standard" style={{maxWidth : "100%"}} required fullWidth>
              <InputLabel shrink htmlFor="statut" focused={false} style={{fontSize : "19px"}}>
                Statut
              </InputLabel>
              <BootstrapInput id="statut" value={modifiedFormateur.statut || ""} onChange={(e) => {setModifiedFormateur({...modifiedFormateur, "statut" : e.target.value})}}/>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
            <FormControl variant="standard" style={{maxWidth : "100%"}} required fullWidth>
              <InputLabel shrink htmlFor="fonction" focused={false} style={{fontSize : "19px"}}>
                Fonction
              </InputLabel>
              <BootstrapInput id="fonction" value={modifiedFormateur.fonction || ""} onChange={(e) => {setModifiedFormateur({...modifiedFormateur, "fonction" : e.target.value})}}/>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
            <FormControl variant="standard" style={{maxWidth : "100%" }} required fullWidth>
              <br/>
              <InputLabel shrink htmlFor="select" focused={false} style={{fontSize : "19px"}}>
                Secteur
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
                options={Secteurs}
                value={modifiedFormateur.secteur ? modifiedFormateur.secteur : ""}
                renderInput={(params) => <TextField {...params} sx={{height:'44px'}} />}
                fullWidth
                onChange={(_, secteur) => {setModifiedFormateur({...modifiedFormateur, "secteur" : secteur})}}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
            <FormControl variant="standard" style={{maxWidth : "100%"}} fullWidth>
              <InputLabel shrink htmlFor="bootstrap-input" focused={false} style={{fontSize : "19px"}}>
                Matricule
              </InputLabel>
              <BootstrapInput id="bootstrap-input" value={modifiedFormateur.matricule || ""} onChange={(e) => {setModifiedFormateur({...modifiedFormateur, "matricule" : e.target.value})}}/>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} sm={12} >
            <FormControl variant="standard" style={{maxWidth : "100%"}} fullWidth>
              <InputLabel shrink htmlFor="password" focused={false} style={{fontSize : "19px"}}>
                Nouveau Mot De Passe ?
              </InputLabel>
              <BootstrapInput type='password'  id="password" onChange={(e) => {setModifiedFormateur({...modifiedFormateur, "motDePasse" : e.target.value})}}/>
            </FormControl>
          </Grid>
        </Grid>
        </div>
        <div style={{borderTop : "1.3px solid gray", marginTop : "40px", marginBottom : "20px"}}></div>
        <div>
          <div style={{display : "flex"}}>
            <div>
              <FileUploadOutlinedIcon style={{ fill: 'rgba(128, 128, 128, 0.6)'}}></FileUploadOutlinedIcon>
            </div>
            <div>
              <Typography style={{ color: 'rgba(128, 128, 128, 0.8)', marginLeft : "5px"}}>Depuis EXEL :</Typography>
            </div>
          </div>
          <div style={{
            marginTop : '15px', 
            border : '1px solid rgb(203, 203, 203)', 
            borderRadius : "4px",
            padding : "15px",
            boxShadow: "0.5px 1px 4px 1px rgb(203, 203, 203)",
            display : "flex",
            alignItems : "center",
            justifyContent : "space-between"
            }}>
            <div style={{width : "15.8%"}}>
              <Button
                onChange={handleFileChange}
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                // startIcon={< CloudUploadIcon />}
                sx={{
                  color : "white", 
                  borderColor : 'teal',
                  width : "100%",
                  height : "40px", 
                  backgroundColor : "rgba(0, 128, 128, 0.8)",
                  ":hover" : {
                    backgroundColor : "rgba(0, 128, 128, 1)",
                    borderColor : 'teal',
                  }
                }}
              >
                Importer
                <VisuallyHiddenInput type="file" />
              </Button>
            </div>
            <div style={{width : "84%"}}>
              <TextField fullWidth disabled
                value={fileName ? fileName : "Fichier.CSV"}
                sx={{
                  width : "100%",
                }}
                inputProps={{
                  style: {
                    height : "6px",
                    border : "1px solid teal",
                    borderRadius : "4px",
                    backgroundColor : "rgba(0, 128, 128, 0.2)",
                  },
                  readOnly : true,
              }}
              />
            </div>
          </div>
          <div style={{
            display : "flex", 
            justifyContent : "center", 
            alignItems : "center", 
            marginTop : "25px"
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
        </div>
    </div>
  )
}

export default UpdateFormateur
