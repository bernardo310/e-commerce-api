'use strict';
module.exports = (sequelize, DataTypes) => {
const MetodoPago = sequelize.define(
'MetodoPago', { 
   idMetodoPago: {
      type: DataTypes.INTEGER, 
      primaryKey:true, 
      allowNull:false,
      autoIncrement: true
   }, 
   metodoPago: {
      type: DataTypes.STRING
   }
}, { 
  timestamps: true,
  paranoid: true,
  freezeTableName: true
  }
);

return MetodoPago;
};
