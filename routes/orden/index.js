const express = require("express");
const router = express.Router();
const { auth } = require('../../middleware/auth');
const OrdenController = require('../../controllers/orden');

//base '/orden'

//GET
router.get("/", auth, OrdenController.getOrdenes);

//POST
router.post("/", auth, OrdenController.postOrden);

module.exports = router;
