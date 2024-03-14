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
        timestamps: false
    });

    Personnel_has_Module.associate = (models) => {
        Personnel_has_Module.belongsTo(models.Personnel, { foreignKey: 'Personnel_CIN', as: 'Personnel' });
        Personnel_has_Module.belongsTo(models.Module, { foreignKey: 'Module_codeModule', as: 'Module' });
        Personnel_has_Module.belongsTo(models.Groupe, { foreignKey: 'Groupe_idGrp', as: 'Groupe' });
    };

    return Personnel_has_Module;

};