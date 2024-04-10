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
import LinearProgress from '@mui/material/LinearProgress';


function ListerFromateurs() {
  const [formateurs, setFormateurs] = useState([])

  useEffect(()=>{
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
  }, [formateurs])

  function createData(CIN, Nom, Prénom, Fonction, Statut,  Matricule, Secteur) {
    return { CIN, Nom, Prénom, Fonction, Statut, Matricule, Secteur };
  }

  const rows = formateurs.map((formateur) => (
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

  return (
    <>
      
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
                      // onClick={()=>{
                      //   handleAssignement(row.CIN)
                      // }}
                      style={{
                        margin : "0 7px", 
                        cursor : "pointer"
                      }}></AssignmentOutlinedIcon>
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
