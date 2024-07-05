package com.ms.emissor.emissor_ms.services.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ms.emissor.emissor_ms.models.EmailModel;
import com.ms.emissor.emissor_ms.repositories.EmailRepository;
import com.ms.emissor.emissor_ms.services.EmailHandler;

@Service
public class EmailPersistenceService implements EmailHandler {
    private final EmailRepository emailRepository;

    public EmailPersistenceService(EmailRepository emailRepository) {
        this.emailRepository = emailRepository;
    }

    @Override
    @Transactional
    public EmailModel handleEmail(EmailModel emailModel) {
        return emailRepository.save(emailModel);
    }
}
