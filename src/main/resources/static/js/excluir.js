// js/excluir.js
import { fetchCliente, excluirCliente } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const buscaClienteForm = document.getElementById('buscaClienteForm');
    const resultadosBuscaDiv = document.getElementById('resultadosBusca');

    buscaClienteForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const nomeBusca = document.getElementById('buscaNome').value;
        const cpfBusca = document.getElementById('buscaCpf').value;

        resultadosBuscaDiv.innerHTML = ''; // Limpa resultados anteriores

        try {
            const resultados = await fetchCliente(nomeBusca, cpfBusca);

            if (resultados && resultados.length > 0) {
                resultados.forEach(cliente => {
                    const clienteDiv = document.createElement('div');
                    clienteDiv.innerHTML = `<p>${cliente.nome} - ${cliente.cpf} <button class="excluir-btn" data-id="${cliente.id}">Excluir</button></p>`;
                    resultadosBuscaDiv.appendChild(clienteDiv);
                });

                // Adiciona event listeners aos botões de exclusão DINAMICAMENTE
                const excluirButtons = resultadosBuscaDiv.querySelectorAll('.excluir-btn');
                excluirButtons.forEach(button => {
                    button.addEventListener('click', async function() {
                        const idCliente = this.dataset.id;
                        if (confirm(`Tem certeza que deseja excluir o cliente com ID ${idCliente}?`)) {
                            try {
                                await excluirCliente(idCliente);
                                alert('Cliente excluído com sucesso!');
                                // Opcional: Remover o cliente da lista ou recarregar a página
                                this.parentNode.remove();
                            } catch (error) {
                                console.error('Erro ao excluir cliente:', error);
                                alert('Erro ao excluir cliente. Por favor, tente novamente.');
                            }
                        }
                    });
                });
            } else {
                resultadosBuscaDiv.innerHTML = '<p>Nenhum cliente encontrado.</p>';
            }

        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
            alert('Erro ao buscar clientes. Por favor, tente novamente.');
        }
    });
});