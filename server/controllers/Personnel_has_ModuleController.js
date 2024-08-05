const {Personnel_has_Module, Personnel, Module, Groupe} = require('../models')

// const createAssignment = async (req, res) => {
//   try {
//     const {personnel_cin, ressources} = req.body;

//     const personnel = await Personnel.findByPk(personnel_cin);
//     if (!personnel) {
//         return res.status(400).json({ message: 'Personnel non trouvé.' });
//     }

//     // itérer sur le tableau des ressouces (modules, filiere, groupe) envoyé du coté client :
//     for(let i = 0 ; i < ressources.length ; i++){
//       const {code_module, id_groupe} = ressources[i];

//       const moduleExists = await Module.findByPk(code_module);
//       const groupeExists = await Groupe.findByPk(id_groupe);

  
//       if ( (moduleExists === null) || (groupeExists === null) ) {
//         return res.status(400).json({ message : "Une ou plusieurs instances associées ne sont pas trouvées." })
//       }

//       await Personnel_has_Module.create({
//         Personnel_CIN: personnel_cin,
//         Module_codeModule: code_module,
//         Groupe_idGrp: id_groupe
//       })
      
//     }
//     res.status(201).json({message : 'assignation réussite !'});
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

const createAssignment = async (req, res) => {
  try {
    const { personnel_cin, ressources } = req.body;

    const personnel = await Personnel.findByPk(personnel_cin);
    if (!personnel) {
      return res.status(400).json({ message: 'Personnel non trouvé.' });
    }

    // itérer sur le tableau des ressources (modules et groupes) envoyé du côté client :
    for (let i = 0; i < ressources.length; i++) {
      const { codeModule, groupes } = ressources[i];

      const moduleExists = await Module.findByPk(codeModule);
      if (!moduleExists) {
        return res.status(400).json({ message: `Module ${codeModule} non trouvé.` });
      }

      // itérer sur les groupes associés au module
      for (let j = 0; j < groupes.length; j++) {
        const { idGrp } = groupes[j];

        const groupeExists = await Groupe.findByPk(idGrp);
        if (!groupeExists) {
          return res.status(400).json({ message: `Groupe ${idGrp} non trouvé.` });
        }

        // Créer l'association
        await Personnel_has_Module.create({
          Personnel_CIN: personnel_cin,
          Module_codeModule: codeModule,
          Groupe_idGrp: idGrp
        });
      }
    }

    res.status(201).json({ message: 'Assignation réussie !' });
  } catch (error) {
    res.status(500).json({ message: `Ereeru => ${error}` });
  }
}


const getAssignmentsByPersonnel = async (req, res) => {
  try {
      const { CIN } = req.params;

      const personnel = await Personnel.findByPk(CIN);
      const personnelHasModuleExists = await Personnel_has_Module.findOne({where : { Personnel_CIN : CIN }})
      if (!personnel) {
          return res.status(400).json({ message: 'Personnel non trouvé.' });
      }
      if (!personnelHasModuleExists) {
        return res.status(400).json({ message : "Ce personnel n'a aucune assignation !" })
      }

      const assignments = await Personnel_has_Module.findAll({
          where: { Personnel_CIN : CIN },
          include: [
              { model: Module, as: 'Module', attributes: ['codeModule', 'nomModule'] },
              { model: Groupe, as: 'Groupe', attributes: ['idGrp', 'nomGrp', 'Filiere_codeFil'] }
          ]
      });

      // Création d'un objet pour stocker les modules et leurs groupes associés :
      const modulesAndGroupes = []
      for (let i = 0; i < assignments.length; i++) {
        const module = assignments[i].Module;
        const groupe = assignments[i].Groupe;

        // Trouver l'index du module dans modulesAndGroupes
        const index = modulesAndGroupes.findIndex(m => m.codeModule === module.codeModule);
        if (index === -1) {
          // Si le module n'est pas encore dans l'objet, ajoutez-le avec le groupe associé :
          modulesAndGroupes.push(
            {
              codeModule: module.codeModule,
              nomModule: module.nomModule,
              groupes: [groupe]
            }
          )
        } else {
          // Si le module est déjà dans l'objet, ajoutez simplement le groupe associé :
          modulesAndGroupes[index].groupes.push(groupe);
        }
      }
      res.status(200).json(modulesAndGroupes);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

/* pour modifier il suffit de  syu*/

// const updateAssignment = async (req, res) => {
//   try {
//     const {personnel_cin, newAssignments} = req.body;
//     const personnel = await Personnel.findByPk(personnel_cin);
//     if (!personnel) {
//         return res.status(400).json({ message: 'Personnel non trouvé.' });
//     }

//     await Personnel_has_Module.destroy({
//       where: { personnel_cin }
//     });

//     for(let i = 0 ; i < newAssignments.length ; i++){
//       const {code_module, id_groupe} = newAssignments[i];

//       const moduleExists = Module.findByPk(code_module);
//       const groupeExists = Filiere.findByPk(id_groupe);

//       if (!moduleExists || !groupeExists ) {
//         return res.send(400).json({ message : "Une ou plusieurs instances associées ne sont pas trouvées." })
//       }

    //   await Personnel_has_Module.create({
    //     personnel_cin,
//         code_module,
//         id_groupe
//       }) 
//     }

//     res.status(200).json({message : 'Affectations mises à jour avec succès !'});
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const deleteAssignment = async (req, res) => {
  try {
    const {CIN} = req.params
    const {groupe, module} = req.body
    const personnelExists = await Personnel.findByPk(CIN)
    const personnelHasModuleExists = await Personnel_has_Module.findOne({ where : { Personnel_CIN : CIN }});
    if (personnelExists === null) {
      return res.status(400).json({ message : "Personnel non trouvé !" })
    }
    if (!personnelHasModuleExists) {
      return res.status(400).json({message : "Ce personnel n'a aucune assignation !"})
    }
    if (groupe || module) {
      if (groupe) {
        await Personnel_has_Module.destroy({ where : { Groupe_idGrp : groupe } })
        return res.status(200).json({ message : "Désaffection du groupe avec succes !"})
      }
      if (module) {
        await Personnel_has_Module.destroy({ where : { Module_codeModule : module } })
        return res.status(200).json({ message : "Désaffection du module avec succes !"})
      }
    } else {
      await Personnel_has_Module.destroy({where: { Personnel_CIN : CIN }});
      res.status(200).json({message : 'Affectations supprimées avec succès !'});
    }
    
  } catch (error) {
    res.status(500).json({ message : error.message })
  }
}

module.exports = {
  createAssignment, 
  getAssignmentsByPersonnel,
  deleteAssignment
}
