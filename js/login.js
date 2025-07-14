const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const entrarBtn = document.getElementById('entrar');

function verificarCampos() {
    if (emailInput.value.trim() !== "" && senhaInput.value.trim() !== "") {
        entrarBtn.disabled = false;
    } else {
        entrarBtn.disabled = true;
    }
}

emailInput.addEventListener('input', verificarCampos);
senhaInput.addEventListener('input', verificarCampos);

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    localStorage.setItem('email', emailInput.value.trim());
    window.location.href = 'listagem.html'; // ou qualquer outra página que fará a listagem
});
