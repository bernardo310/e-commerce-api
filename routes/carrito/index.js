const express = require("express");
const router = express.Router();
const { auth } = require('../../middleware/auth');
const CarritoController = require('../../controllers/carrito');

//base '/carrito'

//PUT
router.put("/", auth, CarritoController.putModificarCarrito);

module.exports = router;
