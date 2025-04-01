import { fetchClientePorId, editarCliente } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const filtroClientesForm = document.getElementById('filtroClientesForm');
    const resultadosBuscaDiv = document.getElementById('resultadosBusca');
    const editarClienteSection = document.getElementById('editarClienteSection');
    const editarClienteForm = document.getElementById('editarClienteForm');
    const idClienteInput = document.getElementById('idClienteId');
    const nomeInput = document.getElementById('nome');
    const cpfInput = document.getElementById('cpf');
    const dataNascimentoInput = document.getElementById('dataNascimento');
    const enderecoInput = document.getElementById('endereco');
    const contatosContainer = document.getElementById('contatosContainer');

    async function buscarClientes(nome = '', cpf = '') {
        resultadosBuscaDiv.innerHTML = '<p>Buscando clientes...</p>';
        try {
            const { fetchCliente: buscar } = await import('./api.js');
            const clientes = await buscar(nome, cpf);
            resultadosBuscaDiv.innerHTML = '';

            if (clientes && clientes.length > 0) {
                clientes.forEach(cliente => {
                    const clienteDiv = document.createElement('div');
                    clienteDiv.innerHTML = `<p>${cliente.nome} - ${cliente.cpf} <button class="selecionar-btn" data-id="${cliente.id}">Selecionar</button></p>`;
                    resultadosBuscaDiv.appendChild(clienteDiv);
                });

                const selecionarButtons = resultadosBuscaDiv.querySelectorAll('.selecionar-btn');
                selecionarButtons.forEach(button => {
                    button.addEventListener('click', async function() {
                        const idParaEditar = this.dataset.id;
                        idClienteInput.value = idParaEditar;
                        await carregarDadosClienteCompleto(idParaEditar);
                        editarClienteSection.style.display = 'block';
                        resultadosBuscaDiv.style.display = 'none';
                    });
                });
            } else {
                resultadosBuscaDiv.innerHTML = '<p>Nenhum cliente encontrado.</p>';
            }
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
            resultadosBuscaDiv.innerHTML = '<p>Erro ao buscar clientes.</p>';
        }
    }

    async function carregarDadosClienteCompleto(id) {
        try {
            const cliente = await fetchClientePorId(id);
            if (cliente) {
                nomeInput.value = cliente.nome;
                cpfInput.value = cliente.cpf;
                dataNascimentoInput.value = cliente.dataNascimento || '';
                enderecoInput.value = cliente.endereco || '';

                contatosContainer.innerHTML = '';
                let contatoCounter = 1;

                cliente.contatos.forEach(contato => {
                    const novoContatoDiv = document.createElement('div');
                    novoContatoDiv.className = 'contato';
                    novoContatoDiv.innerHTML = `
                        <h3>Contato ${contatoCounter}</h3>
                        <div>
                            <label for="tipoContato${contatoCounter}">Tipo:</label>
                            <input type="text" id="tipoContato${contatoCounter}" name="tipo[]" value="${contato.tipo}" required>
                        </div>
                        <div>
                            <label for="valorContato${contatoCounter}">Valor:</label>
                            <input type="text" id="valorContato${contatoCounter}" name="valor[]" value="${contato.valor}" required>
                        </div>
                        <div>
                            <label for="observacaoContato${contatoCounter}">Observação:</label>
                            <input type="text" id="observacaoContato${contatoCounter}" name="observacao[]" value="${contato.observacao || ''}">
                        </div>
                        <button type="button" onclick="removerContato(this)">Remover</button>
                    `;
                    contatosContainer.appendChild(novoContatoDiv);
                    contatoCounter++;
                });
            } else {
                alert('Cliente não encontrado.');
                editarClienteSection.style.display = 'none';
                resultadosBuscaDiv.style.display = 'block';
            }
        } catch (error) {
            console.error('Erro ao carregar dados do cliente:', error);
            alert('Erro ao carregar dados do cliente.');
            editarClienteSection.style.display = 'none';
            resultadosBuscaDiv.style.display = 'block';
        }
    }

    filtroClientesForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const nomeFiltro = document.getElementById('filtroNome').value;
        const cpfFiltro = document.getElementById('filtroCpf').value;
        buscarClientes(nomeFiltro, cpfFiltro);
    });

    const idClienteURL = new URLSearchParams(window.location.search).get('id');
    if (idClienteURL) {
        idClienteInput.value = idClienteURL;
        carregarDadosClienteCompleto(idClienteURL);
        editarClienteSection.style.display = 'block';
        resultadosBuscaDiv.style.display = 'none';
    } else {
        editarClienteSection.style.display = 'none';
    }

    editarClienteForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const idParaAtualizar = idClienteInput.value;
        const clienteAtualizado = {
            nome: nomeInput.value,
            cpf: cpfInput.value,
            dataNascimento: dataNascimentoInput.value,
            endereco: enderecoInput.value
        };
        try {
            await editarCliente(idParaAtualizar, clienteAtualizado);
            alert('Cliente atualizado com sucesso!');
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            alert('Erro ao atualizar cliente. Por favor, tente novamente.');
        }
    });

    window.adicionarContato = function() {
        let contatoCounter = contatosContainer.children.length + 1;
        const novoContatoDiv = document.createElement('div');
        novoContatoDiv.className = 'contato';
        novoContatoDiv.innerHTML = `
            <h3>Contato ${contatoCounter}</h3>
            <div>
                <label for="tipoContato${contatoCounter}">Tipo:</label>
                <input type="text" id="tipoContato${contatoCounter}" name="tipo[]" required>
            </div>
            <div>
                <label for="valorContato${contatoCounter}">Valor:</label>
                <input type="text" id="valorContato${contatoCounter}" name="valor[]" required>
            </div>
            <div>
                <label for="observacaoContato${contatoCounter}">Observação:</label>
                <input type="text" id="observacaoContato${contatoCounter}" name="observacao[]">
            </div>
            <button type="button" onclick="removerContato(this)">Remover</button>
        `;
        contatosContainer.appendChild(novoContatoDiv);
    };

    window.removerContato = function(botaoRemover) {
        const contatoDiv = botaoRemover.parentElement;
        contatosContainer.removeChild(contatoDiv);
    };
});