package com.ms.emissor.emissor_ms;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.ms.emissor.emissor_ms.models.EmailModel;
import com.ms.emissor.emissor_ms.models.StatusEmail;
import com.ms.emissor.emissor_ms.services.impl.EmailPersistenceService;
import com.ms.emissor.emissor_ms.services.impl.EmailSenderService;
import com.ms.emissor.emissor_ms.services.impl.SendAndPersistEmailService;

@SpringBootTest
class SendAndPersistEmailServiceTest {

    @Autowired
    private SendAndPersistEmailService sendAndPersistEmailService;

    @MockBean
    private EmailSenderService emailSenderService;

    @MockBean
    private EmailPersistenceService emailPersistenceService;

    private EmailModel emailModel;

    @BeforeEach
    void setUp() {
        emailModel = new EmailModel();
        emailModel.setEmailTo("test@example.com");
        emailModel.setSubject("Test Subject");
        emailModel.setText("Test Body");
    }

    @Test
    void testHandleEmail() {
        emailModel.setStatusEmail(StatusEmail.SENT);
        when(emailSenderService.handleEmail(any(EmailModel.class))).thenReturn(emailModel);
        when(emailPersistenceService.handleEmail(any(EmailModel.class))).thenReturn(emailModel);

        EmailModel result = sendAndPersistEmailService.handleEmail(emailModel);
        assertEquals(StatusEmail.SENT, result.getStatusEmail());
    }
}
