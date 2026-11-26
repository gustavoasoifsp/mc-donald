
const express = require('express');
const app = express();

const pedidoRoutes = require('./routes/pedidoRoutes');
const clienteRoutes = require('./routes/clienteRoutes');

const logger = require('./middlewares/logger');

const PORTA = 3000;

// Middleware para interpretar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware global de auditoria
app.use(logger);

// Front-end
const path = require('path');
app.use(express.static(path.join(__dirname, '..', 'public')));

// Rotas
app.use(clienteRoutes);
app.use(pedidoRoutes);

// Status da API
app.get('/status', (req, res) => {
    return res.json({
        status: "API Online - Sistema de Lanchonete"
    });
});

// Inicialização do servidor
app.listen(PORTA, () => {
    console.log(`[SERVIDOR OK] Rodando em http://localhost:${PORTA}`);
});
