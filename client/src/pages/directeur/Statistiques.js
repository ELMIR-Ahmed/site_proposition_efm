import React from 'react'
import Layout from '../../components/Layout'
import { Box } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(CIN, Nom, Prénom, Fonction, Matricule, Secteur, Action) {
  return { CIN, Nom, Prénom, Fonction, Matricule, Secteur, Action };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0,24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3,24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9,24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9,24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9,24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9,24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9,24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9,24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9,24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9,24, 4.0),

];


function Statistiques() {
  return (
    <div style={{padding : "30px"}}>
      <Layout>
        {/* <h1 style={{display : "flex", justifyContent : "center", "alignItems" : "center", height : "400px"}}>hello directeur</h1> */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">CIN</TableCell>
                  <TableCell align="center">Nom</TableCell>
                  <TableCell align="center">Prénom</TableCell>
                  <TableCell align="center">Fonction</TableCell>
                  <TableCell align="center">Matricule</TableCell>
                  <TableCell align="center">Secteur</TableCell>
                  <TableCell align="center">Actions</TableCell>
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
                    <TableCell align="center">{row.Matricule}</TableCell>
                    <TableCell align="center">{row.Secteur}</TableCell>
                    <TableCell align="center">{row.Action}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </Layout>
    </div>
  )
}

export default Statistiques
