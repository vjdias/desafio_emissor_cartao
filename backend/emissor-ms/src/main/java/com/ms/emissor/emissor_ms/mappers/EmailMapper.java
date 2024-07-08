package com.ms.emissor.emissor_ms.mappers;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import com.ms.emissor.emissor_ms.models.EmailModel;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

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

    public MimeMessage mapToMimeMessage(EmailModel emailModel, JavaMailSender emailSender, String emailFrom) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            message.setFrom(new InternetAddress(emailFrom));
            message.setRecipients(MimeMessage.RecipientType.TO, emailModel.getEmailTo());
            message.setSubject(emailModel.getSubject());
            message.setContent(emailModel.getText(), "text/html; charset=utf-8");
            return message;
        } catch (MessagingException e) {
            e.printStackTrace();
            return null;
        }
    }
}