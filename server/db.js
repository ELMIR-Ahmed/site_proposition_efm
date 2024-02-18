// db.js

const mysql = require('mysql2');

// Créer une connexion à la base de données
const connection = mysql.createConnection({
    host: 'localhost',      // Adresse IP du serveur MySQL
    user: 'root',   // Nom d'utilisateur de la base de données
    password: '@hmed2003',   // Mot de passe de la base de données
    database: 'mydb'   // Nom de la base de données
});

// Exporter la connexion pour l'utiliser dans d'autres parties de l'application
module.exports = connection;
