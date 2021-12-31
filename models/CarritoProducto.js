'use strict';
module.exports = (sequelize, DataTypes) => {
const CarritoProducto = sequelize.define(
'CarritoProducto', { 
   idCarritoProducto: {
      type: DataTypes.INTEGER, 
      primaryKey:true, 
      allowNull:false,
      autoIncrement: true
   }, 
   cantidad: {
      type: DataTypes.INTEGER
   }, 
   idCarrito: {
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

CarritoProducto.associate = function(models) {
CarritoProducto.belongsTo(models.Carrito, {
 foreignKey: 'idCarrito',
 target: 'idCarrito'
});

CarritoProducto.belongsTo(models.Producto, {
 foreignKey: 'idProducto',
 target: 'idProducto'
});


}

return CarritoProducto;
};
