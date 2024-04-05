import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Statistiques from '../pages/directeur/Statistiques';
import Gestion from '../pages/directeur/gestionFormateurs/Gestion';
// import AjouterFormateur from '../pages/directeur/gestionFormateurs/AjouterFormateur';

const DirecteurRoutes = () => {
  return (
    <Routes>
      <Route path='/statistique' element={<Statistiques />} />
      <Route path='/gestionFormateurs' element={<Gestion />} />
      {/* Ajoutez d'autres routes ici si nécessaire */}
    </Routes>
  );
}

export default DirecteurRoutes;
