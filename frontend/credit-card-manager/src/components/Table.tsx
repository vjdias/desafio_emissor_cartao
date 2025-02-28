import React from 'react';
import { Client } from '../services/apiService';

interface TableProps {
  data: Client[];
  actionButton: (client: Client) => JSX.Element;
}

const Table: React.FC<TableProps> = ({ data, actionButton }) => {
  // Function to format the ID
  const formatId = (id: string) => {
    return `${id.slice(0, 4)}...${id.slice(-4)}`;
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-sm border-solid border-[1px]">
      <table className="min-w-full bg-white rounded-lg shadow-sm">
        <thead className="bg-gray-100 text-left rounded-t-lg">
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 text-gray-500 rounded-tl-lg">ID</th>
            <th className="py-2 px-4 border-b border-gray-200 text-gray-500">Conta</th>
            <th className="py-2 px-4 border-b border-gray-200 text-gray-500">Nome</th>
            <th className="py-2 px-4 border-b border-gray-200 text-gray-500">Email</th>
            <th className="py-2 px-4 border-b border-gray-200 text-gray-500">Proposta</th>
            <th className="py-2 px-4 border-b border-gray-200 text-gray-500">Ativo</th>
            <th className="py-2 px-4 border-b border-gray-200 text-gray-500">Limite</th>
            <th className="py-2 px-4 border-b border-gray-200 text-gray-500 rounded-tr-lg">Ações</th>
          </tr>
        </thead>
        <tbody className="rounded-b-lg">
          {data.length > 0 ? (
            data.map((client, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-200">{formatId(client.clientId)}</td>
                <td className="py-2 px-4 border-b border-gray-200">{client.account}</td>
                <td className="py-2 px-4 border-b border-gray-200">{client.name}</td>
                <td className="py-2 px-4 border-b border-gray-200">{client.email}</td>
                <td className="py-2 px-4 border-b border-gray-200">{client.proposalName}</td>
                <td className="py-2 px-4 border-b border-gray-200">{client.active ? 'Sim' : 'Não'}</td>
                <td className="py-2 px-4 border-b border-gray-200">{client.limitCredit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {actionButton(client)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="py-2 px-4 text-center text-gray-500">Nenhum dado disponível</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
