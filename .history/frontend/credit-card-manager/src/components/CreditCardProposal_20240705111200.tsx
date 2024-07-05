import React, { useState } from 'react';
import 'react-credit-cards-2/es/styles-compiled.css';
import Cards from 'react-credit-cards-2';
import { Client } from '../services/apiService';

interface CreditCardProposalProps {
  client: Client;
  onProposalChange: (proposal: string, content: string) => void;
}

const CreditCardProposal: React.FC<CreditCardProposalProps> = ({ client, onProposalChange }) => {
  const [proposal, setProposal] = useState('');
  const [emailContent, setEmailContent] = useState('');

  const proposals = {
    PJ: 'Bem-vindo ao nosso serviço de cartão de crédito empresarial. Agradecemos a sua confiança!',
    PF: 'Bem-vindo ao nosso serviço de cartão de crédito pessoal. Estamos felizes em tê-lo como cliente!',
  };

  const handleProposalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProposal = event.target.value;
    const content = proposals[selectedProposal];
    setProposal(selectedProposal);
    setEmailContent(content);
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
      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-bold mb-2">Texto do Email</h2>
        <p>{emailContent}</p>
      </div>
    </div>
  );
};

export default CreditCardProposal;
