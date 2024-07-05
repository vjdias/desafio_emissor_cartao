import React, { useState, useEffect } from 'react';
import { fetchClients, deleteClient, Client } from '../services/apiService';
import { FaTrash } from 'react-icons/fa'; // Adicione esta linha para importar o ícone de exclusão
import Table from '../components/Table';

const ClientManagementPage = () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const loadClients = async () => {
      const clients = await fetchClients();
      setClients(clients);
    };
    loadClients();
  }, []);

  const handleDeleteClient = async (clientId: string) => {
    try {
      await deleteClient(clientId);
      setClients(clients.filter(client => client.clientId !== clientId));
      console.log('Cliente deletado com sucesso');
    } catch (error) {
      console.error('Falha ao deletar o cliente:', error);
    }
  };

  const renderActionButton = (client: Client) => (
    <button
      onClick={() => handleDeleteClient(client.clientId)}
      className="bg-red-500 text-white px-3 py-1 rounded shadow-sm hover:bg-red-600"
    >
      <FaTrash />
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto
