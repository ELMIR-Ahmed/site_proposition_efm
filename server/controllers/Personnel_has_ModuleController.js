const {Personnel_has_Module, Personnel, Module, Groupe} = require('../models')

const createAssignment = async (req, res) => {
  try {
    const {personnel_cin, ressources} = req.body;

    const personnel = await Personnel.findByPk(personnel_cin);
    if (!personnel) {
        return res.status(400).json({ message: 'Personnel non trouvé.' });
    }

    // itérer sur le tableau des ressouces (modules, filiere, groupe) envoyé du coté client :
    for(let i = 0 ; i < ressources.length ; i++){
      const {code_module, id_groupe} = ressources[i];

      const moduleExists = await Module.findByPk(code_module);
      const groupeExists = await Groupe.findByPk(id_groupe);

  
      if ( (moduleExists === false) || (groupeExists === false) ) {
        return res.status(400).json({ message : "Une ou plusieurs instances associées ne sont pas trouvées." })
      }

      await Personnel_has_Module.create({
        Personnel_CIN: personnel_cin,
        Module_codeModule: code_module,
        Groupe_idGrp: id_groupe
      })
      
    }
    res.status(201).json({message : 'assignation réussite !'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



const getAssignmentsByPersonnel = async (req, res) => {
  try {
      const { CIN } = req.params;

      // Vérifiez si le personnel existe
      const personnel = await Personnel.findByPk(CIN);
      if (!personnel) {
          return res.status(400).json({ message: 'Personnel non trouvé.' });
      }

      // Récupérez toutes les instances de Personnel_has_Module associées au personnel
      const assignments = await Personnel_has_Module.findAll({
          where: { Personnel_CIN : CIN },
          include: [
              { model: Module, as: 'Module', attributes: ['codeModule', 'nomModule'] },
              { model: Groupe, as: 'Groupe', attributes: ['idGrp', 'nomGrp'] }
          ]
      });

      // Transformez les données pour ne renvoyer que les informations nécessaires
      const result = assignments.map(assignment => ({
          module: assignment.Module,
          groupe: assignment.Groupe
      }));

      res.status(200).json(result);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};



const updateAssignment = async (req, res) => {
  try {
    const {personnel_cin, newAssignments} = req.body;
    const personnel = await Personnel.findByPk(personnel_cin);
    if (!personnel) {
        return res.status(400).json({ message: 'Personnel non trouvé.' });
    }

    // Supprimez toutes les affectations existantes pour ce membre du personnel
    await Personnel_has_Module.destroy({
      where: { personnel_cin }
    });

    // Créez les nouvelles affectations
    for(let i = 0 ; i < newAssignments.length ; i++){
      const {code_module, id_groupe} = newAssignments[i];

      const moduleExists = Module.findByPk(code_module);
      const groupeExists = Filiere.findByPk(id_groupe);

      if (!moduleExists || !groupeExists ) {
        return res.send(400).json({ message : "Une ou plusieurs instances associées ne sont pas trouvées." })
      }

      await Personnel_has_Module.create({
        personnel_cin,
        code_module,
        id_groupe
      }) 
    }

    res.status(200).json({message : 'Affectations mises à jour avec succès !'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const deleteAssignment = async (req, res) => {
  const { CIN } = req.params;
  
  const personnelExists = await Personnel.findByPk(CIN);
  const personnelHasModuleExists = await Personnel_has_Module.findOne(CIN);

  if (!personnelExists) {
    return res.status(400).json({message : "Personnel non trouvé !"})
  }

  if (!personnelHasModuleExists) {
    return res.status(400).json({message : "Ce personnel n'a aucune assignation !"})
  }

  await Personnel_has_Module.destroy({
    where: { CIN }
  });

  res.status(200).json({message : 'Affectations supprimées avec succès !'});

}


module.exports = {
  createAssignment, 
  getAssignmentsByPersonnel,
  updateAssignment,
  deleteAssignment
}
