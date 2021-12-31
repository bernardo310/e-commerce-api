'use strict';
module.exports = (sequelize, DataTypes) => {
const Estatus = sequelize.define(
'Estatus', { 
   idEstatus: {
      type: DataTypes.INTEGER, 
      primaryKey:true, 
      allowNull:false,
      autoIncrement: true
   }, 
   estatus: {
      type: DataTypes.STRING
   }
}, { 
  timestamps: true,
  paranoid: true,
  freezeTableName: true
  }
);

return Estatus;
};
