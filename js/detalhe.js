const params = new URLSearchParams(window.location.search);
const id = params.get('id');

if (!id) {
    document.getElementById('detalhe-parceiro').innerHTML = `
        <div class="alert alert-danger">Nenhum parceiro selecionado.</div>
    `;
} else {
    carregarParceiro(id);
}

async function carregarParceiro(id) {
    try {
        const response = await fetch(`https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros/${id}`);
        const parceiro = await response.json();
        exibirDetalhe(parceiro);
    } catch (err) {
        console.error('Erro ao buscar parceiro:', err);
        document.getElementById('detalhe-parceiro').innerHTML = `
            <div class="alert alert-danger">Erro ao carregar parceiro.</div>
        `;
    }
}

function exibirDetalhe(p) {
    const avatar = pegarAvatar(p.tipoParceiro);
    const dataCadastro = new Date(p.dataCriacao).toLocaleDateString('pt-BR');

    const residuos = [];
    if (p.papel) residuos.push('Papel');
    if (p.plastico) residuos.push('Plástico');
    if (p.vidro) residuos.push('Vidro');
    if (p.metal) residuos.push('Metal');
    if (p.oleoCozinha) residuos.push('Óleo de Cozinha');
    if (p.pilhaBateria) residuos.push('Pilhas e Baterias');
    if (p.eletronico) residuos.push('Eletrônicos');
    if (p.roupa) residuos.push('Roupas');
    if (p.outros) residuos.push('Outros');

    document.getElementById('detalhe-parceiro').innerHTML = `
        <div class="card shadow">
            <img src="${avatar}" class="card-img-top" style="height:300px; object-fit:cover;" alt="Avatar">
            <div class="card-body">
                <h4 class="card-title mb-3">${p.nomeParceiro}</h4>
                <p><strong>Tipo:</strong> ${pegarTipoNome(p.tipoParceiro)}</p>
                <p><strong>Responsável:</strong> ${p.responsavelParceiro}</p>
                <p><strong>Telefone:</strong> ${p.telResponsavel}</p>
                <p><strong>Email:</strong> ${p.emailResponsavel}</p>
                <p><strong>Endereço:</strong> Rua ${p.rua}, Nº ${p.numero}, Bairro ${p.bairro}</p>
                <p><strong>Data de Cadastro:</strong> ${dataCadastro}</p>
                <hr>
                <h5>Tipos de resíduos aceitos:</h5>
                <ul>
                    ${residuos.map(r => `<li>${r}</li>`).join('')}
                </ul>
            </div>
            <a href="./listagem.html" class="btn btn-danger">voltar</a>
        </div>
    `;
}

function pegarAvatar(tipo) {
    switch(tipo) {
        case 'ECO': return './img/eco.png';
        case 'COO': return './img/cop.png';
        case 'PEVs': return './img/pev.png';
        default: return './img/outros.jpg';
    }
}

function pegarTipoNome(tipo) {
    switch(tipo) {
        case 'ECO': return 'Ecoponto';
        case 'COO': return 'Cooperativa';
        case 'PEVs': return 'Ponto de Entrega Voluntária';
        default: return 'Outro';
    }
}
