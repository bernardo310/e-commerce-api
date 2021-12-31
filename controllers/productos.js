const Productos = require('../actions/productos');

exports.getProductos = async (req, res, next) => {
    //leer productos
    try {
        const { nombre, sku, minPrecio, maxPrecio, limite, pagina } = req.query
        //TODO validate 
        const productos = await Productos.readProductos({ nombre, sku, minPrecio, maxPrecio, limite, pagina })
        res.send({ data: productos });
    } catch (error) {
        res.status(400).json({ status: "error", error });
        next(error);
    }
}