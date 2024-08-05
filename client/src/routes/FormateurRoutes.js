import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AnnonceEFMs from '../pages/formateur/AnnonceEFMs'

const FormateurRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<AnnonceEFMs/>}/>
    </Routes>
  )
}

export default FormateurRoutes
