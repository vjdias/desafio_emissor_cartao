package com.ms.emissor.emissor_ms.services;

import com.ms.emissor.emissor_ms.models.EmailModel;

public interface EmailHandler {
    EmailModel handleEmail(EmailModel emailModel);
}