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
  });

  Groupe.associate = (models) => {
      Groupe.belongsTo(models.Filiere, {
          foreignKey: 'Filiere_codeFil',
          onDelete: 'NO ACTION',
          onUpdate: 'NO ACTION'
      });
  };

  return Groupe;
};
