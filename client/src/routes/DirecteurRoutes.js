import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Statistiques from '../pages/directeur/Statistiques';
import GestionFor from '../pages/directeur/gestionFormateurs/GestionFor';
import ListerFromateurs from '../pages/directeur/gestionFormateurs/ListerFormateurs';
import AjouterFormateur from '../pages/directeur/gestionFormateurs/AjouterFormateur';
import GestionModFilGrp from '../pages/directeur/gestionMGF/GestionModFilGrp';
// import AjouterModule from '../pages/directeur/gestionMGF/AjouterModule';
import ListerModule from '../pages/directeur/gestionMGF/ListeModule';
import ListerFiliere from '../pages/directeur/gestionMGF/ListeFiliere';
import GestionEFMs from '../pages/directeur/gestionEFMs/GestionEFMs';
import Audit from '../pages/directeur/audit/Audit';

const DirecteurRoutes = () => {
  return (
    <Routes>
      <Route path='/statistique' element={<Statistiques />} />
      <Route path='/gestionFormateurs/Liste' element={<GestionFor isActive={true} component={<ListerFromateurs/>}/>}/>
      <Route path='/gestionFormateurs/Ajouter' element={<GestionFor component={<AjouterFormateur/>}/>}/>
      <Route path='/gestionModFilGrp/Filiere' element={<GestionModFilGrp component={<ListerFiliere/>}/>}/>
      <Route path='/gestionModFilGrp/Module' element={<GestionModFilGrp component={<ListerModule/>}/>}/>
      <Route path='/gestionEFM' element={<GestionEFMs/>}/>
      <Route path='/Audit' element={<Audit/>}/>
    </Routes>
  );
}

export default DirecteurRoutes;
