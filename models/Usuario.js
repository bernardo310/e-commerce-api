'use strict';
module.exports = (sequelize, DataTypes) => {
const Usuario = sequelize.define(
'Usuario', { 
   idUsuario: {
      type: DataTypes.INTEGER, 
      primaryKey:true, 
      allowNull:false,
      autoIncrement: true
   }, 
   usuario: {
      type: DataTypes.STRING
   }, 
   contraseña: {
      type: DataTypes.STRING
   }, 
   correo: {
      type: DataTypes.STRING
   }, 
   direccion: {
      type: DataTypes.STRING
   }
}, { 
  timestamps: true,
  paranoid: true,
  freezeTableName: true
  }
);

Usuario.associate = function(models) {
Usuario.hasOne(models.Carrito, {
 foreignKey: 'idUsuario',
 target: 'idUsuario'
});

Usuario.hasMany(models.Orden, {
 foreignKey: 'idUsuario',
 target: 'idUsuario'
});


}

return Usuario;
};
