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


    @Value(value = "${broker.queue.event.name}")
    private String eventRoutingKey;


    public ClientProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publishMessageEmail(ClientModel clientModel) {
        var emailDto = new EmailDto();
        emailDto.setUserId(clientModel.getClientId());
        emailDto.setEmailTo(clientModel.getEmail());
        emailDto.setSubject("Cadastro realizado com sucesso!");
        emailDto.setText(clientModel.getName() + ", seja bem vindo(a)!\nAgradecemos o seu cadastro!");
        rabbitTemplate.convertAndSend("", emailRoutingKey, emailDto);
    }
}
