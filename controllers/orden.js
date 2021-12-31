const Orden = require('../actions/ordenes');

exports.getOrdenes = async (req, res, next) => {
    //traer todas las ordenes de un usuario
    try {
        const { idUsuario } = req.usuario
        const ordenes = await Orden.readOrdenes({ idUsuario })
        res.send({ status: "success", data: ordenes });
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: "error", error });
    }
}

exports.postOrden = async (req, res, next) => {
    //crear orden sobre el carrito de un usuario
    try {
        const { idUsuario, idCarrito } = req.usuario
        const { idMetodoPago, direccion } = req.body
        const orden = await Orden.createOrden({ idUsuario, idCarrito, idMetodoPago, direccion })
        res.send({ status: "success", data: orden });
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: "error", error });
    }
}