module.exports = (sequelize, DataTypes) => {
    const Filiere = sequelize.define('Filiere', {
        codeFil: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        nomFil: {
            type: DataTypes.STRING,
            allowNull: false
        },
        anneeFil: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return Filiere;
};
