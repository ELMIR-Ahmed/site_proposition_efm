import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { FormControl, InputBase, InputLabel } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Button from '@mui/material/Button';
import axios from 'axios';
import Papa from 'papaparse'

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

function AjouterFiliere() {
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState("")
  const [newFil, setNewFil] = useState({
    "codeFil" : "",
    "nomFil" : "",
    "anneeFil" : ""
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





  const handleAjouter = async () => {
    const token = JSON.parse(localStorage.getItem('token')).token
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
    if (file) {
      for (let i = 0; i < file.length; i++) {
        const row = {
          "codeFil" : file[i].codeModule,
          "nomFil" : file[i].nomModule,
          "anneeFil" : file[i].anneeFil,
        }
        await axios.post("http://localhost:7000/filiere", row, config)
        .then(res => {
          console.log(res.data.message);
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
      }
      setFile(null);
      setFileName('')
    } else {
      await axios.post("http://localhost:7000/filiere", newFil, config)
      .then(res => {
        console.log(res.data.message);
      })
      .catch(err => {
        console.log(err.response.data.message)
      })
      setNewFil({
        "codeFil" : "",
        "nomFil" : "",
        "anneeFil" : ""
      })
    }
    // console.log(file)
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

  return (
    <div style={{marginTop : "60px"}}>
      <div style={{width : "100%", height : "100%",marginBottom : "20px", boxShadow: "0.5px 2px 4px 1px rgb(203, 203, 203)",marginTop : "-40px", display : "flex", justifyContent : "start", alignItems : "center", borderRadius : "3px", padding : "20px"}}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} sm={12}>
            <FormControl variant="standard" style={{maxWidth : "100%"}} required fullWidth>
              <InputLabel shrink htmlFor="codeModule" focused={false} style={{fontSize : "19px"}}>
                Code Filière
              </InputLabel>
              <BootstrapInput id="codeModule" value={newFil.codeModule || ""} onChange={(e) => {setNewModule({...newModule, "codeModule" : e.target.value})}}/>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} sm={12}>
            <FormControl variant="standard" style={{maxWidth : "100%"}} required fullWidth>
              <InputLabel shrink htmlFor="nomModule" focused={false} style={{fontSize : "19px"}}>
                Nom Filière
              </InputLabel>
              <BootstrapInput id="nomModule" value={newFil.nomModule || ""} onChange={(e) => {setNewModule({...newModule, "nomModule" : e.target.value})}}/>
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
              Ajouter
            </Button>
            {console.log(newModule)}
          </div>
        </div>
    </div>
  )
}

export default AjouterFiliere
