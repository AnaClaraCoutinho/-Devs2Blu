// URL da nossa API fake (Node.js vai rodar localmente)
const API_URL = 'http://localhost:3000/produtos';

// Ao carregar a página, lista os produtos
document.addEventListener('DOMContentLoaded', listarProdutos);

// Captura o envio do formulário para criar ou editar produto
document.getElementById('produtoForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('produtoId').value;
    const nome = document.getElementById('nome').value;
    const preco = parseFloat(document.getElementById('preco').value);

    // Produto a ser enviado
    const produto = { nome, preco: parseFloat(preco) };

    try {
        if (id) {
            // Edita produto existente
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(produto)
            });
        } else {
            // Cria novo produto
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(produto)
            });
        }
        listarProdutos();
        document.getElementById('produtoForm').reset();
        document.getElementById('produtoId').value = '';
    } catch (err) {
        console.error('Erro ao salvar produto:', err);
    }
});

// Função para listar produtos
async function listarProdutos() {
    try {
        const res = await fetch(API_URL);
        const produtos = await res.json();

        const tbody = document.getElementById('listaProdutos');
        tbody.innerHTML = '';

        produtos.forEach(p => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${p.nome}</td>
                <td>R$ ${p.preco.toFixed(2)}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarProduto(${p.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="excluirProduto(${p.id})">Excluir</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        console.error('Erro ao listar produtos:', err);
    }
}

// Função para carregar dados no formulário para edição
async function editarProduto(id) {
    const res = await fetch(`${API_URL}/${id}`);
    const produto = await res.json();

    document.getElementById('produtoId').value = produto.id;
    document.getElementById('nome').value = produto.nome;
    document.getElementById('preco').value = produto.preco;
}

// Função para excluir produto
async function excluirProduto(id) {
    if (confirm('Tem certeza que deseja excluir?')) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        listarProdutos();
    }
}
