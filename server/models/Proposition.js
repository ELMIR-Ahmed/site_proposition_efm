module.exports = (sequelize, DataTypes) => {
    const Proposition = sequelize.define('Proposition', {
        idProp: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        dateEnvoi: {
            type: DataTypes.DATE,
            allowNull: true // Ajout de allowNull: false si nécessaire
        },
        valide: {
            type: DataTypes.ENUM('VRAI', 'FAUX'),
            allowNull: true // Ajout de allowNull: false si nécessaire
        },
        dateValidation: {
            type: DataTypes.DATE,
            allowNull: true
        },
        observation: {
            type: DataTypes.STRING(3000),
            allowNull : true
        },
        Personnel_CIN: {
            type: DataTypes.STRING, // Chaîne de caractères
            allowNull: true // Définir à true si cette valeur peut être nulle
        },
        Module_codeModule: {
            type: DataTypes.STRING, // Chaîne de caractères
            allowNull: true // Définir à true si cette valeur peut être nulle
        }
    }, {
        tableName: 'proposition',
        timestamps: false // Désactiver les horodatages automatiques
    });

    Proposition.associate = (models) => {
        Proposition.belongsTo(models.Module, {
            foreignKey: 'Module_codeModule',
        });
        Proposition.belongsTo(models.Personnel, {
            foreignKey: 'Personnel_CIN',
        });
    };

    return Proposition;
};
