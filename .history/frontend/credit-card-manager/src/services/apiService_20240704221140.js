const API_URL = 'http://microservice-url/api';  // substitua pela URL do seu microserviço

// Função para obter todos os clientes
export const fetchClients = async () => {
  try {
    const response = await fetch(`${API_URL}/clients`);
    if (!response.ok) {
      throw new Error('Failed to fetch clients');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
};

// Função para enviar proposta de crédito por email
export const sendCreditProposal = async (clientId, proposal) => {
  try {
    const response = await fetch(`${API_URL}/send-proposal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clientId, proposal }),
    });
    if (!response.ok) {
      throw new Error('Failed to send credit proposal');
    }
    return await response.json();
  } catch (error) {
    console.error('Error sending credit proposal:', error);
    throw error;
  }
};

// Função para adicionar um novo cliente
export const addClient = async (client) => {
  try {
    const response = await fetch(`${API_URL}/clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(client),
    });
    if (!response.ok) {
      throw new Error('Failed to add client');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding client:', error);
    throw error;
  }
};