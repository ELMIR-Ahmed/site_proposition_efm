import React, { useState } from 'react'
import Layout from '../../../components/Layout'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function GestionEFMs(props) {

  const navigate = useNavigate()
  const [isActiveListe, setIsActiveListe] = useState(props.isActive)
  const [isActiveAjouter, setIsActiveAjouter] = useState(null)


  const handleActiveListe = () => {
    setIsActiveListe(true)
    setIsActiveAjouter(false)
  }

  const handleIsActiveAjouter = () => {
    setIsActiveAjouter(true)
    setIsActiveListe(false)
  }


  return (
    <Layout>
        <div style={{padding : "30px"}}>
          <div style={{width : "100%", height : "60px",marginBottom : "20px", boxShadow: "0.5px 2px 4px 1px rgb(203, 203, 203)",marginTop : "-20px", display : "flex", justifyContent : "start", alignItems : "center", borderRadius : "3px"}}>
            <div style={{width : '250px', height : "60px", display : "flex", justifyContent : "center", alignItems : "center", gap : '5px', marginLeft : "5px"}}>
              <div 
                style={{
                  width : "50%",
                  borderTop : `5px solid ${isActiveListe ? "teal" : "gray"}`, 
                  height : "60px", 
                  paddingTop : "5px",
                  transition: "border-top-color 0.3s ease" // Ajout d'une transition pour une animation fluide
                }}
              >
                <Button
                  onClick={() => {
                    handleActiveListe();
                    navigate("/directeur/gestionEFM/Details")
                  }}
                  sx={{
                    padding : 0 ,
                    ":hover" : {
                      color : "teal"
                    },
                    color : `${isActiveListe ? 'teal' : 'gray'}`
                  }}
                >
                  <p style={{margin : "0 33px", textAlign : 'center'}}>Détails <br/> EFM</p>
                </Button>
              </div>
              <div 
                style={{
                  width : "50%",
                  borderTop : `5px solid ${isActiveAjouter ? "teal" : "gray"}`, 
                  height : "60px", 
                  paddingTop : "5px",
                  transition: "border-top-color 0.3s ease" // Ajout d'une transition pour une animation fluide
                  }}
              >
                <Button 
                  onClick={() => {
                    handleIsActiveAjouter();
                    navigate("/directeur/gestionEFM/ListePropositions")
                  }}                  
                  sx={{
                    padding : 0,
                    ":hover" : {
                      color : "teal"
                    },
                    color : `${isActiveAjouter ? 'teal' : 'gray'}`
                  }}
                >
                  <p style={{margin : 0}}>Liste Propositions</p>
                </Button>
              </div>
            </div>
          </div>
          {props.component ? props.component : "not found"}
        </div>
      </Layout>
  )
}

export default GestionEFMs

