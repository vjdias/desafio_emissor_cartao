package com.ms.emissor.emissor_ms;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.ms.emissor.emissor_ms.models.EmailModel;
import com.ms.emissor.emissor_ms.repositories.EmailRepository;
import com.ms.emissor.emissor_ms.services.impl.EmailPersistenceService;

@SpringBootTest
class EmailPersistenceServiceTest {

    @Autowired
    private EmailPersistenceService emailPersistenceService;

    @MockBean
    private EmailRepository emailRepository;

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
        when(emailRepository.save(any(EmailModel.class))).thenReturn(emailModel);
        EmailModel result = emailPersistenceService.handleEmail(emailModel);
        assertNotNull(result);
    }
}
