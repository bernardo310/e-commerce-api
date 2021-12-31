'use strict';
module.exports = (sequelize, DataTypes) => {
const Orden = sequelize.define(
'Orden', { 
   idOrden: {
      type: DataTypes.INTEGER, 
      primaryKey:true, 
      allowNull:false,
      autoIncrement: true
   }, 
   total: {
      type: DataTypes.DECIMAL
   }, 
   direccion: {
      type: DataTypes.STRING
   }, 
   idUsuario: {
      type: DataTypes.INTEGER, 
      allowNull:false
   }, 
   idEstatus: {
      type: DataTypes.INTEGER, 
      allowNull:false
   }, 
   idMetodoPago: {
      type: DataTypes.INTEGER, 
      allowNull:false
   }
}, { 
  timestamps: true,
  paranoid: true,
  freezeTableName: true
  }
);

Orden.associate = function(models) {
Orden.belongsTo(models.Usuario, {
 foreignKey: 'idUsuario',
 target: 'idUsuario'
});

Orden.belongsTo(models.Estatus, {
 foreignKey: 'idEstatus',
 target: 'idEstatus'
});

Orden.belongsTo(models.MetodoPago, {
 foreignKey: 'idMetodoPago',
 target: 'idMetodoPago'
});

Orden.hasMany(models.OrdenProducto, {
 foreignKey: 'idOrden',
 target: 'idOrden'
});


}

return Orden;
};
