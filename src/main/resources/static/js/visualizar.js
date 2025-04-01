import { fetchClientePorId, excluirCliente } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const filtroClientesForm = document.getElementById('filtroClientesForm');
    const listaClientesDiv = document.getElementById('listaClientes');

    async function carregarClientes(nome = '', cpf = '') {
        listaClientesDiv.innerHTML = '<p>Carregando clientes...</p>';
        try {
            const { fetchCliente: buscar } = await import('./api.js');
            const clientes = await buscar(nome, cpf);

            console.log('Dados da API:', clientes);

            listaClientesDiv.innerHTML = '';

            if (clientes && clientes.length > 0) {
                for (const cliente of clientes) {
                    const clienteCompleto = await fetchClientePorId(cliente.id);

                    console.log('Cliente completo:', clienteCompleto);

                    const item = document.createElement('div');
                    item.innerHTML = `
                        <h3>${clienteCompleto.nome} - ${clienteCompleto.cpf}</h3>
                        <p>Data de Nascimento: ${clienteCompleto.dataNascimento || 'Não informado'}</p>
                        <p>Endereço: ${clienteCompleto.endereco || 'Não informado'}</p>
                        <h4>Contatos:</h4>
                        <ul>
                            ${clienteCompleto.contatos.map(contato => `<li>${contato.tipo}: ${contato.valor} (${contato.observacao || 'Sem observação'})</li>`).join('')}
                        </ul>
                        <a href='editar.html?id=${clienteCompleto.id}'>Editar</a> | <button class='excluir-btn' data-id='${clienteCompleto.id}'>Excluir</button>
                    `;
                    listaClientesDiv.appendChild(item);
                }
            } else {
                listaClientesDiv.innerHTML = '<p>Nenhum cliente encontrado com os critérios de busca.</p>';
            }
        } catch (error) {
            console.error('Erro ao carregar clientes:', error);
            listaClientesDiv.innerHTML = '<p>Erro ao carregar clientes.</p>';
        }
    }

    filtroClientesForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const nomeFiltro = document.getElementById('filtroNome').value;
        const cpfFiltro = document.getElementById('filtroCpf').value;
        carregarClientes(nomeFiltro, cpfFiltro);
    });

    carregarClientes();
});