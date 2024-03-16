const express = require('express');
const db = require('./models'); // Importez votre fichier de modèles Sequelize
const app = express();
const personnelRoutes = require('./routes/PersonnelRoutes')
const Personnel_has_ModuleRoutes = require('./routes/Personnel_has_ModuleRoutes')
const FiliereRoutes = require('./routes/FiliereRoutes')


app.use(express.json())

app.use('/personnel', personnelRoutes);
app.use('/assignation', Personnel_has_ModuleRoutes);
app.use('/filiere', FiliereRoutes);

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