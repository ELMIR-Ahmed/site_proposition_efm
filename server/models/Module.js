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
});

Module.associate = (models) => {
    Module.belongsTo(models.EvalAnnee, {
        foreignKey: 'EvalAnnee_idEval',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });
    Module.belongsTo(models.Filiere, {
        foreignKey: 'Filiere_codeFil',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });
};

return Module;
};
