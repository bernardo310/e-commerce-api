const Carrito = require('../actions/carritos');

exports.putModificarCarrito = async (req, res, next) => {
    //actualizar productos en carrito
    try {
        const { idCarrito } = req.usuario
        const { idProducto, cantidad } = req.body
        const carrito = await Carrito.updateCarrito({ idCarrito, idProducto, cantidad })
        res.send({ status: "success", data: carrito });
    } catch (error) {
        res.status(400).json({ status: "error", error });
    }
}