package com.ms.emissor.emissor_ms.mappers;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Component;

import com.ms.emissor.emissor_ms.models.EmailModel;

@Component
public class EmailMapper {
    public SimpleMailMessage mapToSimpleMailMessage(EmailModel emailModel, String emailFrom) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(emailFrom);
        message.setTo(emailModel.getEmailTo());
        message.setSubject(emailModel.getSubject());
        message.setText(emailModel.getText());
        return message;
    }
}