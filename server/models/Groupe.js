module.exports = (sequelize, DataTypes) => {
    const Groupe = sequelize.define('Groupe', {
        idGrp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nomGrp: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        tableName : "groupe",
        timestamps: false // Désactiver les horodatages automatiques
    });

    Groupe.associate = (models) => {
        Groupe.belongsTo(models.Filiere, {
            foreignKey: 'Filiere_codeFil',
            onDelete: 'CASCADE',
            onUpdate: 'NO ACTION'
        });
        Groupe.hasMany(models.Personnel_has_Module, {foreignKey : 'Groupe_idGrp', onDelete : 'CASCADE'})
        Groupe.hasMany(models.Groupe_has_passageEFM, {foreignKey : 'Groupe_idGrp', as : 'GroupesPassage', onDelete : 'CASCADE'})
    };

    return Groupe;
};
