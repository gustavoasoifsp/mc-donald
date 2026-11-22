
const prisma = require('../prisma');

// 1. CREATE - Cadastrar Cliente

async function criarCliente(req, res) {
    try {
        const { nome, email } = req.body;

        // Verificar campos obrigatórios
        if (!nome || !email) {
            return res.status(400).json({
                erro: "Nome e email são obrigatórios."
            });
        }

        const novoCliente = await prisma.cliente.create({
            data: {
                nome: nome,
                email: email
            }
        });

        return res.status(201).json(novoCliente);

    } catch (erro) {
    console.error("ERRO AO CADASTRAR CLIENTE:", erro);

    if (erro.code === 'P2002') {
        return res.status(409).json({
            erro: "Este email já está cadastrado. Utilize outro email."
        });
    }

    return res.status(500).json({
        erro: "Erro interno ao cadastrar cliente."
    });
}
}


// 2. READ - Listar Todos os Clientes
async function listarClientes(req, res) {
    try {
        const clientes = await prisma.cliente.findMany({
            include: {
                pedidos: true
            }
        });

        return res.status(200).json(clientes);

    } catch (erro) {
        return res.status(500).json({
            erro: "Erro ao listar clientes."
        });
    }
}

// 3. READ - Buscar Cliente por ID
async function buscarClientePorId(req, res) {
    try {
        const { id } = req.params;

        const cliente = await prisma.cliente.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                pedidos: true
            }
        });

        if (!cliente) {
            return res.status(404).json({
                erro: "Cliente não encontrado."
            });
        }

        return res.status(200).json(cliente);

    } catch (erro) {
        return res.status(500).json({
            erro: "Erro ao buscar cliente."
        });
    }
}

// 4. UPDATE - Atualizar Cliente
async function atualizarCliente(req, res) {
    try {
        const { id } = req.params;
        const { nome, email } = req.body;

        const clienteAtualizado = await prisma.cliente.update({
            where: {
                id: Number(id)
            },
            data: {
                nome: nome,
                email: email
            }
        });

        return res.status(200).json(clienteAtualizado);

    } catch (erro) {
        return res.status(404).json({
            erro: "Cliente não encontrado ou email já cadastrado."
        });
    }
}

// 5. DELETE - Excluir Cliente
async function apagarCliente(req, res) {
    try {
        const { id } = req.params;

        await prisma.cliente.delete({
            where: {
                id: Number(id)
            }
        });

        return res.status(204).send();

    } catch (erro) {
        return res.status(404).json({
            erro: "Cliente não encontrado ou possui pedidos vinculados."
        });
    }
}

module.exports = {
    criarCliente,
    listarClientes,
    buscarClientePorId,
    atualizarCliente,
    apagarCliente
};
