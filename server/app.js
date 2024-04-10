const express = require('express');
const db = require('./models'); // Importez votre fichier de modèles Sequelize
const app = express();
const cors = require('cors')
const checkAuthenticationANDRole = require('./middlewares/authMiddleware')
const personnelRoutes = require('./routes/PersonnelRoutes')
const Personnel_has_ModuleRoutes = require('./routes/Personnel_has_ModuleRoutes')
const FiliereRoutes = require('./routes/FiliereRoutes')
const ModuleRoutes = require('./routes/ModuleRoutes')
const LoginRoute = require('./routes/loginRoute')

require('dotenv').config()

app.use(cors())

app.use(express.json())

app.use('/personnel', checkAuthenticationANDRole('directeur'), personnelRoutes);
app.use('/assignation', checkAuthenticationANDRole('directeur'), Personnel_has_ModuleRoutes);
app.use('/filiere', checkAuthenticationANDRole('directeur'), FiliereRoutes);
app.use('/module', checkAuthenticationANDRole('directeur'), ModuleRoutes);
app.use('/login', LoginRoute)

const port = process.env.PORT || 7000; // Utilisation de la variable d'environnement PORT, sinon le port 7000 par défaut

// Synchroniser les modèles avec la base de données
db.sequelize.sync({ force: false }).then(() => {
  console.log('Base de données synchronisée');
}).catch(err => {
  console.error('Erreur de synchronisation de la base de données :', err);
});

app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});