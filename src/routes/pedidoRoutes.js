
const express = require('express');
const router = express.Router();

const validarPedido = require('../middlewares/validarPedido');
const validarId = require('../middlewares/validarId');

const {
    criarPedido,
    listarPedidos,
    buscarPedidoPorId,
    atualizarPedido,
    apagarPedido
} = require('../controllers/pedidoController');

router.post('/pedidos', validarPedido, criarPedido);

router.get('/pedidos', listarPedidos);

router.get('/pedidos/:id', validarId, buscarPedidoPorId);

router.put('/pedidos/:id', validarId, validarPedido, atualizarPedido);

router.delete('/pedidos/:id', validarId, apagarPedido);

module.exports = router;
