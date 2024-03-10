const express = require('express');
const db = require('./models'); // Importez votre fichier de modèles Sequelize
const app = express();


app.use(express.json())

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