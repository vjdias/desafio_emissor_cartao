package com.ms.cartoes.cartoes_ms.producers;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.ms.cartoes.cartoes_ms.dtos.response.EmailDto;
import com.ms.cartoes.cartoes_ms.models.ClientModel;

@Component
public class ClientProducer {

    final RabbitTemplate rabbitTemplate;
    
    @Value(value = "${broker.queue.email.name}")
    private String emailRoutingKey;

    public ClientProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publishMessageEmail(ClientModel clientModel) {
        var emailDto = new EmailDto();
        emailDto.setUserId(clientModel.getClientId());
        emailDto.setEmailTo(clientModel.getEmail());
        emailDto.setSubject("Cadastro de novo cartão realizado com sucesso!");

        String htmlTemplate = clientModel.getProposal().getEmailContent();
        htmlTemplate = htmlTemplate.replace("{userName}", clientModel.getName());
        htmlTemplate = htmlTemplate.replace("{creditLimit}", String.valueOf(clientModel.getLimitCredit()));
        htmlTemplate = htmlTemplate.replace("{accountNumber}",  String.valueOf(clientModel.getAccount()));

        emailDto.setText(htmlTemplate);
        rabbitTemplate.convertAndSend("", emailRoutingKey, emailDto);
    }
}
