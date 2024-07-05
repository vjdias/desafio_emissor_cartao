import React, { useState } from 'react';

interface CreditCardProposalProps {
  onProposalChange: (proposal: 'PJ' | 'PF', content: string) => void;
}

const CreditCardProposal: React.FC<CreditCardProposalProps> = ({ onProposalChange }) => {

  const [proposal, setProposal] = useState<'PJ' | 'PF' | ''>('');
  const handleProposalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProposal = event.target.value as 'PJ' | 'PF';

    setProposal(selectedProposal);
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
    </div>
  );
};

export default CreditCardProposal;
