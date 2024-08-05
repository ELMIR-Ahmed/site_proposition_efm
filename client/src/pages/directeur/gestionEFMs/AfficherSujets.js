import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, InputBase, Typography, styled } from '@mui/material';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    margin: "0",
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    fontSize: 16,
    width: '280px',
    height: "15px",
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
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
      boxShadow: "0 0 0 0.2rem rgba(0, 128, 128, 0.25)",
      borderColor: 'teal',
    },
    '&::placeholder': {
      color: 'gray',
    },
  },
}));

function createData(CIN, nomFormateur, nomModule, type, valide, observation, sujets) {
  return {CIN, nomFormateur, nomModule, type, valide, observation, sujets};
}

const AfficherSujets = () => {
  const [formateurs, setFormateurs] = useState([])
  const [evalAnnee, setEvalAnnee] = useState([])
  const [propositions, setPropositions] = useState([])
  const [sujets, setSujets] = useState([])
  const [cin, setCin] = useState([])
  const [codeModule, setCodeModule] = useState([])

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token')).token
    const config = {
      headers : { 
        Authorization : `Bearer ${token}`
      }
    }
    axios.get('http://localhost:7000/personnel', config)
    .then(res => setFormateurs(res.data.filter(forma => forma.fonction === 'formateur' && cin.includes(forma.CIN))))
    .catch(err => console.log(err.response.data.message))

    axios.get('http://localhost:7000/evalAnnee', config)
    .then(res => setEvalAnnee(res.data))
    .catch(err => console.log(err.response.data.message))

    axios.get('http://localhost:7000/module', config)
    .then(res => setPropositions(res.data.filter(modu => codeModule.includes(modu.codeModule))))
    .catch(err => console.log(err.response.data.message))
  }, [codeModule, cin])

  console.log(formateurs)
  const rows = formateurs.map(formateur =>
    createData(
      formateur.CIN, 
      formateur.nom, 
      "fdfdfd", 
      "fdfdfd", 
      "fdfdfd",
    )
  );

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token')).token
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
    axios.get("http://localhost:7000/files", config)
    .then((res) => {
      let fileData = res.data || []
      let formateurs = fileData.map(file => file.split('-')[0])
      let modules = fileData.map(file => file.split('-')[1])
      setCin(formateurs)
      setCodeModule(modules)
    })
    .catch((err) => console.log(err.response.message))
  }, [])

  return (
    <>
      <div style={{marginTop : "20px", width : "100%", height : "100%",marginBottom : "20px", boxShadow: "0.5px 2px 4px 1px rgb(203, 203, 203)", display : "flex", justifyContent : "start", alignItems : "center", borderRadius : "3px", padding : "10px 10px"}}>   
        <div>
          <FormControl variant="standard">
            <BootstrapInput
              id="search"
              placeholder="Recherche..."
              // onChange={handleSearch}
              // value={searchValue}
            />
          </FormControl>
        </div>
      </div>
      <div style={{marginTop : "20px", width : "100%", height : "100%",marginBottom : "20px", boxShadow: "0.5px 2px 4px 1px rgb(203, 203, 203)", display : "flex", justifyContent : "start", alignItems : "center", borderRadius : "3px", padding : "10px 10px"}}>   
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center"><b>CIN</b></TableCell>
                      <TableCell align="center"><b>Nom Formateur</b></TableCell>
                      <TableCell align="center"><b>Nom Module</b></TableCell>
                      <TableCell align="center"><b>Type Evaluation</b></TableCell>
                      <TableCell align="center"><b>Validé</b></TableCell>
                      <TableCell align="center"><b>Observation</b></TableCell>
                      <TableCell align="center"><b>Sujets</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="center">{row.CIN}</TableCell>
                        <TableCell align="center">{row.nomFormateur}</TableCell>
                        <TableCell align="center">{row.nomModule}</TableCell>
                        <TableCell align="center">dsddsds</TableCell>
                        <TableCell align="center">dsdsdsdds</TableCell>
                        <TableCell align="center">dsdsdsdsd</TableCell>
                        <TableCell align="center">dsdsdsdsdsd</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </div>
    </>
  )
}

export default AfficherSujets
