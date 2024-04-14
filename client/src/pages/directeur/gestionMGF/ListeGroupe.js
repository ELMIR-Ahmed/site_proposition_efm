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
import { Autocomplete, FormControl, InputBase, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel'

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

function ListeGroupe() {
  const [initialGroupes, setInitialGroupes] = useState([])
  const [filiere, setFiliere] = useState([])
  const [groupes, setGroupe] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [newGroupe, setNewGroupe] = useState({
    "nomGrp" : "",
    "Filiere_codeFil" : ""
  })
  const [modifiedGrp, setModifiedGrp] = useState({
    'idGrp' : "",
    "nomGrp" : "",
    "Filiere_codeFil" : ""
  })


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

  // form modal: 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = (idGrp) => {
    const currentGrp = groupes.find(curGrp => curGrp.idGrp === idGrp)
    setModifiedGrp({
      'idGrp' : idGrp,
      'nomGrp' : currentGrp.nomGrp,
      'Filiere_codeFil' : currentGrp.Filiere_codeFil,
    })
    setOpen2(true)
  };
  const handleClose2 = () => setOpen2(false);

  const getGroupes = () => {
    const token = JSON.parse(localStorage.getItem('token')).token
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
    // recuperation de evalAnnee de toutes les modules (getAll) :
    axios.get("http://localhost:7000/groupe", config)
    .then((res) => {
      setInitialGroupes(res.data)
    })
    .catch((err) => {
      console.log(err.response.data.message)
    })
  }

  useEffect(() => {
    const filteredGroupes = initialGroupes.filter((groupe) =>
      groupe.nomGrp.toLowerCase().includes(searchValue.toLowerCase())
    );
    setGroupe(filteredGroupes);
  }, [searchValue, initialGroupes]);


  function createData(idGrp, nomGrp , filiere) {
    return {idGrp, nomGrp , filiere};
  }

  const rows = groupes.map((groupe) => (
    createData(
      groupe.idGrp,
      groupe.nomGrp,
      groupe.Filiere_codeFil,
    )
  ))
  

  const handleDelete = async (idGrp) => {
    const token = JSON.parse(localStorage.getItem('token')).token
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
    await axios.delete(`http://localhost:7000/groupe/${idGrp}`, config)
    .then((res)=>{
      console.log(res.data.message);
    })
    .catch((err)=>{
      console.log(err.response)
    })
    getGroupes()
  }

  const handleDeleteAll = async () => {
    const token = JSON.parse(localStorage.getItem('token')).token
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
    if (window.confirm("attention !")){
      await axios.delete(`http://localhost:7000/groupe`, config)
      .then((res)=>{
        console.log(res.data.message);
      })
      .catch((err)=>{
        console.log(err)
      })
      getGroupes()
    }
    return false;
  }

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  } 

  // handleAjouter : 
  const handleAjouter = async () => {
    const token = JSON.parse(localStorage.getItem('token')).token
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
    await axios.post("http://localhost:7000/groupe", newGroupe, config)
    .then(res => {
      console.log(res.data.message);
      setNewGroupe({
        "nomGrp": "",
        "Filiere_idGrp": ""
      });
      handleClose()
      getGroupes()
    })
    .catch(err => {
      console.log(err)
    })
    console.log(newGroupe)
  }

  const handleUpdate = async () => {
    const token = JSON.parse(localStorage.getItem('token')).token
    const config = {
      headers : {
        Authorization : `Bearer ${token}`
      }
    }
    const idGrp = modifiedGrp.idGpr
    await axios
    .put('http://localhost:7000/groupe/' + idGrp, modifiedGrp, config)
    .then((res) => {
      console.log(res.data.message)
    })
    .catch((err) => {
      console.log(err.response.data.message)
    })
    setModifiedGrp({
      'nomGrp' : "",
      'Filiere_codeFil' : ""
    })
    handleClose2()
  }

  useEffect(()=>{
    getGroupes()
  }, [modifiedGrp])

  return (
    <>
      <div style={{width : "100%", height : "50px",marginBottom : "10px", boxShadow: "0.5px 2px 4px 1px rgb(203, 203, 203)" ,display : "flex", justifyContent : "start", alignItems : "center", borderRadius : "3px"}}>
        <div style={{width : "100%", display : "flex", justifyContent : "space-between", alignItems : "center"}}>
          <div>
            <FormControl variant="standard" >
              <BootstrapInput
                id="search"
                placeholder="Recherche..." 
                onChange = {handleSearch}
                value={searchValue}
              />
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
              onClick = {handleDeleteAll}
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
              <TableCell style={{fontWeight : "600"}} align="center">ID Groupe</TableCell>
              <TableCell style={{fontWeight : "600"}} align="center">Nom Groupe</TableCell>
              <TableCell style={{fontWeight : "600"}} align="center">Filière</TableCell>
              <TableCell style={{fontWeight : "600"}} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.idGrp}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{row.idGrp}</TableCell>
                <TableCell align="center">{row.nomGrp}</TableCell>
                <TableCell align="center">{row.filiere}</TableCell>
                <TableCell align="center" style={{display : "flex", alignItems : "center", justifyContent : "center"}}>
                  <EditOutlinedIcon 
                    onClick={()=>{
                      handleOpen2(row.idGrp)
                    }}
                    style={{
                      margin : "0 4px", 
                      cursor : "pointer"
                    }}
                  ></EditOutlinedIcon>
                  <DeleteOutlineOutlinedIcon 
                    onClick={()=>{
                      handleDelete(row.idGrp)
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
            <h2 style={{marginTop : "-10px"}}>Ajouter Groupe</h2>
            <hr />
            <br />
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} sm={12} style={{display : "flex", justifyContent : "center"}}>
                <FormControl variant="standard" style={{maxWidth : "100%"}} required >
                  <InputLabel shrink htmlFor="nomGrp" focused={false} style={{fontSize : "19px", marginLeft : "10px"}}>
                    Nom Groupe
                  </InputLabel>
                  <BootstrapInput value={newGroupe.nomGrp} id="nomGrp" onChange={(e) => {setNewGroupe({...newGroupe, "nomGrp" : e.target.value})}}/>
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
                    value={newGroupe.Filiere_codeFil ? filiere.find(item => item.codeFil === newGroupe.Filiere_codeFil) : null} // Récupérer l'objet filière correspondant au code
                    renderInput={(params) => <TextField {...params} sx={{height:'44px'}} />}
                    fullWidth
                    onChange={(_, filiere) => {setNewGroupe({...newGroupe, "Filiere_codeFil" : filiere ? filiere.codeFil : ""})}}
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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open2}
        onClose={handleClose2}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 400,
          },
        }}
      >
        <Fade in={open2}>
          <Box sx={style}>
            <h2 style={{marginTop : "-10px"}}>Modifier Groupe</h2>
            <hr />
            <br />
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} sm={12} style={{display : "flex", justifyContent : "center"}}>
                <FormControl variant="standard" style={{maxWidth : "100%"}} required >
                  <InputLabel shrink htmlFor="nomGrp" focused={false} style={{fontSize : "19px", marginLeft : "10px"}}>
                    Nom Groupe
                  </InputLabel>
                  <BootstrapInput value={modifiedGrp.nomGrp} id="nomGrp" onChange={(e) => {setModifiedGrp({...modifiedGrp, "nomGrp" : e.target.value})}}/>
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
                    value={modifiedGrp.Filiere_codeFil ? filiere.find(item => item.codeFil === modifiedGrp.Filiere_codeFil) : null} // Récupérer l'objet filière correspondant au code
                    renderInput={(params) => <TextField {...params} sx={{height:'44px'}} />}
                    fullWidth
                    onChange={(_, filiere) => {setModifiedGrp({...modifiedGrp, "Filiere_codeFil" : filiere ? filiere.codeFil : ""})}}
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
                  onClick = {handleUpdate}
                >
                  Update
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
                  onClick = {handleClose2}
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

export default ListeGroupe
