const express = require('express');
const db = require('./models'); // Importez votre fichier de modèles Sequelize
const app = express();
const cors = require('cors')
const checkAuthenticationANDRole = require('./middlewares/authMiddleware')
const personnelRoutes = require('./routes/PersonnelRoutes')
const Personnel_has_ModuleRoutes = require('./routes/Personnel_has_ModuleRoutes')
const FiliereRoutes = require('./routes/FiliereRoutes')
const ModuleRoutes = require('./routes/ModuleRoutes')
const EvalAnneeRoutes = require('./routes/EvalAnneeRoutes')
const LoginRoute = require('./routes/loginRoute')
const GroupeRoutes = require('./routes/GroupeRoutes')
const Propositions   = require('./routes/PropositionRoutes')
const { Module } = require('./models')
const fs = require('fs')
const path = require('path');



require('dotenv').config()

const multer = require('multer');


app.use(cors())

app.use(express.json())

app.use('/personnel', checkAuthenticationANDRole('directeur'), personnelRoutes);
app.use('/assignation', checkAuthenticationANDRole(['directeur', 'formateur']), Personnel_has_ModuleRoutes);
app.use('/filiere', checkAuthenticationANDRole('directeur'), FiliereRoutes);
app.use('/module', checkAuthenticationANDRole(['directeur', 'formateur']), ModuleRoutes);
app.use('/evalAnnee', checkAuthenticationANDRole(['directeur', 'formateur']), EvalAnneeRoutes)
app.use('/groupe', checkAuthenticationANDRole('directeur'), GroupeRoutes)
app.use('/login', LoginRoute)
app.use('/propositions', Propositions)


const port = process.env.PORT || 7000; // Utilisation de la variable d'environnement PORT, sinon le port 7000 par défaut

// Synchroniser les modèles avec la base de données
db.sequelize.sync({ force: false, alter: true }).then(() => {
  console.log('Base de données synchronisée');
}).catch(err => {
  console.error('Erreur de synchronisation de la base de données :', err);
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const { CIN, codeModule } = req.query; // Récupérer les valeurs depuis les paramètres de l'URL
    const originalName = file.originalname;
    cb(null, `${CIN}-${codeModule}-${originalName}`);
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  const { CIN, codeModule } = req.query; // Récupérer les valeurs depuis les paramètres de l'URL
  const file = req.file;
  if (!file) {
    return res.status(400).send({ message: 'Please upload a file.' });
  }
  // Vous pouvez enregistrer les informations du fichier et du module dans la base de données ici.
  res.send({ message: 'File uploaded successfully.', file });
});


// Récuperer les fichiers
const filesNames = path.join(__dirname, 'uploads');

app.get('/files', (req, res) => {
  fs.readdir(filesNames, (err, files) => {
    if (err) {
      return res.status(500).json({message : 'la lecture du dossier a echoué !'})
    }
    res.json(files)
  })
})

// Route pour télécharger le fichier
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, 'uploads', filename);
  res.download(filepath);
});

app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});