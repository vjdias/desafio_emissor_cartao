package com.ms.emissor.emissor_ms.consumers;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.BeanUtils;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import com.ms.emissor.emissor_ms.dtos.request.EmailRecordDto;
import com.ms.emissor.emissor_ms.models.EmailModel;
import com.ms.emissor.emissor_ms.services.impl.SendAndPersistEmailService;

import jakarta.mail.MessagingException;

@Component
public class EmailConsumer {

    //private static final Logger logger = LoggerFactory.getLogger(EmailConsumer.class);
    final SendAndPersistEmailService sendAndPersistEmailService;

    public EmailConsumer(SendAndPersistEmailService sendAndPersistEmailService) {
        this.sendAndPersistEmailService = sendAndPersistEmailService;
    }

    @RabbitListener(queues="${broker.queue.email.name}")
    public void listenEmailQueue(@Payload EmailRecordDto emailRecordDto) throws MessagingException {
        //logger.info("Received message from queue: {}", emailRecordDto);
        var emailModel = new EmailModel();
        try {
            BeanUtils.copyProperties(emailRecordDto, emailModel);
            sendAndPersistEmailService.handleEmail(emailModel);
        } catch (MessagingException e) {
        //    logger.error("Error while handling email: {}", e.getMessage(), e);
            throw e; // Rethrow the exception to indicate failure
        } catch (Exception e) {
        //    logger.error("Unexpected error: {}", e.getMessage(), e);
            throw new MessagingException("Unexpected error while processing message", e);
        }
    }
}
