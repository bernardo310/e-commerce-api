const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jwt-simple');

const { Usuario } = require('../../models');
const { Carrito } = require('../../models');
const { getUsuarioPorCorreo } = require('./read');

const tokenSecret = process.env.TOKEN_SECRET;

const createUser = async ({ correo, contraseña, usuario, direccion }) => {
    //crear usuario
    const nuevoUsuario = await Usuario.create({ correo, contraseña, usuario, direccion });
    //crear carrito para usuario
    await Carrito.create({ idUsuario: nuevoUsuario.idUsuario });
}

const createToken = async ({ idUsuario, usuario, correo }) => {
    const expires = moment().add(9999, 'months').valueOf();
    const carrito = await Carrito.findOne({ where: idUsuario })
    const token = jwt.encode({
        idUsuario,
        usuario,
        correo,
        idCarrito: carrito.idCarrito,
        exp: expires,
    }, tokenSecret);
    return token;
};

const verificarContraseña = (contraseña, usuario) => {
    return bcrypt.compare(contraseña, usuario.contraseña).then(async (resultado) => {
        if (resultado) {
            const token = await createToken(usuario);
            return token;
        }
        throw new Error('No Match');
    });
}


const login = async ({ correo, contraseña }) => {
    const usuario = await getUsuarioPorCorreo(correo);
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    return verificarContraseña(contraseña, usuario);
};

module.exports = {
    createUser,
    login,
};