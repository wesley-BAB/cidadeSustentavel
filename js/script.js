async function enviarParceiro() {
    const form = document.getElementById('form-parceiro');
    const formData = new FormData(form);

    const data = {
        nomeParceiro: formData.get('nomeParceiro'),
        tipoParceiro: formData.get('tipoParceiro'),
        responsavelParceiro: formData.get('responsavelParceiro'),
        telResponsavel: formData.get('telResponsavel'),
        emailResponsavel: formData.get('emailResponsavel'),
        rua: formData.get('rua'),
        numero: parseInt(formData.get('numero')),
        bairro: formData.get('bairro'),
        papel: formData.get('papel') ? true : false,
        plastico: formData.get('plastico') ? true : false,
        vidro: formData.get('vidro') ? true : false,
        metal: formData.get('metal') ? true : false,
        oleoCozinha: formData.get('oleoCozinha') ? true : false,
        pilhaBateria: formData.get('pilhaBateria') ? true : false,
        eletronico: formData.get('eletronico') ? true : false,
        roupa: formData.get('roupa') ? true : false,
        outros: formData.get('outros') ? true : false
    };

    try {
        const response = await fetch('https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            window.alert('Dados enviados com sucesso!');
            form.reset();
            var modalEl = document.getElementById('modal')
            var modal = bootstrap.Modal.getInstance(modalEl)
            modal.hide()
        } else {
            window.alert('Erro ao enviar dados. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro:', error);
        window.alert('Erro na requisição. Verifique sua conexão.');
    }
}
