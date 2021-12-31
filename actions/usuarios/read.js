const { Usuario, Carrito } = require('../../models');

const getUsuarioPorCorreo = (correo) => {
    return Usuario.findOne({
        where: {
            correo
        }
    });
}

module.exports = {
    getUsuarioPorCorreo
};