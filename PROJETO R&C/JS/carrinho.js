document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('menu');
  if (toggle) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
    });
  }

  const containerCarrinho = document.getElementById('carrinho-container');
  const btnFinalizar = document.getElementById('finalizar');

  if (containerCarrinho) {
    renderizarCarrinho();
    btnFinalizar.addEventListener('click', finalizarCompra);
  }

  const botoes = document.querySelectorAll('.card button');
  botoes.forEach((botao, index) => {
    botao.addEventListener('click', () => {
      adicionarAoCarrinho(produtos[index]);
    });
  });
});

function getCarrinho() {
  return JSON.parse(localStorage.getItem('carrinho')) || [];
}

function salvarCarrinho(carrinho) {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function adicionarAoCarrinho(produto) {
  const carrinho = getCarrinho();
  const itemExistente = carrinho.find(item => item.id === produto.id);

  if (itemExistente) {
    if (itemExistente.quantidade < produto.estoque) {
      itemExistente.quantidade++;
    } else {
      alert("Estoque esgotado para este produto!");
    }
  } else {
    carrinho.push({ ...produto, quantidade: 1 });
  }

  salvarCarrinho(carrinho);
  alert(`${produto.nome} adicionado ao carrinho.`);
}

function renderizarCarrinho() {
  const carrinho = getCarrinho();
  const container = document.getElementById('carrinho-container');
  const totalSpan = document.getElementById('total');
  container.innerHTML = '';
  let total = 0;

  if (carrinho.length === 0) {
    container.innerHTML = '<p class="mensagem-carrinho-vazio">Seu carrinho está vazio.</p>';
    totalSpan.innerText = "";
    return;
  }

  const grid = document.createElement('div');
  grid.classList.add('carrinho-grid');

  carrinho.forEach(prod => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <img src="${prod.imagem}" alt="${prod.nome}" />
      <h3>${prod.nome}</h3>
      <p>R$ ${prod.preco.toFixed(2)}</p>
      <p>Quantidade: ${prod.quantidade}</p>
    `;
    grid.appendChild(div);
    total += prod.preco * prod.quantidade;
  });

  container.appendChild(grid);
  totalSpan.innerText = `Total: R$ ${total.toFixed(2)}`;
}

function finalizarCompra() {
  localStorage.removeItem('carrinho');
  alert("Compra finalizada com sucesso!");
  renderizarCarrinho();
}

// Verifica se existem produtos na página (index.html ou categoria.html)
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');

  if (cards.length > 0) {
    const botoes = document.querySelectorAll('.card button');

    botoes.forEach((botao, i) => {
      botao.addEventListener('click', () => {
        adicionarAoCarrinho(produtos[i]);
      });
    });
  }
});

// Renderiza produtos na página inicial
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('produtos-container');
  if (container) {
    renderizarProdutos(produtos);

    const botoes = document.querySelectorAll('.card button');
    botoes.forEach((botao, i) => {
      botao.addEventListener('click', () => {
        adicionarAoCarrinho(produtos[i]);
      });
    });
  }
});

function renderizarProdutos(lista) {
  const container = document.getElementById('produtos-container');
  if (!container) return;

  container.innerHTML = '';

  lista.forEach(prod => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${prod.imagem}" alt="${prod.nome}" />
      <h3>${prod.nome}</h3>
      <p>R$ ${prod.preco.toFixed(2)}</p>
      <p>${prod.estoque} unidades</p>
      <button ${prod.estoque === 0 ? 'disabled' : ''}>Adicionar ao carrinho</button>
    `;
    container.appendChild(card);
  });

  const botoes = document.querySelectorAll('.card button');
  botoes.forEach((botao, i) => {
    botao.addEventListener('click', () => {
      adicionarAoCarrinho(lista[i]);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('produtos-container');
  if (container) {
    renderizarProdutos(produtos);
  }

  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
    });
  }
});
