const bcrypt = require("bcryptjs");

const Usuarios = require("../actions/usuarios");

exports.logIn = async (req, res) => {
    //hacer login, y regresar token jwt
    try {
        const { correo, contraseña } = req.body;
        const token = await Usuarios.login({ correo, contraseña });
        res.status(200).json({ status: "success", data: { token } });
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: "error", error: "Correo o contraseña no válida" });
    }
};

exports.postUsuario = async (req, res) => {
    //crear usuario nuevo
    try {
        const { correo, contraseña, usuario, direccion } = req.body;
        // validar formato de correo w3resource
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(correo)) {
            return res.status(400).send({ status: "error", message: "Correo inválido" });
        }
        //validar que no exista usuario con mismo correo
        const usuarioExiste = await Usuarios.getUsuarioPorCorreo(correo);
        if (usuarioExiste) {
            res.status(400).json({status: "error",message: "Ya existe un usuario con ese correo.",});
        } else {
            const hash = bcrypt.hashSync(contraseña, 10);
            await Usuarios.createUser({
                correo,
                contraseña: hash,
                usuario,
                direccion
            });
            res.status(201).json({ status: "success", message: "Usuario creado" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: "error", error });
    }
};