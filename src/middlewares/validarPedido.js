
function validarPedido(req, res, next) {
    const { descricao, valor, clienteId } = req.body;

    // Validar descrição
    if (
        !descricao ||
        typeof descricao !== 'string' ||
        descricao.trim().length < 5
    ) {
        return res.status(400).json({
            erro: "A descrição é obrigatória e deve ter no mínimo 5 caracteres."
        });
    }

    // Validar valor
    const valorNumerico = Number(valor);

    if (
        valor === undefined ||
        valor === null ||
        valor === '' ||
        !Number.isFinite(valorNumerico) ||
        valorNumerico <= 0
    ) {
        return res.status(400).json({
            erro: "O valor é obrigatório e deve ser um número maior que zero."
        });
    }

    // Validar clienteId somente no cadastro
    if (req.method === 'POST') {
        const idNumerico = Number(clienteId);

        if (
            clienteId === undefined ||
            clienteId === null ||
            clienteId === '' ||
            !Number.isInteger(idNumerico) ||
            idNumerico <= 0
        ) {
            return res.status(400).json({
                erro: "O clienteId é obrigatório e deve ser um número inteiro válido."
            });
        }

        req.body.clienteId = idNumerico;
    }

    // Sanitização dos dados
    req.body.descricao = descricao.trim();
    req.body.valor = valorNumerico;

    next();
}

module.exports = validarPedido;
