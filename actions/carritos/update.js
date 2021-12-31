const { Sequelize, Carrito, CarritoProducto, Producto } = require('../../models');

const updateCarrito = async ({ idCarrito, idProducto, cantidad }) => {
    //validar que producto sea valido
    const productoValido = await Producto.count({ where: { idProducto } })
    if (!productoValido) throw 'Producto no valido'

    //actualizar valores de carrito
    if (cantidad <= 0) {
        //eliminar producto de carrito
        await CarritoProducto.destroy({ where: { idCarrito, idProducto } })
    } else {
        //checar si producto ya existe en carrito
        const productoEnCarrito = await CarritoProducto.findOne({ where: { idCarrito, idProducto } })
        if (productoEnCarrito) {
            //actualizar cantidad de producto en carrito
            await CarritoProducto.update({ cantidad }, {
                where: { idCarrito, idProducto }
            })
        } else {
            //crear producto en carrito
            await CarritoProducto.create({ idCarrito, idProducto, cantidad })
        }
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
        order: ['idProducto'],
        raw: true
    })

    //calcular total de carrito y de producto
    let totalCarrito = 0;
    productosCarrito = productosCarrito.map(prod => {
        let totalProducto = prod.precio * prod.cantidad
        totalCarrito += totalProducto
        return {
            ...prod,
            total: totalProducto
        }
    })

    //actualizar total de carrito y leer nuevo carrito
    const carrito = (await Carrito.update({ total: totalCarrito }, {
        where: { idCarrito },
        returning: true
    }))[1][0].dataValues

    return {
        carrito: {
            ...carrito,
            productos: productosCarrito
        }
    }
}

module.exports = {
    updateCarrito,
}