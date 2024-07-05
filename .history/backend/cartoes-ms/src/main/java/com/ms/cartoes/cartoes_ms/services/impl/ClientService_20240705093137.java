package com.ms.cartoes.cartoes_ms.services.impl;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ms.cartoes.cartoes_ms.models.ClientModel;
import com.ms.cartoes.cartoes_ms.producers.ClientProducer;
import com.ms.cartoes.cartoes_ms.repositories.ClientRepository;
import jakarta.transaction.Transactional;

@Service
public class ClientService {
    final ClientRepository clientRepository;
    final ClientProducer clientProducer;

    ClientService(ClientRepository clientRepository, ClientProducer clientProducer) {
        this.clientRepository = clientRepository;
        this.clientProducer = clientProducer;
    }

    @Transactional
    public ClientModel save(ClientModel clientModel) {
        if (clientModel.getClientId() != null) {
            Optional<ClientModel> existingClient = clientRepository.findById(clientModel.getClientId());

            if (existingClient.isPresent()) {
                ClientModel updateClient = existingClient.get();
                updateClient.setName(clientModel.getName());
                updateClient.setEmail(clientModel.getEmail());
                updateClient.setAccount(clientModel.getAccount());
                updateClient.setNameProposal(clientModel.getNameProposal());
                updateClient.setLimitCredit(clientModel.getLimitCredit());
                clientModel = clientRepository.save(updateClient);
            }
        } else {
            clientModel = clientRepository.save(clientModel);
        }
        clientProducer.publishMessageEmail(clientModel);
        return clientModel;
    }

    public List<ClientModel> getAllClients() {
        return clientRepository.findAll();
    }
}
