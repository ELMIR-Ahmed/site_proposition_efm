import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Statistiques from '../pages/directeur/Statistiques';
import GestionFor from '../pages/directeur/gestionFormateurs/GestionFor';
import ListerFromateurs from '../pages/directeur/gestionFormateurs/ListerFormateurs';
import AjouterFormateur from '../pages/directeur/gestionFormateurs/AjouterFormateur';
import GestionModFilGrp from '../pages/directeur/gestionMGF/GestionModFilGrp';
import ListerModule from '../pages/directeur/gestionMGF/ListeModule';
import ListerFiliere from '../pages/directeur/gestionMGF/ListeFiliere';
import GestionEFMs from '../pages/directeur/gestionEFMs/GestionEFMs';
import Audit from '../pages/directeur/audit/Audit';
import DescriptionModule from '../pages/directeur/gestionMGF/DescriptionModule';
import ListeGroupe from '../pages/directeur/gestionMGF/ListeGroupe';
import UpdateModule from '../pages/directeur/gestionMGF/UpdateModule';
import UpdateFormateur from '../pages/directeur/gestionFormateurs/UpdateFormateur';
import DetailsEFM from '../pages/directeur/gestionEFMs/DetailsEFM';

const DirecteurRoutes = () => {
  return (
    <Routes>
      <Route path='/statistique' element={<Statistiques />} />
      <Route path='/gestionFormateurs/Liste' element={<GestionFor isActive={true} component={<ListerFromateurs/>}/>}/>
      <Route path='/gestionFormateurs/Liste/:CIN' element={<GestionFor component={<UpdateFormateur/>}/>}/>
      <Route path='/gestionFormateurs/Ajouter' element={<GestionFor component={<AjouterFormateur/>}/>}/>
      <Route path='/gestionModFilGrp/Filiere' element={<GestionModFilGrp component={<ListerFiliere/>}/>}/>
      <Route path='/gestionModFilGrp/Module' element={<GestionModFilGrp component={<ListerModule/>}/>}/>
      <Route path='/gestionModFilGrp/Groupe' element={<GestionModFilGrp component={<ListeGroupe/>}/>}/>
      <Route path='/gestionModFilGrp/Module/Description/:codeMod' element={<GestionModFilGrp component={<DescriptionModule/>}/>}/>
      <Route path='/gestionModFilGrp/Module/Update/:codeMod' element={<GestionModFilGrp component={<UpdateModule />}/>}/>
      <Route path='/gestionEFM/Details' element={<GestionEFMs component={<DetailsEFM/>} />}/>
      <Route path='/Audit' element={<Audit/>}/>
    </Routes>
  );
}

export default DirecteurRoutes;
