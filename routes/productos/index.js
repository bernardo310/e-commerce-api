const express = require("express");
const router = express.Router();
const { auth } = require('../../middleware/auth');
const ProductosController = require('../../controllers/productos');

//base '/productos'

//GET
router.get("/", auth, ProductosController.getProductos);

module.exports = router;
