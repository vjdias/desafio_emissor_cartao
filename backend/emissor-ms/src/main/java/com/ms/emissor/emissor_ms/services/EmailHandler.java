package com.ms.emissor.emissor_ms.services;

import com.ms.emissor.emissor_ms.models.EmailModel;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.AddressException;

public interface EmailHandler {
    EmailModel handleEmail(EmailModel emailModel) throws AddressException, MessagingException;
}