
const prisma = require('../prisma');

// 1. CREATE - Cadastrar Pedido
async function criarPedido(req, res) {
    try {
        const { descricao, valor, clienteId } = req.body;

        const novoPedido = await prisma.pedido.create({
            data: {
                descricao: descricao,
                valor: Number(valor),
                clienteId: Number(clienteId)
            },
            include: {
                cliente: true
            }
        });

        return res.status(201).json(novoPedido);

    } catch (erro) {
        return res.status(500).json({
            erro: "Erro ao criar pedido. Verifique se o clienteId existe."
        });
    }
}

// 2. READ - Listar Todos os Pedidos com Relacionamento
async function listarPedidos(req, res) {
    try {
        const pedidos = await prisma.pedido.findMany({
            include: {
                cliente: true
            }
        });

        return res.status(200).json(pedidos);

    } catch (erro) {
        return res.status(500).json({
            erro: "Erro ao listar pedidos."
        });
    }
}

// 3. READ - Buscar Pedido por ID
async function buscarPedidoPorId(req, res) {
    try {
        const { id } = req.params;

        const pedido = await prisma.pedido.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                cliente: true
            }
        });

        if (!pedido) {
            return res.status(404).json({
                erro: "Pedido não encontrado."
            });
        }

        return res.status(200).json(pedido);

    } catch (erro) {
        return res.status(500).json({
            erro: "Erro ao buscar pedido."
        });
    }
}

// 4. UPDATE - Atualizar Pedido
async function atualizarPedido(req, res) {
    try {
        const { id } = req.params;
        const { descricao, valor } = req.body;

        const pedidoAtualizado = await prisma.pedido.update({
            where: {
                id: Number(id)
            },
            data: {
                descricao: descricao,
                valor: Number(valor)
            },
            include: {
                cliente: true
            }
        });

        return res.status(200).json(pedidoAtualizado);

    } catch (erro) {
        return res.status(404).json({
            erro: "Pedido não encontrado para atualização."
        });
    }
}

// 5. DELETE - Excluir Pedido
async function apagarPedido(req, res) {
    try {
        const { id } = req.params;

        await prisma.pedido.delete({
            where: {
                id: Number(id)
            }
        });

        return res.status(204).send();

    } catch (erro) {
        return res.status(404).json({
            erro: "Pedido não encontrado para exclusão."
        });
    }
}

module.exports = {
    criarPedido,
    listarPedidos,
    buscarPedidoPorId,
    atualizarPedido,
    apagarPedido
};
