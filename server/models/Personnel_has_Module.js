module.exports = (sequelize, DataTypes) => {
    const Personnel_has_Module = sequelize.define('Personnel_has_Module', {
        Personnel_CIN: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Personnel',
                key: 'CIN'
            }
        },
        Module_codeModule: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Module',
                key: 'codeModule'
            }
        },
        Filiere_codeFil: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Filiere',
                key: 'codeFil'
            }
        },
        Groupe_idGrp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Groupe',
                key: 'idGrp'
            }
        }
    },{
        tableName : "personnel_has_module",
        timestamps: false // Désactiver les horodatages automatiques
    });

    return Personnel_has_Module;
};
