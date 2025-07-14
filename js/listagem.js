const emailLogado = localStorage.getItem('email') || 'Não logado';
document.getElementById('email-logado').textContent = emailLogado;

let parceiros = [];

async function carregarParceiros() {
    try {
        const response = await fetch('https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros');
        parceiros = await response.json();
        exibirCards(parceiros);
    } catch (err) {
        console.error('Erro ao carregar parceiros:', err);
    }
}

function exibirCards(lista) {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';

    lista.forEach(parceiro => {
        const avatar = pegarAvatar(parceiro.tipoParceiro);
        const dataInclusao = new Date(parceiro.dataCriacao).toLocaleDateString('pt-BR');

        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
            <div class="card h-100 shadow-sm" style="cursor:pointer">
                <img src="${avatar}" class="card-img-top" style="height:200px; object-fit:cover;" alt="Avatar">
                <div class="card-body">
                    <h5 class="card-title">${parceiro.nomeParceiro}</h5>
                    <p class="card-text"><strong>Bairro:</strong> ${parceiro.bairro}</p>
                    <p class="card-text"><small class="text-muted">Incluído em: ${dataInclusao}</small></p>
                </div>
            </div>
        `;

        card.addEventListener('click', () => {
            window.location.href = `detalhe.html?id=${parceiro.id}`;
        });

        container.appendChild(card);
    });
}

function pegarAvatar(tipo) {
    switch(tipo) {
        case 'ECO': return './img/eco.png';
        case 'COO': return './img/cop.png';
        case 'PEVs': return './img/pev.png';
        default: return './img/outros.jpg';
    }
}

document.getElementById('btn-pesquisar').addEventListener('click', () => {
    const termo = document.getElementById('pesquisa').value.toLowerCase();

    const filtrados = parceiros.filter(p =>
        p.nomeParceiro.toLowerCase().includes(termo) ||
        p.bairro.toLowerCase().includes(termo)
    );

    exibirCards(filtrados);
});

carregarParceiros();
