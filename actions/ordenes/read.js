const { Sequelize, sequelize, Orden, OrdenProducto, Producto, Estatus, MetodoPago } = require('../../models');

const readOrdenes = async ({ idUsuario }) => {
    //leer todas las ordenes del usuario
    const ordenes = await Orden.findAll({
        where: { idUsuario },
        attributes: [
            'idOrden',
            'total',
            'direccion',
            [Sequelize.col('Estatus.estatus'), 'estatus'],
            [Sequelize.col('MetodoPago.metodoPago'), 'metodoPago'],
            ['createdAt', 'fechaCreacion'],
            ['updatedAt', 'fechaUltimaActualizacion'],
        ],
        include: [{
            model: Estatus,
            attributes: []
        }, {
            model: MetodoPago,
            attributes: []
        }],
        raw: true
    })
    //leer productos de cada orden
    let ordenesDetalle = []
    for (let orden of ordenes) {
        const productos = await OrdenProducto.findAll({
            where: { idOrden: orden.idOrden },
            attributes: [
                [Sequelize.col('Producto.idProducto'), 'idProducto'],
                [Sequelize.col('Producto.nombre'), 'producto'],
                'cantidad',
                [Sequelize.col('Producto.precio'), 'precio'],
                [Sequelize.literal('precio * cantidad'), 'total'],
            ],
            include: {
                model: Producto,
                attributes: []
            }
        })
        ordenesDetalle.push({ ...orden, productos })
    }
    return ordenesDetalle
}

module.exports = {
    readOrdenes
}