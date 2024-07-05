import React from 'react';

const Table = ({ data, onSendProposal }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-sm  border-solid border-[1px] ">
      <table className="min-w-full bg-white rounded-lg shadow-sm">
        <thead className="bg-gray-100 text-left rounded-t-lg">
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 text-gray-500 rounded-tl-lg">ID</th>
            <th className="py-2 px-4 border-b border-gray-200 text-gray-500">Conta</th>
            <th className="py-2 px-4 border-b border-gray-200 text-gray-500">Nome</th>
            <th className="py-2 px-4 border-b border-gray-200 text-gray-500">Proposta</th>
            <th className="py-2 px-4 border-b border-gray-200 text-gray-500">Limite</th>
            <th className="py-2 px-4 border-b border-gray-200 text-gray-500">Cliente</th>
            <th className="py-2 px-4 border-b border-gray-200 text-gray-500 rounded-tr-lg">Ações</th>
          </tr>
        </thead>
        <tbody className="rounded-b-lg">
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-200">{item.id}</td>
                <td className="py-2 px-4 border-b border-gray-200">{item.account}</td>
                <td className="py-2 px-4 border-b border-gray-200">{item.name}</td>
                <td className="py-2 px-4 border-b border-gray-200">{item.proposal}</td>
                <td className="py-2 px-4 border-b border-gray-200">{item.limit}</td>
                <td className="py-2 px-4 border-b border-gray-200">{item.client}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <button
                    onClick={() => onSendProposal(item.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded shadow-sm hover:bg-blue-600"
                  >
                    Enviar Proposta
                  </button>
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
