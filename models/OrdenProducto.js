'use strict';
module.exports = (sequelize, DataTypes) => {
const OrdenProducto = sequelize.define(
'OrdenProducto', { 
   idOrdenProducto: {
      type: DataTypes.INTEGER, 
      primaryKey:true, 
      allowNull:false,
      autoIncrement: true
   }, 
   cantidad: {
      type: DataTypes.INTEGER
   }, 
   idOrden: {
      type: DataTypes.INTEGER, 
      allowNull:false
   }, 
   idProducto: {
      type: DataTypes.INTEGER, 
      allowNull:false
   }
}, { 
  timestamps: true,
  paranoid: true,
  freezeTableName: true
  }
);

OrdenProducto.associate = function(models) {
OrdenProducto.belongsTo(models.Producto, {
 foreignKey: 'idProducto',
 target: 'idProducto'
});


}

return OrdenProducto;
};
