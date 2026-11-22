# Nome do Projeto McDonald-API

Um simple sistema de lanchonete inspirado na grande franquia de fast-food Wendy's

## Integrantes do Grupo
- Gustavo de Alcantara Sanches Oliveira
- Matheus de Almeida Villegas Reis

## Tecnologias Utilizadas
- Node.js
- Express
- Prisma ORM
- SQLite
- JavaScript
- Postman

## Funcionalidades

### Clientes
- Cadastrar clientes.
- Listar clientes.
- Buscar cliente por ID.
- Atualizar clientes.
- Excluir clientes.

### Pedidos
- Cadastrar pedidos vinculados a clientes.
- Listar pedidos com os dados dos clientes.
- Buscar pedido por ID.
- Atualizar pedidos.
- Excluir pedidos.

### Middlewares
- Validar dados dos pedidos.
- Validar IDs das URLs.
- Registrar requisições no terminal (Logger).

## Como Rodar o Projeto
1. Clone o repositório:
`git clone https://github.com/gustavoasoifsp/mc-donald.git`
2. Instale as dependências:
`npm install`
3. Crie as tabelas do banco de dados:
`npx prisma migrate dev`
4. Inicie o servidor:
`node src/server.js`

## Rotas Principais da API

URL base: http://localhost:3000

1. Clientes
POST /clientes – Cadastrar cliente.

GET /clientes – Listar todos os clientes com seus pedidos.

GET /clientes/:id – Buscar cliente por ID.

PUT /clientes/:id – Atualizar dados do cliente.

DELETE /clientes/:id – Excluir cliente.

2. Pedidos
POST /pedidos – Cadastrar pedido vinculado a um cliente.

GET /pedidos – Listar todos os pedidos com os dados dos clientes.

GET /pedidos/:id – Buscar pedido por ID.

PUT /pedidos/:id – Atualizar descrição e valor do pedido.

DELETE /pedidos/:id – Excluir pedido.

3. Sistema
- GET /status – Verificar se a API está online.

4. Middlewares
validarPedido.js – Valida descrição, valor e clienteId dos pedidos.

validarId.js – Valida IDs recebidos nas URLs.

logger.js – Registra todas as requisições no terminal em tempo real.

5. Códigos HTTP principais
200 – OK: Requisição realizada com sucesso.

201 – Created: Registro criado com sucesso.

204 – No Content: Registro excluído sem retorno de conteúdo.

400 – Bad Request: Dados ou ID inválidos.

404 – Not Found: Registro não encontrado.

409 – Conflict: Conflito, como email duplicado.

500 – Internal Server Error: Erro interno do servidor.
