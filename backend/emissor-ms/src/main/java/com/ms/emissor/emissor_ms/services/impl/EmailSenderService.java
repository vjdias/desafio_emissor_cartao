package com.ms.emissor.emissor_ms.services.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.ms.emissor.emissor_ms.mappers.EmailMapper;
import com.ms.emissor.emissor_ms.models.EmailModel;
import com.ms.emissor.emissor_ms.models.StatusEmail;
import com.ms.emissor.emissor_ms.services.EmailHandler;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailSenderService implements EmailHandler {
    private final JavaMailSender emailSender;
    private final EmailMapper emailMapper;

    @Value("${spring.mail.username}")
    private String emailFrom;

    public EmailSenderService(JavaMailSender emailSender, EmailMapper emailMapper) {
        this.emailSender = emailSender;
        this.emailMapper = emailMapper;
    }

    @Override
    public EmailModel handleEmail(EmailModel emailModel) {
        try {
            MimeMessage message = this.emailMapper.mapToMimeMessage(emailModel, emailSender, emailFrom);
            emailSender.send(message);
            emailModel.setStatusEmail(StatusEmail.SENT);
        } catch (MailException e) {
            emailModel.setStatusEmail(StatusEmail.ERROR);
        }
        return emailModel;
    }
}
