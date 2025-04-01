const API_URL = 'http://localhost:8080/clientes';

export async function fetchClientes() {
    const response = await fetch(API_URL);
    return response.json();
}

export async function fetchCliente(nome, cpf) {
    const response = await fetch(`${API_URL}/buscar?nome=${nome}&cpf=${cpf}`);
    return response.json();
}

export async function fetchClientePorId(id) {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export async function cadastrarCliente(cliente) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
    });
    return response.json();
}

export async function editarCliente(id, cliente) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
    });
    return response.json();
}

export async function excluirCliente(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
}