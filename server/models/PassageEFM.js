module.exports = (sequelize, DataTypes) => {
    const PassageEFM = sequelize.define('PassageEFM', {
        idPassage: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        datePassagePrevue: {
            type: DataTypes.DATE,
            allowNull: false
        },
        datePassageReelle: {
            type: DataTypes.DATE,
            allowNull: false
        },
        dateCorrection: {
            type: DataTypes.DATE,
            allowNull: false
        },
        dateReceptionCopie: {
            type: DataTypes.DATE,
            allowNull: false
        },
        nbrCopies: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dateAudit: {
            type: DataTypes.DATE,
            allowNull: false
        },
        audite: {
            type: DataTypes.ENUM('TRUE', 'FALSE'),
            allowNull: false
        },
        observation: DataTypes.STRING(2000)
    },{
        tableName : "passageefm",
        timestamps: false // Désactiver les horodatages automatiques
    });

    PassageEFM.associate = (models) => {
        PassageEFM.belongsTo(models.Groupe, {
            foreignKey: 'Groupe_idGrp',
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION'
        });
        PassageEFM.belongsTo(models.Proposition, {
            foreignKey: 'Proposition_idProp',
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION'
        });
    };

    return PassageEFM;
};
