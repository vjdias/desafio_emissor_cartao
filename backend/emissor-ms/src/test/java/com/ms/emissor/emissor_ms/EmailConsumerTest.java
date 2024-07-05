package com.ms.emissor.emissor_ms;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import com.ms.emissor.emissor_ms.consumers.EmailConsumer;
import com.ms.emissor.emissor_ms.dtos.request.EmailRecordDto;
import com.ms.emissor.emissor_ms.models.EmailModel;
import com.ms.emissor.emissor_ms.services.impl.SendAndPersistEmailService;

@SpringBootTest
@SpringJUnitConfig
class EmailConsumerTest {

    private EmailConsumer emailConsumer;

    @MockBean
    private SendAndPersistEmailService sendAndPersistEmailService;

    @BeforeEach
    void setUp() {
        emailConsumer = new EmailConsumer(sendAndPersistEmailService);
    }

    @Test
    void testListenEmailQueue() {
        EmailRecordDto emailRecordDto = new EmailRecordDto(null, "test@example.com", "Test Subject", "Test Body");

        emailConsumer.listenEmailQueue(emailRecordDto);

        verify(sendAndPersistEmailService).handleEmail(any(EmailModel.class));
    }
}
