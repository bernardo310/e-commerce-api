const express = require("express");
const router = express.Router();
//const auth = require('../../middleware/auth');
const UsuariosController = require('../../controllers/usuarios');

//POST
router.post("/login", UsuariosController.logIn);
router.post("/", UsuariosController.postUsuario);

module.exports = router;
