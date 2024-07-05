import React, { useState, FormEvent } from 'react';
import SelectProposals from '../components/SelectProposals';

interface Client {
  id: string;
  account: string;
  name: string;
  email: string;
  proposalId: string;
  limit: string;
  client: string;
}

const proposals = [
  { id: '1', name: 'Proposta 1', content: 'Detalhes da proposta 1' },
  { id: '2', name: 'Proposta 2', content: 'Detalhes da proposta 2' },
  { id: '3', name: 'Proposta 3', content: 'Detalhes da proposta 3' },
];

const mockData: Client[] = [
  { id: '1', account: '12345', name: 'John Doe', email: 'john@example.com', proposalId: '1', limit: '1000', client: 'Cliente 1' },
  { id: '2', account: '67890', name: 'Jane Smith', email: 'jane@example.com', proposalId: '2', limit: '2000', client: 'Cliente 2' },
];

const ClientManagementPage = () => {
  const [clients, setClients] = useState<Client[]>(mockData);
  const [showForm, setShowForm] = useState(false);
  const [newClient, setNewClient] = useState<Client>({ id: '', account: '', name: '', email: '', proposalId: '', limit: '', client: '' });

  const handleAddClient = async (e: FormEvent) => {
    e.preventDefault();
    const response = newClient;
    setClients([...clients, response]);
    setShowForm(false);
    setNewClient({ id: '', account: '', name: '', email: '', proposalId: '', limit: '', client: '' });
  };

  const handleUpdateClient = (id: string) => {
    // Lógica para atualizar cliente
    console.log('Atualizar cliente com ID:', id);
  };

  const handleDeleteClient = (id: string) => {
    // Lógica para deletar cliente
    setClients(clients.filter(client => client.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto py-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>
      <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 text-white p-2 mb-4 rounded-lg">
        {showForm ? 'Cancelar' : 'Adicionar Novo Cliente'}
      </button>

      {showForm && (
        <form onSubmit={handleAddClient} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Conta"
              value={newClient.account}
              onChange={(e) => setNewClient({ ...newClient, account: e.target.value })}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Nome"
              value={newClient.name}
              onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newClient.email}
              onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <SelectProposals
              selectedProposal={newClient.proposalId}
              onChange={(e) => setNewClient({ ...newClient, proposalId: e.target.value })}
            />
            <input
              type="text"
              placeholder="Limite"
              value={newClient.limit}
              onChange={(e) => setNewClient({ ...newClient, limit: e.target.value })}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Cliente"
              value={newClient.client}
              onChange={(e) => setNewClient({ ...newClient, client: e.target.value })}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button type="submit" className="bg-green-500 text-white p-2 rounded-lg shadow-sm hover:bg-green-600">
            Adicionar Cliente
          </button>
        </form>
      )}

      <div className="overflow-x-auto rounded-lg shadow-sm border-solid border-[1px]">
        <table className="min-w-full bg-white rounded-lg shadow-sm">
          <thead className="bg-gray-100 text-left rounded-t-lg">
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 text-gray-500 rounded-tl-lg">ID</th>
              <th className="py-2 px-4 border-b border-gray-200 text-gray-500">Conta</th>
              <th className="py-2 px-4 border-b border-gray-200 text-gray-500">Nome</th>
              <th className="py-2 px-4 border-b border-gray-200 text-gray-500">Email</th>
              <th className="py-2 px-4 border-b border-gray-200 text-gray-500">Proposta</th>
              <th className="py-2 px-4 border-b border-gray-200 text-gray-500">Limite</th>
              <th className="py-2 px-4 border-b border-gray-200 text-gray-500">Cliente</th>
              <th className="py-2 px-4 border-b border-gray-200 text-gray-500 rounded-tr-lg">Ações</th>
            </tr>
          </thead>
          <tbody className="rounded-b-lg">
            {clients.length > 0 ? (
              clients.map((client, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b border-gray-200">{client.id}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{client.account}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{client.name}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{client.email}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{proposals.find(p => p.id === client.proposalId)?.name || 'N/A'}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{client.limit}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{client.client}</td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <button
                      onClick={() => handleUpdateClient(client.id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded shadow-sm hover:bg-yellow-600 mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteClient(client.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded shadow-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-2 px-4 text-center text-gray-500">Nenhum dado disponível</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientManagementPage;
