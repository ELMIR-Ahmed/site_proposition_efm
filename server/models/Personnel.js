module.exports = (sequelize, DataTypes) => {
const Personnel = sequelize.define('Personnel', {
    CIN: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    statut: {
        type: DataTypes.ENUM('statutaire', 'vacataire', 'contractuel', 'coopérant'),
        allowNull: false
    },
    matricule: DataTypes.STRING,
    fonction: {
        type: DataTypes.ENUM('formateur', 'directeur', 'directeur complexe'),
        allowNull: false
    },
    secteur: {
        type: DataTypes.STRING,
        allowNull: false
    },
    motDePasse: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { 
    tableName: 'personnel', // Nom de la table dans la base de données
    timestamps: false // Désactiver les horodatages automatiques 
});

return Personnel;
};
