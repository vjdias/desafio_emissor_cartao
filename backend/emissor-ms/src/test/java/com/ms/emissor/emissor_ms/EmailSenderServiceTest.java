package com.ms.emissor.emissor_ms;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import com.ms.emissor.emissor_ms.mappers.EmailMapper;
import com.ms.emissor.emissor_ms.models.EmailModel;
import com.ms.emissor.emissor_ms.models.StatusEmail;
import com.ms.emissor.emissor_ms.services.impl.EmailSenderService;

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
    void setUp() {
        emailModel = new EmailModel();
        emailModel.setEmailTo("test@example.com");
        emailModel.setSubject("Test Subject");
        emailModel.setText("Test Body");

        Mockito.when(emailMapper.mapToSimpleMailMessage(any(EmailModel.class), any(String.class)))
               .thenAnswer(invocation -> {
                   EmailModel model = invocation.getArgument(0);
                   String from = invocation.getArgument(1);
                   SimpleMailMessage message = new SimpleMailMessage();
                   message.setFrom(from);
                   message.setTo(model.getEmailTo());
                   message.setSubject(model.getSubject());
                   message.setText(model.getText());
                   return message;
               });
    }

    @Test
    void testHandleEmailSuccess() {
        EmailModel result = emailSenderService.handleEmail(emailModel);
        assertEquals(StatusEmail.SENT, result.getStatusEmail());
    }
}
