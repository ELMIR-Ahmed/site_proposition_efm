const {Personnel_has_module, Personnel, Module, Filiere, Groupe} = require('../models')

const createAssignment = async (req, res) => {
  try {
    const {personnel_cin, ressources} = req.body;

    const personnel = await Personnel.findByPk(personnel_cin);
    if (!personnel) {
        return res.status(400).json({ message: 'Personnel non trouvé.' });
    }

    // itérer sur le tableau des ressouces (modules, filiere, groupe) envoyé du coté client :
    for(let i = 0 ; i < ressources.length ; i++){
      const {code_module, code_filiere, id_groupe} = ressources[i];

      const moduleExists = Module.findByPk(code_module);
      const filiereExists = Filiere.findByPk(code_filiere);
      const groupeExists = Filiere.findByPk(id_groupe);

  
      if (!moduleExists || !filiereExists || !groupeExists ) {
        return res.send(400).json({ message : "Une ou plusieurs instances associées ne sont pas trouvées." })
      }

      await Personnel_has_module.create({
        personnel_cin,
        code_module,
        code_filiere,
        id_groupe
      }) 
      
    }
    res.status(201).json({message : 'assignation réussite !'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



const getAssignmentsByPersonnel = async (req, res) => {
  try {
      const { Personnel_CIN } = req.params;

      // Vérifiez si le personnel existe
      const personnel = await Personnel.findByPk(Personnel_CIN);
      if (!personnel) {
          return res.status(400).json({ message: 'Personnel non trouvé.' });
      }

      // Récupérez toutes les instances de Personnel_has_Module associées au personnel
      const assignments = await Personnel_has_module.findAll({
          where: { Personnel_CIN },
          include: [
              { model: Module, as: 'Module', attributes: ['codeModule', 'nomModule'] },
              { model: Filiere, as: 'Filiere', attributes: ['codeFil', 'nomFil'] },
              { model: Groupe, as: 'Groupe', attributes: ['idGrp', 'nomGrp'] }
          ]
      });

      // Transformez les données pour ne renvoyer que les informations nécessaires
      const result = assignments.map(assignment => ({
          module: assignment.Module,
          filiere: assignment.Filiere,
          groupe: assignment.Groupe
      }));

      res.status(200).json(result);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAssignment, 
  getAssignmentsByPersonnel,
  deleteAssignment,
  updateAssignment
}
