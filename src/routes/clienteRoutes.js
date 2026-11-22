
const express = require('express');
const router = express.Router();

const validarId = require('../middlewares/validarId');

const {
    criarCliente,
    listarClientes,
    buscarClientePorId,
    atualizarCliente,
    apagarCliente
} = require('../controllers/clienteController');

router.post('/clientes', criarCliente);

router.get('/clientes', listarClientes);

router.get('/clientes/:id', validarId, buscarClientePorId);

router.put('/clientes/:id', validarId, atualizarCliente);

router.delete('/clientes/:id', validarId, apagarCliente);

module.exports = router;
