package com.ms.cartoes.cartoes_ms;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.ms.cartoes.cartoes_ms.models.ClientModel;
import com.ms.cartoes.cartoes_ms.producers.ClientProducer;
import com.ms.cartoes.cartoes_ms.repositories.ClientRepository;
import com.ms.cartoes.cartoes_ms.services.impl.ClientService;

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

    @InjectMocks
    private ClientService clientService;

    private ClientModel clientModel;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        clientModel = new ClientModel();
        clientModel.setClientId(UUID.randomUUID());
        clientModel.setName("Test Name");
        clientModel.setEmail("test@example.com");
        clientModel.setAccount("123456");
        clientModel.setNameProposal("PF");
        clientModel.setLimitCredit(5000.0);
    }

    @Test
    void testSave() {
        when(clientRepository.save(any(ClientModel.class))).thenReturn(clientModel);

        ClientModel savedClient = clientService.save(clientModel);

        assertEquals(clientModel.getClientId(), savedClient.getClientId());
        assertEquals(clientModel.getName(), savedClient.getName());
        assertEquals(clientModel.getEmail(), savedClient.getEmail());
        assertEquals(clientModel.getAccount(), savedClient.getAccount());
        assertEquals(clientModel.getNameProposal(), savedClient.getNameProposal());
        assertEquals(clientModel.getLimitCredit(), savedClient.getLimitCredit());

        verify(clientRepository).save(clientModel);
        verify(clientProducer).publishMessageEmail(clientModel);
    }

    @Test
    void testGetAllClients() {
        List<ClientModel> clients = new ArrayList<>();
        clients.add(clientModel);

        when(clientRepository.findAll()).thenReturn(clients);

        List<ClientModel> retrievedClients = clientService.getAllClients();

        assertEquals(1, retrievedClients.size());
        assertEquals(clientModel.getClientId(), retrievedClients.get(0).getClientId());
    }

    @Test
    void testUpdateClient() {
        when(clientRepository.findById(any(UUID.class))).thenReturn(Optional.of(clientModel));
        when(clientRepository.save(any(ClientModel.class))).thenReturn(clientModel);

        ClientModel updatedClient = clientService.save(clientModel);

        assertEquals(clientModel.getClientId(), updatedClient.getClientId());
        assertEquals(clientModel.getName(), updatedClient.getName());
        assertEquals(clientModel.getEmail(), updatedClient.getEmail());
        assertEquals(clientModel.getAccount(), updatedClient.getAccount());
        assertEquals(clientModel.getNameProposal(), updatedClient.getNameProposal());
        assertEquals(clientModel.getLimitCredit(), updatedClient.getLimitCredit());

        verify(clientRepository).findById(clientModel.getClientId());
        verify(clientRepository).save(clientModel);
        verify(clientProducer).publishMessageEmail(clientModel);
    }
}
