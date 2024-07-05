package com.ms.emissor.emissor_ms.consumers;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.BeanUtils;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import com.ms.emissor.emissor_ms.dtos.request.EmailRecordDto;
import com.ms.emissor.emissor_ms.models.EmailModel;
import com.ms.emissor.emissor_ms.services.impl.SendAndPersistEmailService;

@Component
public class EmailConsumer {

    final SendAndPersistEmailService sendAndPersistEmailService;

    public EmailConsumer(SendAndPersistEmailService sendAndPersistEmailService) {
        this.sendAndPersistEmailService = sendAndPersistEmailService;
    }

    @RabbitListener(queues="${broker.queue.email.name}")
    public void listenEmailQueue(@Payload EmailRecordDto emailRecordDto) {
        var emailModel = new EmailModel();
        BeanUtils.copyProperties(emailRecordDto, emailModel);
        sendAndPersistEmailService.handleEmail(emailModel);
    }
}
