import React, { useState } from 'react';
import 'react-credit-cards/es/styles-compiled.css';
import Cards from 'react-credit-cards-2';
import { Client } from '../services/apiService';

interface CreditCardProposalProps {
  client: Client;
  onProposalChange: (proposal: 'PJ' | 'PF', content: string) => void;
}

const CreditCardProposal: React.FC<CreditCardProposalProps> = ({ client, onProposalChange }) => {
  const [state, setState] = useState({
    number: client.account,
    expiry: '',
    cvc: '',
    name: client.name,
    focus: '',
  });
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

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  }

  const handleInputFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  }

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
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
      />
      <form>
        <input
          type="number"
          name="number"
          placeholder="Card Number"
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={state.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="text"
          name="expiry"
          placeholder="Expiry Date"
          value={state.expiry}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="text"
          name="cvc"
          placeholder="CVC"
          value={state.cvc}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
      </form>
    </div>
  );
};

export default CreditCardProposal;
