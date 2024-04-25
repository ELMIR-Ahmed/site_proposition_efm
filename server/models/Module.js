// Module.js
module.exports = (sequelize, DataTypes) => {
    const Module = sequelize.define('Module', {
        codeModule: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        nomModule: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'module',
        timestamps: false
    });

    Module.associate = (models) => {
        Module.belongsTo(models.Filiere, {
        foreignKey: 'Filiere_codeFil',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
        });

        Module.hasMany(models.Personnel_has_Module, {foreignKey : 'Module_codeModule', onDelete : 'CASCADE'})
    };

    return Module;
};
