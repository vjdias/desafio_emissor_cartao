package com.ms.cartoes.cartoes_ms;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.ms.cartoes.cartoes_ms.dtos.request.ClientRecordDto;
import com.ms.cartoes.cartoes_ms.dtos.response.ClientResponseDto;
import com.ms.cartoes.cartoes_ms.exceptions.ProposalNotFoundException;
import com.ms.cartoes.cartoes_ms.models.ClientModel;
import com.ms.cartoes.cartoes_ms.models.ProposalModel;
import com.ms.cartoes.cartoes_ms.producers.ClientProducer;
import com.ms.cartoes.cartoes_ms.repositories.ClientRepository;
import com.ms.cartoes.cartoes_ms.services.impl.ClientService;
import com.ms.cartoes.cartoes_ms.services.impl.ProposalService;
import com.ms.cartoes.cartoes_ms.mapper.ClientMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@SpringBootTest
class ClientServiceTest {

    @Mock
    private ClientRepository clientRepository;

    @Mock
    private ClientProducer clientProducer;

    @Mock
    private ProposalService proposalService;

    @Mock
    private ClientMapper clientMapper;

    @InjectMocks
    private ClientService clientService;

    private ClientModel clientModel;
    private ProposalModel proposalModel;
    private ClientRecordDto clientRecordDto;
    private ClientResponseDto clientResponseDto;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        proposalModel = new ProposalModel();
        proposalModel.setProposalId(UUID.randomUUID());
        proposalModel.setName("Test Proposal");

        clientModel = new ClientModel();
        clientModel.setClientId(UUID.randomUUID());
        clientModel.setName("Test Name");
        clientModel.setEmail("test@example.com");
        clientModel.setAccount("123456");
        clientModel.setProposal(proposalModel);
        clientModel.setLimitCredit(5000.0);
        clientModel.setActive(true);  // Add active field initialization

        clientRecordDto = new ClientRecordDto(
            clientModel.getClientId().toString(),
            clientModel.getName(),
            clientModel.getEmail(),
            clientModel.getAccount(),
            clientModel.getActive(),
            clientModel.getProposal().getProposalId().toString(),
            clientModel.getLimitCredit()
        );

        clientResponseDto = new ClientResponseDto();
        clientResponseDto.setClientId(clientModel.getClientId());
        clientResponseDto.setName(clientModel.getName());
        clientResponseDto.setEmail(clientModel.getEmail());
        clientResponseDto.setAccount(clientModel.getAccount());
        clientResponseDto.setLimitCredit(clientModel.getLimitCredit());
        clientResponseDto.setActive(clientModel.getActive());
        clientResponseDto.setProposalId(clientModel.getProposal().getProposalId().toString());
        clientResponseDto.setProposalName(clientModel.getProposal().getName());
        clientResponseDto.setEmailProposalContent(clientModel.getProposal().getEmailContent());
    }

    @Test
    void testSave() {
        when(proposalService.findById(any(UUID.class))).thenReturn(Optional.of(proposalModel));
        when(clientRepository.save(any(ClientModel.class))).thenReturn(clientModel);
        when(clientMapper.toModel(any(ClientRecordDto.class))).thenReturn(clientModel);
        when(clientMapper.toResponseDto(any(ClientModel.class))).thenReturn(clientResponseDto);

        ClientResponseDto savedClient = clientService.save(clientRecordDto);

        assertEquals(clientResponseDto.getClientId(), savedClient.getClientId());
        assertEquals(clientResponseDto.getName(), savedClient.getName());
        assertEquals(clientResponseDto.getEmail(), savedClient.getEmail());
        assertEquals(clientResponseDto.getAccount(), savedClient.getAccount());
        assertEquals(clientResponseDto.getProposalId(), savedClient.getProposalId());
        assertEquals(clientResponseDto.getLimitCredit(), savedClient.getLimitCredit());
        assertEquals(clientResponseDto.getActive(), savedClient.getActive());

        verify(proposalService).findById(clientModel.getProposal().getProposalId());
        verify(clientRepository).save(clientModel);
        verify(clientProducer).publishMessageEmail(clientModel);
    }

    @Test
    void testSaveProposalNotFound() {
        when(proposalService.findById(any(UUID.class))).thenReturn(Optional.empty());

        assertThrows(ProposalNotFoundException.class, () -> {
            clientService.save(clientRecordDto);
        });

        verify(proposalService).findById(clientModel.getProposal().getProposalId());
    }

    @Test
    void testGetAllClients() {
        List<ClientModel> clients = new ArrayList<>();
        clients.add(clientModel);

        List<ClientResponseDto> clientResponseDtos = new ArrayList<>();
        clientResponseDtos.add(clientResponseDto);

        when(clientRepository.findAll()).thenReturn(clients);
        when(clientMapper.toResponseDto(any(ClientModel.class))).thenReturn(clientResponseDto);

        List<ClientResponseDto> retrievedClients = clientService.getAllClients();

        assertEquals(1, retrievedClients.size());
        assertEquals(clientResponseDto.getClientId(), retrievedClients.get(0).getClientId());
    }

    @Test
    void testUpdateClient() {
        when(proposalService.findById(any(UUID.class))).thenReturn(Optional.of(proposalModel));
        when(clientRepository.findById(any(UUID.class))).thenReturn(Optional.of(clientModel));
        when(clientRepository.save(any(ClientModel.class))).thenReturn(clientModel);
        when(clientMapper.toModel(any(ClientRecordDto.class))).thenReturn(clientModel);
        when(clientMapper.toResponseDto(any(ClientModel.class))).thenReturn(clientResponseDto);

        ClientResponseDto updatedClient = clientService.save(clientRecordDto);

        assertEquals(clientResponseDto.getClientId(), updatedClient.getClientId());
        assertEquals(clientResponseDto.getName(), updatedClient.getName());
        assertEquals(clientResponseDto.getEmail(), updatedClient.getEmail());
        assertEquals(clientResponseDto.getAccount(), updatedClient.getAccount());
        assertEquals(clientResponseDto.getProposalId(), updatedClient.getProposalId());
        assertEquals(clientResponseDto.getLimitCredit(), updatedClient.getLimitCredit());
        assertEquals(clientResponseDto.getActive(), updatedClient.getActive());

        verify(proposalService).findById(clientModel.getProposal().getProposalId());
        verify(clientRepository).findById(clientModel.getClientId());
        verify(clientRepository).save(clientModel);
        verify(clientProducer).publishMessageEmail(clientModel);
    }
}
