import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import { Client } from '../services/apiService';

interface CreditCardProposalProps {
  client: Client;
  onProposalChange: (proposal: 'PJ' | 'PF', content: string) => void;
}

const CreditCardProposal: React.FC<CreditCardProposalProps> = ({ client, onProposalChange }) => {
  const [proposal, setProposal] = useState<'PJ' | 'PF' | ''>('');

  const proposals: { [key in 'PJ' | 'PF']: string } = {
    PJ: 'Bem-vindo ao nosso serviço de cartão de crédito empresarial. Agradecemos a sua confiança!',
    PF: 'Bem-vindo ao nosso serviço de cartão de crédito pessoal. Estamos felizes em tê-lo como cliente!',
  };

  const handleProposalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProposal = event.target.value as 'PJ' | 'PF';
    const content = `
      <div>
        <h2>Texto do Email de Boas-vindas</h2>
        <p>${proposals[selectedProposal]}</p>
        <div>
          <h3>Informações do Cartão</h3>
          <div>
            <div style="display: inline-block; background: #ccc; padding: 20px; border-radius: 10px;">
              <p>Nome: ${client.name}</p>
              <p>Conta: ${client.account}</p>
              <p>Proposta: ${selectedProposal}</p>
            </div>
          </div>
        </div>
      </div>
    `;
    setProposal(selectedProposal);
    onProposalChange(selectedProposal, content);
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700">Proposta</label>
        <select
          value={proposal}
          onChange={handleProposalChange}
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione uma proposta</option>
          <option value="PJ">Proposta PJ</option>
          <option value="PF">Proposta PF</option>
        </select>
      </div>
      <Cards
        cvc=""
        expiry=""
        focused=""
        name={client.name}
        number={client.account}
      />
    </div>
  );
};

export default CreditCardProposal;
