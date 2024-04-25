module.exports = (sequelize, DataTypes) => {
  const Groupe_has_passageEFM = sequelize.define('Groupe_has_passageEFM', {
    Groupe_idGrp : {
      type : DataTypes.INTEGER,
      allowNull : false,
      primaryKey : true,
      references : {
        model : 'Groupe',
        key : 'idGrp'
      }
    },
    PassageEFM_idPassage : {
      type : DataTypes.INTEGER,
      allowNull : false,
      primaryKey : true,
      references : {
        model : 'PassageEFM',
        key : 'idPassage'
      }
    }
  },{
    tableName : "Groupe_has_PassageEFM",
    timestamps: false
  }   
  )

  Groupe_has_passageEFM.associate = (models) => {
    Groupe_has_passageEFM.belongsTo(models.Groupe, { foreignKey : 'Groupe_idGrp', as : 'Groupe', onDelete : 'CASCADE' })
    Groupe_has_passageEFM.belongsTo(models.PassageEFM, { foreignKey : 'PassageEFM_idPassage', as : 'PassageEFM', onDelete : 'CASCADE' })
  }

  return Groupe_has_passageEFM
}