import React, { useState } from 'react'
import Layout from '../../../components/Layout'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Papa from 'papaparse';

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


function GestionModFilGrp(props) {

  const navigate = useNavigate()
  const [isActiveFil, setIsActiveFil] = useState(true)
  const [isActiveMod, setIsActiveMod] = useState(null)
  const [isActiveGrp, setIsActiveGrp] = useState(null)


  const handleActiveMod = () => {
    setIsActiveMod(true)
    setIsActiveFil(false);
    setIsActiveGrp(false);
  }

  const handleActiveFil = () => {
    setIsActiveFil(true)
    setIsActiveMod(false);
    setIsActiveGrp(false);
  }
  const handleActiveGrp = () => {
    setIsActiveGrp(true)
    setIsActiveMod(false);
    setIsActiveFil(false);
  }

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length !== 2) {
      alert("Veuillez selectionner les deux fichiers nécessaires !")
      return;
    }

  }

  return (
    <>
      <Layout>
        <div style={{padding : "30px"}}>
          <div style={{width : "100%", height : "60px",marginBottom : "20px", boxShadow: "0.5px 2px 4px 1px rgb(203, 203, 203)",marginTop : "-20px", display : "flex", justifyContent : "start", alignItems : "center", borderRadius : "3px"}}>
            <div style={{width : '150px', height : "60px", display : "flex", justifyContent : "center", alignItems : "center", gap : '5px', marginLeft : "48px"}}>
              <div 
                style={{
                  width : "100%",
                  borderTop : `5px solid ${isActiveFil ? "teal" : "gray"}`, 
                  height : "60px", 
                  paddingTop : "5px",
                  transition: "border-top-color 0.3s ease" // Ajout d'une transition pour une animation fluide
                }}
              >
                <Button
                  onClick={() => {
                    handleActiveFil();
                    navigate("/directeur/gestionModFilGrp/Filiere")
                  }}
                  sx={{
                    ":hover" : {
                      color : "teal"
                    },
                    color : `${isActiveFil ? 'teal' : 'gray'}`
                  }}
                >
                  Filiere
                </Button>
              </div>
              <div 
                style={{
                  width : "100%",
                  borderTop : `5px solid ${isActiveMod ? "teal" : "gray"}`, 
                  height : "60px", 
                  paddingTop : "5px",
                  transition: "border-top-color 0.3s ease" // Ajout d'une transition pour une animation fluide
                }}
              >
                <Button
                  onClick={() => {
                    handleActiveMod();
                    navigate("/directeur/gestionModFilGrp/Module")
                  }}
                  sx={{
                    ":hover" : {
                      color : "teal"
                    },
                    color : `${isActiveMod ? 'teal' : 'gray'}`
                  }}
                >
                  Module
                </Button>
              </div>
              <div 
                style={{
                  borderTop : `5px solid ${isActiveGrp ? "teal" : "gray"}`, 
                  height : "60px", 
                  paddingTop : "5px",
                  transition: "border-top-color 0.3s ease" // Ajout d'une transition pour une animation fluide
                  }}
              >
                <Button 
                  onClick={() => {
                    handleActiveGrp();
                    navigate("/directeur/gestionModFilGrp/Groupe")
                  }}                  
                  sx={{
                    ":hover" : {
                      color : "teal"
                    },
                    color : `${isActiveGrp ? 'teal' : 'gray'}`
                  }}
                >
                  Groupe
                </Button>
              </div>
            </div>
            <div style={{width : "81%",display : "flex", justifyContent : "end", alignItems : "center"}}>
              <div>
                <Button
                  onChange={handleFileChange}
                  component="label"
                  role={undefined}
                  variant="outlined"
                  tabIndex={-1}
                  startIcon={<FileUploadOutlinedIcon />}
                  sx={{
                    color : "white", 
                    borderColor : 'teal',
                    width : "97%",
                    height : "38px", 
                    backgroundColor : "rgba(0, 128, 128, 0.8)",
                    ":hover" : {
                      backgroundColor : "rgba(0, 128, 128, 1)",
                      borderColor : 'teal',
                    }
                  }}
                >
                  Importer
                  <VisuallyHiddenInput type="file" multiple/>
                </Button>
              </div>
            </div>
          </div>
          {props.component ? props.component : "not found"}
        </div>
      </Layout>
    </> 
  )
}

export default GestionModFilGrp

