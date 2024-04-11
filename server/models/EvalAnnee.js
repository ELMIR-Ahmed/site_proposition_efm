// EvalAnnee.js

'use strict';
module.exports = (sequelize, DataTypes) => {
    const EvalAnnee = sequelize.define('EvalAnnee', {
        idEval: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        annee: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        optimise: {
            type: DataTypes.ENUM('TRUE', 'FALSE'),
            allowNull: true
        },
        dureeGlobale: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        dureePresence: {
            type : DataTypes.INTEGER,
            allowNull : true
        },
        dureeFAD: {
            type : DataTypes.INTEGER,
            allowNull : true
        },
        typeEval: {
            type: DataTypes.STRING,
            allowNull: true
        },
        modeEval: {
            type: DataTypes.ENUM('TH', 'TP'),
            allowNull: true
        },
        dateDebutPropositions: {
            type: DataTypes.DATE,
            allowNull: true
        },
        dateFinPropositions: {
            type: DataTypes.DATE,
            allowNull: true
        },
        nbrMinimPropositions: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        observation: {
            type : DataTypes.STRING,
            allowNull : true
        },
    }, {
        tableName: 'evalannee',
        timestamps: false
    });

    EvalAnnee.associate = (models) => {
        EvalAnnee.belongsTo(models.Module, {
        foreignKey: 'Module_codeModule',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
        });
    };

    return EvalAnnee;
};
