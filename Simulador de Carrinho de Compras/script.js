
let carrinho = [];


const botoesAdicionar = document.querySelectorAll('.adicionar');


botoesAdicionar.forEach(botao => {
    botao.addEventListener('click', () => {
        const produto = botao.parentElement;
        const nome = produto.querySelector('h2').textContent;
        const preco = parseFloat(produto.querySelector('p').textContent.replace('Preço: R$ ', ''));

     
        adicionarProduto(nome, preco);
      
        atualizarCarrinho();
    });
});


function adicionarProduto(nome, preco) {
   
    const produtoExistente = carrinho.find(item => item.nome === nome);
    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }
}

function removerProduto(nome) {
    carrinho = carrinho.filter(item => item.nome !== nome);
    atualizarCarrinho();
}


function atualizarCarrinho() {
    const listaCarrinho = document.getElementById('lista-carrinho');
    const totalSpan = document.getElementById('total');
    let total = 0;

    
    listaCarrinho.innerHTML = '';

   
    carrinho.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.nome}</span>
            <span>${item.quantidade}</span>
            <span>R$ ${item.preco.toFixed(2)}</span>
            <button class="remover">Remover</button>
        `;
        listaCarrinho.appendChild(li);

       
        li.querySelector('.remover').addEventListener('click', () => {
            removerProduto(item.nome);
        });

        total += item.preco * item.quantidade;
    });

    totalSpan.textContent = total.toFixed(2);
}


document.addEventListener('input', (event) => {
    if (event.target && event.target.classList.contains('quantidade')) {
        const nomeProduto = event.target.dataset.nome;
        const novaQuantidade = parseInt(event.target.value);

      
        atualizarQuantidade(nomeProduto, novaQuantidade);
    }
});

function atualizarQuantidade(nome, novaQuantidade) {
    const produto = carrinho.find(item => item.nome === nome);
    if (produto) {
        produto.quantidade = novaQuantidade;
        atualizarCarrinho();
    }
}
