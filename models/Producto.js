'use strict';
module.exports = (sequelize, DataTypes) => {
const Producto = sequelize.define(
'Producto', { 
   idProducto: {
      type: DataTypes.INTEGER, 
      primaryKey:true, 
      allowNull:false,
      autoIncrement: true
   }, 
   nombre: {
      type: DataTypes.STRING
   }, 
   sku: {
      type: DataTypes.STRING
   }, 
   precio: {
      type: DataTypes.DECIMAL
   }
}, { 
  timestamps: true,
  paranoid: true,
  freezeTableName: true
  }
);

return Producto;
};
