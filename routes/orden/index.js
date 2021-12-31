const express = require("express");
const router = express.Router();
const { auth } = require('../../middleware/auth');
const OrdenController = require('../../controllers/orden');

//base '/carrito'

//GET
router.get("/", auth, OrdenController.getOrdenes);

//POST
router.post("/", auth, OrdenController.postOrden);
//router.post("/privilegeLevel", auth.valid, PersonsController.postPrivilegeLevel);


//PUT


//DELETE



module.exports = router;
