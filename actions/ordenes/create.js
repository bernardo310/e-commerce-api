const { Sequelize, Orden, OrdenProducto, Carrito, CarritoProducto, Usuario, Producto } = require('../../models');

const createOrden = async ({ idUsuario, idCarrito, idMetodoPago, direccion }) => {
    //leer direccion de usuario guardada si no se especifica
    if (!direccion) {
        const usuarioData = await Usuario.findOne({ where: { idUsuario } })
        direccion = usuarioData.direccion
    }

    //leer productos en carrito
    let productosCarrito = await CarritoProducto.findAll({
        where: idCarrito,
        attributes: [
            'idProducto',
            'cantidad',
            [Sequelize.col('Producto.nombre'), 'producto'],
            [Sequelize.col('Producto.precio'), 'precio'],
        ],
        include: {
            model: Producto,
            attributes: []
        },
        raw: true
    })
    //validar que hayan productos en el carrito
    if(productosCarrito.length == 0) throw 'No hay productos en el carrito'
    
    //calcular total de orden y por producto
    let totalOrden = 0;
    productosCarrito = productosCarrito.map(prod => {
        let totalProducto = prod.precio * prod.cantidad
        totalOrden += totalProducto
        return {
            ...prod,
            total: totalProducto
        }
    })

    //crear nueva orden
    const nuevaOrden = await Orden.create({
        total: totalOrden,
        direccion,
        idUsuario,
        idEstatus: 1,//1solicitada, 2enproceso, 3completada
        idMetodoPago
    })

    //crear ordenproducto
    let promises = []
    productosCarrito.forEach(producto => {
        promises.push(OrdenProducto.create({
            cantidad: producto.cantidad,
            idOrden: nuevaOrden.idOrden,
            idProducto: producto.idProducto
        }))
    })
    await Promise.all(promises)

    //vaciar carrito
    await CarritoProducto.destroy({ where: { idCarrito } })
    await Carrito.update({ total: 0 }, { where: { idCarrito } })

    return {
        orden: {
            ...nuevaOrden.dataValues,
            productos: productosCarrito
        }
    }
}

module.exports = {
    createOrden
}