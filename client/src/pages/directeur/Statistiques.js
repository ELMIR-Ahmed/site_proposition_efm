import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import { useNavigate } from 'react-router-dom'
import Dashboard from '../../components/Dashboard';



function Statistiques() {
  const navigate = useNavigate()

  useEffect(() => {
    const isLogged = JSON.parse(localStorage.getItem('token')).token
    if(!isLogged) {
      navigate('/')
    }
  })

  return (
    <div style={{padding : "30px"}}>
      <Layout>
        <h1>hello</h1>
      </Layout>
        {/* <Dashboard /> */}
    </div>
  )
}

export default Statistiques
