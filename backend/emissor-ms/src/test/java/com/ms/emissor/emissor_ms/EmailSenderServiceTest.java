package com.ms.emissor.emissor_ms;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mail.javamail.JavaMailSender;

import com.ms.emissor.emissor_ms.mappers.EmailMapper;
import com.ms.emissor.emissor_ms.models.EmailModel;
import com.ms.emissor.emissor_ms.models.StatusEmail;
import com.ms.emissor.emissor_ms.services.impl.EmailSenderService;

import jakarta.mail.internet.MimeMessage;

@SpringBootTest
class EmailSenderServiceTest {

    @Autowired
    private EmailSenderService emailSenderService;

    @MockBean
    private JavaMailSender emailSender;

    @MockBean
    private EmailMapper emailMapper;

    private EmailModel emailModel;

    @BeforeEach
    void setUp() throws Exception {
        emailModel = new EmailModel();
        emailModel.setEmailFrom("from@example.com");
        emailModel.setEmailTo("test@example.com");
        emailModel.setSubject("Test Subject");
        emailModel.setText("Test Body");

        MimeMessage mimeMessage = Mockito.mock(MimeMessage.class);
        Mockito.when(emailMapper.mapToMimeMessage(any(EmailModel.class), any(JavaMailSender.class), emailModel.getEmailFrom()))
               .thenReturn(mimeMessage);

        Mockito.doNothing().when(emailSender).send(any(MimeMessage.class));
    }

    @Test
    void testHandleEmailSuccess() throws Exception {
        EmailModel result = emailSenderService.handleEmail(emailModel);
        assertEquals(StatusEmail.SENT, result.getStatusEmail());
    }
}
