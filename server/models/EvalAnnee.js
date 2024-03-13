module.exports = (sequelize, DataTypes) => {
    const EvalAnnee = sequelize.define('EvalAnnee', {
        idEval: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        annee: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        optimise: {
            type: DataTypes.ENUM('TRUE', 'FALSE'),
            allowNull: false
        },
        dureeGlobale: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dureePresence: DataTypes.INTEGER,
        dureeFAD: DataTypes.INTEGER,
        typeEval: {
            type: DataTypes.STRING,
            allowNull: false
        },
        modeEval: {
            type: DataTypes.ENUM('TH', 'TP'),
            allowNull: false
        },
        dateDebutPropositions: {
            type: DataTypes.DATE,
            allowNull: false
        },
        dateFinPropositions: {
            type: DataTypes.DATE,
            allowNull: false
        },
        nbrMinimPropositions: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        observation: DataTypes.STRING(3000)
    },{
        tableName : "evalannee",
        timestamps: false // Désactiver les horodatages automatiques
    });

    return EvalAnnee;
};
