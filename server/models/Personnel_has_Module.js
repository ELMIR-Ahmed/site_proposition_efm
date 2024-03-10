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
      Filiere_codeFil: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
          references: {
              model: 'Filiere',
              key: 'codeFil'
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
  });

  return Personnel_has_Module;
};
