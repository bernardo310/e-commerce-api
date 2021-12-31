'use strict';
module.exports = (sequelize, DataTypes) => {
const Carrito = sequelize.define(
'Carrito', { 
   idCarrito: {
      type: DataTypes.INTEGER, 
      primaryKey:true, 
      allowNull:false,
      autoIncrement: true
   }, 
   idUsuario: {
      type: DataTypes.INTEGER, 
      allowNull:false
   }, 
   total: {
      type: DataTypes.DECIMAL
   }
}, { 
  timestamps: true,
  paranoid: true,
  freezeTableName: true
  }
);

Carrito.associate = function(models) {
Carrito.belongsTo(models.Usuario, {
 foreignKey: 'idUsuario',
 target: 'idUsuario'
});

Carrito.hasMany(models.CarritoProducto, {
 foreignKey: 'idCarrito',
 target: 'idCarrito'
});


}

return Carrito;
};
