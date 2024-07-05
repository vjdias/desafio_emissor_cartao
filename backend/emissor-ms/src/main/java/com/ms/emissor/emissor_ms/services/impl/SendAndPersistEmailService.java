package com.ms.emissor.emissor_ms.services.impl;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ms.emissor.emissor_ms.models.EmailModel;
import com.ms.emissor.emissor_ms.services.EmailHandler;

@Service
public class SendAndPersistEmailService implements EmailHandler {
    private final EmailSenderService emailSenderService;
    private final EmailPersistenceService emailPersistenceService;

    public SendAndPersistEmailService(EmailSenderService emailSenderService, EmailPersistenceService emailPersistenceService) {
        this.emailSenderService = emailSenderService;
        this.emailPersistenceService = emailPersistenceService;
    }

    @Override
    @Transactional
    public EmailModel handleEmail(EmailModel emailModel) {
        emailModel.setSendDateEmail(LocalDateTime.now());

        EmailModel sentEmailModel = emailSenderService.handleEmail(emailModel);
        return emailPersistenceService.handleEmail(sentEmailModel);
    }
}
