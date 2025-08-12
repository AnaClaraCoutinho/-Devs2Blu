// API fake usando json-server
// Para rodar: npm install json-server
// Depois: node api.js

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data/produtos.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use('/produtos', router);

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});
