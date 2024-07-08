package com.ms.cartoes.cartoes_ms.services.impl;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ms.cartoes.cartoes_ms.dtos.request.ClientRecordDto;
import com.ms.cartoes.cartoes_ms.dtos.response.ClientResponseDto;
import com.ms.cartoes.cartoes_ms.mapper.ClientMapper;
import com.ms.cartoes.cartoes_ms.models.ClientModel;
import com.ms.cartoes.cartoes_ms.models.ProposalModel;
import com.ms.cartoes.cartoes_ms.producers.ClientProducer;
import com.ms.cartoes.cartoes_ms.repositories.ClientRepository;
import jakarta.transaction.Transactional;

@Service
public class ClientService {
    final ClientRepository clientRepository;
    final ClientProducer clientProducer;
    final ProposalService proposalService;

    ClientService(ClientRepository clientRepository, ClientProducer clientProducer, ProposalService proposalService) {
        this.clientRepository = clientRepository;
        this.clientProducer = clientProducer;
        this.proposalService = proposalService;
    }

    @Transactional
    public ClientResponseDto save(ClientRecordDto clientReecordDto) {
        ClientMapper clientMapper = new ClientMapper();
        ClientModel clientModel = clientMapper.toModel(clientReecordDto);
        if (clientModel.getClientId() != null) {
            Optional<ClientModel> existingClient = clientRepository.findById(clientModel.getClientId());

            if (existingClient.isPresent()) {
                ClientModel updateClient = existingClient.get();
                updateClient.setName(clientModel.getName());
                updateClient.setEmail(clientModel.getEmail());
                updateClient.setAccount(clientModel.getAccount());
                
                Optional<ProposalModel> existingProposal =  this.proposalService.findById(clientModel.getProposal().getProposalId());
                if (existingProposal.isPresent()) {
                    updateClient.setProposal(existingProposal.get());
                }
                
                updateClient.setLimitCredit(clientModel.getLimitCredit());
                clientModel = clientRepository.save(updateClient);
            }
        } else {  
            Optional<ProposalModel> existingProposal =  this.proposalService.findById(clientModel.getProposal().getProposalId());
            if (existingProposal.isPresent()) {
                clientModel.setProposal(existingProposal.get());
            }
            clientModel = clientRepository.save(clientModel);
        }
        clientProducer.publishMessageEmail(clientModel);

        clientMapper.toResponseDto(clientModel);
        return clientMapper.toResponseDto(clientModel);
    }

    public List<ClientResponseDto> getAllClients() {
        ClientMapper clientMapper = new ClientMapper();
        List<ClientModel> clientModels = clientRepository.findAll();
  
        return clientModels.stream().map(clientMapper::toResponseDto).collect(Collectors.toList());
    }

    public void deleteClient(UUID clientId) {
        clientRepository.deleteById(clientId);
    }


}
