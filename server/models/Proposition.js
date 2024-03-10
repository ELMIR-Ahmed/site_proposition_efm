module.exports = (sequelize, DataTypes) => {
  const Proposition = sequelize.define('Proposition', {
      idProp: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
      },
      nbrProposisions: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      sujet1: {
          type: DataTypes.BLOB,
          allowNull: false
      },
      sujet2: {
          type: DataTypes.BLOB,
          allowNull: false
      },
      sujet3: {
          type: DataTypes.BLOB,
          allowNull: false
      },
      sujet4: {
          type: DataTypes.BLOB,
          allowNull: false
      },
      dateEnvoi: {
          type: DataTypes.DATE,
          allowNull: false
      },
      valide: {
          type: DataTypes.ENUM('VRAI', 'FAUX'),
          allowNull: false
      },
      dateValidation: {
          type: DataTypes.DATE,
          allowNull: false
      },
      observation: DataTypes.STRING(3000)
  });

  Proposition.associate = (models) => {
      Proposition.belongsTo(models.Module, {
          foreignKey: 'Module_codeModule',
          onDelete: 'NO ACTION',
          onUpdate: 'NO ACTION'
      });
      Proposition.belongsTo(models.Personnel, {
          foreignKey: 'Personnel_CIN',
          onDelete: 'NO ACTION',
          onUpdate: 'NO ACTION'
      });
  };

  return Proposition;
};
