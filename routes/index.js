const express = require('express');
const router = express.Router();

// const TestRoutes = require('./test');

// const AlertsRoutes = require('./alerts');
// const AreasRoutes = require('./areas');
const UsuariosRoutes = require('./usuarios');
const ProductosRoutes = require('./productos');
const CarritoRoutes = require('./carrito');
const OrdenRoutes = require('./orden');


module.exports = (base_url, app) => {
    //   router.use('/test', TestRoutes);
    //   router.use('/alerts', AlertsRoutes);
    router.use('/usuarios', UsuariosRoutes);
    router.use('/productos', ProductosRoutes);
    router.use('/carrito', CarritoRoutes);
    router.use('/orden', OrdenRoutes);


    app.get('/', (req, res) => {
        res.send('<h1> NODE API Working </h1>');
    });
    app.use(base_url, router);
};