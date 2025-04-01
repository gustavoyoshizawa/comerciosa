import { cadastrarCliente } from './api.js';

document.getElementById('cadastroClienteForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const cliente = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        dataNascimento: document.getElementById('dataNascimento').value,
        endereco: document.getElementById('endereco').value,
        contatos: []
    };
    document.querySelectorAll('.contato').forEach((contatoDiv, index) => {
        cliente.contatos.push({
            tipo: document.getElementById(`tipoContato${index + 1}`).value,
            valor: document.getElementById(`valorContato${index + 1}`).value,
            observacao: document.getElementById(`observacaoContato${index + 1}`).value
        });
    });
    try {
        await cadastrarCliente(cliente);
        alert('Cliente cadastrado com sucesso!');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        alert('Erro ao cadastrar cliente. Verifique o console para mais detalhes.');
    }
    function adicionarContato() {
        const contatosContainer = document.getElementById('contatosContainer');
        const novoContato = document.createElement('div');
        novoContato.className = 'contato';
        const numeroContato = contatosContainer.children.length + 1;
        novoContato.innerHTML = `
        <h3>Contato ${numeroContato}</h3>
        <div>
            <label for="tipoContato${numeroContato}">Tipo:</label>
            <input type="text" id="tipoContato${numeroContato}" name="tipo[]" required>
        </div>
        <div>
            <label for="valorContato${numeroContato}">Valor:</label>
            <input type="text" id="valorContato${numeroContato}" name="valor[]" required>
        </div>
        <div>
            <label for="observacaoContato${numeroContato}">Observação:</label>
            <input type="text" id="observacaoContato${numeroContato}" name="observacao[]">
        </div>
        <button type="button" onclick="removerContato(this.parentNode)">Remover</button>
    `;
        contatosContainer.appendChild(novoContato);
    }

    function removerContato(contatoDiv) {
        const contatosContainer = document.getElementById('contatosContainer');
        contatosContainer.removeChild(contatoDiv);
        atualizarNumerosContatos();
    }

    function atualizarNumerosContatos() {
        const contatos = document.querySelectorAll('#contatosContainer .contato');
        contatos.forEach((contato, index) => {
            contato.querySelector('h3').textContent = `Contato ${index + 1}`;
            contato.querySelectorAll('label').forEach(label => {
                const forAttr = label.getAttribute('for');
                if (forAttr) {
                    label.setAttribute('for', forAttr.replace(/\d+$/, index + 1));
                }
            });
            contato.querySelectorAll('input').forEach(input => {
                const idAttr = input.getAttribute('id');
                if (idAttr) {
                    input.setAttribute('id', idAttr.replace(/\d+$/, index + 1));
                }
            });
        });
    }
});