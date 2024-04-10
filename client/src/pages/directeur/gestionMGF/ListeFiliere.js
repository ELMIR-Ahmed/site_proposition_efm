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
import { FormControl, InputBase } from '@mui/material';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel'



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

function ListerFiliere() {
  const [initialFilieres, setInitialFilieres] = useState([])
  const [filieres, setFilieres] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [newFiliere, setNewFiliere] = useState({
    "codeFil" : "",
    "nomFil" : "",
    "anneeFil" : ""
  })


  // form modal: 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const getFilieres = () => {
    const token = JSON.parse(localStorage.getItem('token')).token
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
    // recuperation de evalAnnee de toutes les modules (getAll) :
    axios.get("http://localhost:7000/filiere", config)
    .then((res) => {
      setInitialFilieres(res.data)
    })
    .catch((err) => {
      console.log(err.response.data.message)
    })
  }

  useEffect(()=>{
    getFilieres()
  }, [])

  useEffect(() => {
    const filteredFilieres = initialFilieres.filter((filiere) =>
      filiere.nomFil.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilieres(filteredFilieres);
  }, [searchValue, initialFilieres]);


  function createData(codeFil, nomFil ,anneeFil) {
    return {codeFil, nomFil ,anneeFil};
  }

  const rows = filieres.map((filiere) => (
    createData(
      filiere.codeFil,
      filiere.nomFil,
      filiere.anneeFil,
    )
  ))
  

  const handleDelete = async (codeFil) => {
    console.log(codeFil)
    const token = JSON.parse(localStorage.getItem('token')).token
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
    await axios.delete(`http://localhost:7000/filiere/${codeFil}`, config)
    .then((res)=>{
      console.log(res.data.message);
    })
    .catch((err)=>{
      console.log(err.response)
    })
    getFilieres()
  }

  const handleDeleteAll = async () => {
    const token = JSON.parse(localStorage.getItem('token')).token
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
    if (window.confirm("attention !")){
      await axios.delete(`http://localhost:7000/filiere`, config)
      .then((res)=>{
        console.log(res.data.message);
      })
      .catch((err)=>{
        console.log(err)
      })
      getFilieres()
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
    if (!newFiliere.codeFil && !newFiliere.nomFil && !newFiliere.anneeFil) {
      alert("touts les champs sont obligatoires !")
    }
    await axios.post("http://localhost:7000/filiere", newFiliere, config)
    .then(res => {
      console.log(res.data.message);
      setNewFiliere({
        "codeFil" : "",
        "nomFil" : "",
        "anneeFil" : ""
      })
      handleClose()
      getFilieres()
    })
    .catch(err => {
      console.log(err.response.data.message)
    })
  }

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
              <TableCell style={{fontWeight : "600"}} align="center">Code Filière</TableCell>
              <TableCell style={{fontWeight : "600"}} align="center">Nom Filière</TableCell>
              <TableCell style={{fontWeight : "600"}} align="center">Année Filière</TableCell>
              <TableCell style={{fontWeight : "600"}} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.codeFil}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{row.codeFil}</TableCell>
                <TableCell align="center">{row.nomFil}</TableCell>
                <TableCell align="center">{row.anneeFil}</TableCell>
                <TableCell align="center" style={{display : "flex", alignItems : "center", justifyContent : "center"}}>
                  <EditOutlinedIcon 
                    // onClick={()=>{
                    //   handleUpdate(row.CIN)
                    // }}
                    style={{
                      margin : "0 4px", 
                      cursor : "pointer"
                    }}
                  ></EditOutlinedIcon>
                  <DeleteOutlineOutlinedIcon 
                    onClick={()=>{
                      handleDelete(row.codeFil)
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
            <h2 style={{marginTop : "-10px"}}>Ajouter Filière</h2>
            <hr />
            <br />
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} sm={12} style={{display : "flex", justifyContent : "center"}}>
                <FormControl variant="standard" style={{maxWidth : "100%"}} required >
                  <InputLabel shrink htmlFor="codeFil" focused={false} style={{fontSize : "19px", marginLeft : "10px"}}>
                    Code Filière
                  </InputLabel>
                  <BootstrapInput value={newFiliere.codeFil} id="codeFil" onChange={(e) => {setNewFiliere({...newFiliere, "codeFil" : e.target.value})}}/>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12} sm={12} style={{display : "flex", justifyContent : "center"}}>
                <FormControl variant="standard" style={{maxWidth : "100%"}} required >
                  <InputLabel shrink htmlFor="nomFil" focused={false} style={{fontSize : "19px", marginLeft : "10px"}}>
                    Nom Filière
                  </InputLabel>
                  <BootstrapInput value={newFiliere.nomFil} id="nomFil" onChange={(e) => {setNewFiliere({...newFiliere, "nomFil" : e.target.value})}}/>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12} sm={12} style={{display : "flex", justifyContent : "center"}}>
                <FormControl variant="standard" style={{maxWidth : "100%"}} required >
                  <InputLabel shrink htmlFor="anneeFil" focused={false} style={{fontSize : "19px", marginLeft : "10px"}}>
                    Année Filière
                  </InputLabel>
                  <BootstrapInput value={newFiliere.anneeFil} id="anneeFil" onChange={(e) => {setNewFiliere({...newFiliere, "anneeFil" : e.target.value})}}/>
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

export default ListerFiliere
