  import React, { useEffect, useState } from 'react';
  import Layout2 from '../../components/Layout2';
  import { Box, Button, FormControl, InputBase, Typography, styled } from '@mui/material';
  import Grid from '@mui/material/Grid';
  import axios from 'axios';
  import Table from '@mui/material/Table';
  import TableBody from '@mui/material/TableBody';
  import TableCell from '@mui/material/TableCell';
  import TableContainer from '@mui/material/TableContainer';
  import TableHead from '@mui/material/TableHead';
  import TableRow from '@mui/material/TableRow';
  import CloudUploadIcon from '@mui/icons-material/CloudUpload';

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      margin: "0 10px",
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

  function createData(codeModule, nomModule, datedebutproposition, datefinproposition, nbrminproposition, type, sujet) {
    return { codeModule, nomModule, datedebutproposition, datefinproposition, nbrminproposition, type, sujet };
  }

  const formatDate = (isoString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(isoString).toLocaleDateString(undefined, options);
  };

  const AnnonceEFMs = () => {
    const [annonces, setAnnonces] = useState([]);
    const [assignation, setAssignation] = useState([]);
    const [myAnnonces, setMyAnnonces] = useState([]);
    const [modules, setModules] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [modulesAffecter, setModulesAffecter] = useState([])
    const [disabledButton, setDisabledButton] = useState([])

    useEffect(() => {
      const token = JSON.parse(localStorage.getItem('token')).token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      axios.get('http://localhost:7000/evalannee', config)
        .then(res => {
          const Annonces = res.data.filter(Annonce => 
            modulesAffecter.some(modAff => modAff.codeModule === Annonce.Module_codeModule)
          );
          setAnnonces(Annonces);
        })
        .catch(err => console.log(err.response.data.message));
    }, [modulesAffecter]);

    useEffect(() => {
      const token = JSON.parse(localStorage.getItem('token'));
      const config = {
        headers: {
          Authorization: `Bearer ${token.token}`
        }
      };
      axios.get(`http://localhost:7000/assignation/${token.CIN}`, config)
        .then(res => setAssignation(res.data))
        .catch(err => console.log(err.response.data.message));
    }, []);

    useEffect(() => {
      if (annonces.length > 0 && assignation.length > 0) {
        const now = new Date().getTime();

        const filteredAnnonces = annonces.filter(annonce => {
          const endDate = new Date(annonce.dateFinPropositions).getTime();
          return endDate > now;
        });

        setMyAnnonces(filteredAnnonces);
        console.log('Filtered Annonces => ', filteredAnnonces);
      }
    }, [annonces, assignation]);

    useEffect(() => {
      const token = JSON.parse(localStorage.getItem('token')).token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      axios.get('http://localhost:7000/module', config)
        .then(res => {
          const formateurModules = res.data.filter(mod => 
            modulesAffecter.some(modAff => modAff.codeModule === mod.codeModule)
          );
          setModules(formateurModules);
        })
        .catch(err => console.log(err.response.data.message))
    }, [modulesAffecter]);

    useEffect(() => {
      const token = JSON.parse(localStorage.getItem('token'));
      const jsonConfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.token}`
        }
      };
      axios.get('http://localhost:7000/propositions', jsonConfig)
            .then((res) => setDisabledButton(res.data.map(cod => cod.Module_codeModule)))
            .catch((err) => console.log(err.resposnse.message))
    }, [])

    useEffect(() => {
      const token = JSON.parse(localStorage.getItem('token'));
      const config = {
        headers: {
          Authorization: `Bearer ${token.token}`
        }
      };
      axios.get(`http://localhost:7000/assignation/${token.CIN}`, config)
      .then(res => setModulesAffecter(res.data))
      .catch(err => console.log(err.response.data.message))
    }, [])



    console.log(modules);

    const module = (codeMod) => {
      let mod = modules.find(m => m.codeModule === codeMod);
      return mod ? mod.nomModule : "Unknown"; // Extracting nomModule directly
    }

    const handleSearch = (e) => {
      setSearchValue(e.target.value);
    }

    const filteredAnnonces = myAnnonces.filter(annonce => {
      const moduleName = module(annonce.Module_codeModule);
      return moduleName.toLowerCase().includes(searchValue.toLowerCase());
    });

    const rows = filteredAnnonces.map(annonce =>
      createData(
        annonce.Module_codeModule,
        module(annonce.Module_codeModule),
        formatDate(annonce.dateDebutPropositions),
        formatDate(annonce.dateFinPropositions),
        annonce.nbrMinimPropositions,
        annonce.typeEval,
      )
    );

    const formatDateForMySQL = (date) => {
      const pad = (n) => n < 10 ? '0' + n : n;
      
      return date.getFullYear() + '-' +
        pad(date.getMonth() + 1) + '-' +
        pad(date.getDate()) + ' ' +
        pad(date.getHours()) + ':' +
        pad(date.getMinutes()) + ':' +
        pad(date.getSeconds());
  };


    const handleFileUpload = (e, codeModule) => {
      const file = e.target.files[0];
      if (file) {
        const formData = new FormData();
        const token = JSON.parse(localStorage.getItem('token'));
        const CIN = token.CIN;  
        formData.append('file', file);
    
        const url = `http://localhost:7000/upload?CIN=${CIN}&codeModule=${codeModule}`;
    
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token.token}`
          }
        };
    
        axios.post(url, formData, config)
        .then(res => {
          console.log('File uploaded successfully');      
          
        })
        .catch(err => {
          console.error('Error uploading file', err.response.data.message);
        });
        let propositionData = {
          "dateEnvoi" : formatDateForMySQL(new Date()),
          "Module_codeModule" : codeModule ,
          "Personnel_CIN" : CIN
        }
        const jsonConfig = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.token}`
          }
        };
        console.log('daata => ', propositionData)
        axios.post('http://localhost:7000/propositions',propositionData, jsonConfig)
          .then(res => {
            console.log(res.data.message)
            axios.get('http://localhost:7000/propositions', jsonConfig)
            .then((res) => setDisabledButton(res.data.map(cod => cod.Module_codeModule)))
            .catch((err) => console.log(err.resposnse.message))
          })
          .catch(err => console.log(err)) 
      }
    };


    return (
      <Layout2>
        <div style={{ padding: "30px" }}>
          <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            color: "teal",
            boxShadow: "0.5px 1px 4px 1px rgb(203, 203, 203)",
            padding: "13px",
            paddingLeft: "15px",
            borderRadius: "5px",
            marginBottom: "20px",
            opacity: '0.9',
            alignItems: 'center'
          }}>
            <Typography sx={{ fontSize: "18px", fontWeight: "600" }}>
              Annonces EFM
            </Typography>
            <div>
              <FormControl variant="standard">
                <BootstrapInput
                  id="search"
                  placeholder="Recherche..."
                  onChange={handleSearch}
                  value={searchValue}
                />
              </FormControl>
            </div>
          </Box>
          <div style={{ marginTop: "0px", width: "100%", height: "100%", boxShadow: "0.5px 2px 4px 1px rgb(203, 203, 203)", borderRadius: "6px", padding: '20px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center"><b>Code Module</b></TableCell>
                        <TableCell align="center"><b>Nom Module</b></TableCell>
                        <TableCell align="center"><b>Date Début Proposition</b></TableCell>
                        <TableCell align="center"><b>Date Fin Proposition</b></TableCell>
                        <TableCell align="center"><b>Nbr Min Proposition</b></TableCell>
                        <TableCell align="center"><b>Type</b></TableCell>
                        <TableCell align="center"><b>Sujets</b></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell align="center">{row.codeModule}</TableCell>
                          <TableCell align="center">{row.nomModule}</TableCell>
                          <TableCell align="center">{row.datedebutproposition}</TableCell>
                          <TableCell align="center">{row.datefinproposition}</TableCell>
                          <TableCell align="center">{row.nbrminproposition}</TableCell>
                          <TableCell align="center">{row.type}</TableCell>
                          <TableCell align="center">
                            <label htmlFor={`file-upload-${row.codeModule}`}>
                              <Button
                                  sx={{
                                    backgroundColor : 'teal',
                                  }}
                                  disabled = {disabledButton.includes(row.codeModule) ? true : false}
                                  component="span"
                                  variant="contained"
                                  startIcon={<CloudUploadIcon/>}
                              >
                                Envoyer
                              </Button>
                            </label>
                            <input
                                id={`file-upload-${row.codeModule}`}
                                type="file"
                                disabled = {disabledButton.includes(row.codeModule) ? true : false}
                                style={{ display: "none" }}
                                onChange={(e) => handleFileUpload(e, row.codeModule)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </div>
        </div>
      </Layout2>
    );
  }

  export default AnnonceEFMs;
