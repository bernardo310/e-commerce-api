const express = require("express");
const router = express.Router();
const { auth } = require('../../middleware/auth');
const CarritoController = require('../../controllers/carrito');

//base '/carrito'

//GET
//router.get("/", auth, ProductosController.getProductos);

//POST
//router.post("/privilegeLevel", auth.valid, PersonsController.postPrivilegeLevel);


//PUT
router.put("/", auth, CarritoController.putModificarCarrito);


//DELETE



module.exports = router;
