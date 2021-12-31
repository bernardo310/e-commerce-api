const express = require("express");
const router = express.Router();
const { auth } = require('../../middleware/auth');
const ProductosController = require('../../controllers/productos');

//base '/productos'

//GET
router.get("/", auth, ProductosController.getProductos);


//POST
//router.post("/privilegeLevel", auth.valid, PersonsController.postPrivilegeLevel);
//router.get("/",  ProductosController.postProducto);
//router.post('/', ProductosController)


//PUT
//router.put("/privilegeLevel", auth.valid, PersonsController.putPrivilegeLevel);


//DELETE



module.exports = router;
