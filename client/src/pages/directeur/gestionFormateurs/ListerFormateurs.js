import React, { useEffect, useRef, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from 'react-router-dom'
import { Button, FormControl } from '@mui/material';
import { styled } from '@mui/material';
import { InputBase } from '@mui/material'



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


function ListerFromateurs() {
  const [formateurs, setFormateurs] = useState([])
  const [filteredFormateur, setFilteredFormateur] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()

  const getFormateurs = () => {
    const token = JSON.parse(localStorage.getItem('token')).token
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
    
    axios.get("http://localhost:7000/personnel", config)
    .then((res)=>{
      setFormateurs(res.data.filter( (personnel) => personnel.fonction === 'formateur'))
    })
    .catch((err) => {
      console.log(err.response)
    }) 
  }

  useEffect(()=>{
    getFormateurs()
  }, [formateurs])

  function createData(CIN, Nom, Prénom, Fonction, Statut,  Matricule, Secteur) {
    return { CIN, Nom, Prénom, Fonction, Statut, Matricule, Secteur };
  }

  const rows = filteredFormateur.map((formateur) => (
    createData(
      formateur.CIN,
      formateur.nom,
      formateur.prenom,
      formateur.fonction,
      formateur.statut,
      formateur.matricule,
      formateur.secteur
    )
  ))
  

  const handleDelete = async (CIN) => {
    const token = JSON.parse(localStorage.getItem('token')).token
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
    console.log(CIN)
    await axios.delete(`http://localhost:7000/personnel/${CIN}`, config)
    .then((res)=>{
      console.log(res.data.message);
    })
    .catch((err)=>{
      console.log(err.response)
    })
  }

  const handleDeleteAll = async () => {
    const token = JSON.parse(localStorage.getItem('token')).token
    const config = {
      headers : {
        Authorization : `Bearer ${token}`
      }
    } 
    await axios
    .delete("http://localhost:7000/personnel", config)
    .then(res => console.log(res.data))
    .catch(err => console.log(err.response.data.message))
    getFormateurs()
  }

  useEffect(() => {
    const filtered = formateurs.filter((formateur) =>
      formateur.prenom.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredFormateur(filtered);
    
  }, [searchValue, formateurs]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
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
                <TableCell style={{fontWeight : "600"}} align="center">CIN</TableCell>
                <TableCell style={{fontWeight : "600"}} align="center">Nom</TableCell>
                <TableCell style={{fontWeight : "600"}} align="center">Prénom</TableCell>
                <TableCell style={{fontWeight : "600"}} align="center">Fonction</TableCell>
                <TableCell style={{fontWeight : "600"}} align="center">Statut</TableCell>
                <TableCell style={{fontWeight : "600"}} align="center">Matricule</TableCell>
                <TableCell style={{fontWeight : "600"}} align="center">Secteur</TableCell>
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
                    {row.CIN}
                  </TableCell>
                  <TableCell align="center">{row.Nom}</TableCell>
                  <TableCell align="center">{row.Prénom}</TableCell>
                  <TableCell align="center">{row.Fonction}</TableCell>
                  <TableCell align="center">{row.Statut}</TableCell>
                  <TableCell align="center">{row.Matricule}</TableCell>
                  <TableCell align="center">{row.Secteur}</TableCell>
                  <TableCell align="center">
                    <AssignmentOutlinedIcon 
                      onClick={()=>{
                        navigate("/directeur/gestionFormateurs/Affecter/" + row.CIN)
                      }}
                      style={{
                        margin : "0 7px", 
                        cursor : "pointer"
                      }}></AssignmentOutlinedIcon>
                    <EditOutlinedIcon 
                      onClick={()=>{
                        navigate("/directeur/gestionFormateurs/Update/" + row.CIN)
                      }}
                      style={{
                        margin : "0 4px", 
                        cursor : "pointer"
                      }}
                    ></EditOutlinedIcon>
                    <DeleteOutlineOutlinedIcon 
                      onClick={()=>{
                        handleDelete(row.CIN)
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
    </>
  )
}

export default ListerFromateurs
