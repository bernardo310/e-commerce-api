const { Producto } = require('../../models');
const { Op } = require('sequelize')

const readProductos = async ({ nombre, sku, minPrecio, maxPrecio, limite = 100, pagina = 1 }) => {
    const where = {}
    //agregar filtro rango de precio a where
    if (minPrecio !== undefined || maxPrecio !== undefined) {
        where["precio"] = {
            [Op.between]: [
                minPrecio !== undefined ? minPrecio : 0,
                maxPrecio !== undefined ? maxPrecio : 99999999
            ]
        }
    }
    //agregar busqueda por nombre a where
    if (nombre !== undefined) {
        where["nombre"] = {
            [Op.like]: `%${nombre.toLowerCase()}%`
        }
    //agregar busqueda por sku a where
    } else if (sku !== undefined) {
        where["sku"] = sku
    }

    //contar total de productos
    const numProductos = await Producto.count({
        where,
    });

    //validar que hayan productos
    if(numProductos == 0) throw 'No se encontraron productos'

    //validar que no sean 0
    if (limite == 0) limite = 15
    if (pagina == 0) pagina = 1

    //buscar productos
    const productos = await Producto.findAll({
        where,
        limit: limite,
        offset: (pagina - 1) * limite
    });

    return {
        productos,
        numProductos,
        paginasTotal: Math.ceil(numProductos / limite),
        paginaActual: parseInt(pagina)
    }
}

module.exports = {
    readProductos
};