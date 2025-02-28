## Projeto de Microserviços - Emissor de Cartões e Gerenciamento de Clientes
![Cartões](imgs/layout.jpg)

Este projeto consiste em dois microserviços desenvolvidos com Spring Boot para emissão de cartões e gerenciamento de clientes, além de uma aplicação front-end em React para interagir com esses serviços.

### Pré-requisitos

- Java 17
- Maven
- Yarn
- PostgreSQL
- RabbitMQ

### Configuração do Banco de Dados

1. Crie dois bancos de dados no PostgreSQL:
   - `emissor-ms`
   - `cartoes-ms`

2. Atualize as configurações de conexão no arquivo `application.properties` de cada microserviço conforme necessário.

### Configuração do RabbitMQ

Para facilitar os testes, este projeto está temporariamente configurado com meus acessos no CloudAMQP. Por favor, substitua essas configurações pelos seus próprios dados de acesso quando necessário.

### Microserviço de Emissão de Cartões (emissor-ms)

#### Executando o Emissor de Cartões

1. Navegue até o diretório do projeto `emissor-ms`.
2. Execute o comando:
   ```bash
   mvn spring-boot:run
   ```

### Microserviço de Gerenciamento de Clientes (cartoes-ms)

#### Executando o Gerenciamento de Clientes

1. Navegue até o diretório do projeto `cartoes-ms`.
2. Execute o comando:
   ```bash
   mvn spring-boot:run
   ```

### Aplicação Front-end (React)

#### Configuração do React

1. Navegue até o diretório do projeto `frontend`.
2. Instale as dependências do projeto:
   ```bash
   yarn install
   ```

#### Executando a Aplicação React

1. Navegue até o diretório do projeto `frontend`.
2. Execute o comando:
   ```bash
   yarn start
   ```

### Acessando os Serviços

- O microserviço de emissão de cartões estará disponível em: `http://localhost:8082`
- O microserviço de gerenciamento de clientes estará disponível em: `http://localhost:8081`
- A aplicação front-end estará disponível em: `http://localhost:3000`

### Observações

- Certifique-se de que o RabbitMQ e o PostgreSQL estão configurados e em execução.
- Atualize as configurações de `spring.mail.username` e `spring.mail.password` com as credenciais do seu servidor de email.
- Verifique se as portas `8082`, `8081` e `3000` estão disponíveis no seu ambiente.

### Configuração do Microserviço de Emissão de Cartões

No arquivo `application.properties` do microserviço `emissor-ms`, as seguintes configurações são necessárias:

```properties
spring.application.name=emissor-ms
server.port=8082

spring.datasource.url=jdbc:postgresql://localhost:5432/emissor-ms
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.jpa.hibernate.ddl-auto=update

spring.output.ansi.enabled=always

spring.rabbitmq.addresses=amqps://<usuario>:<senha>@gerbil.rmq.cloudamqp.com/<vhost>
broker.queue.email.name=default.email

spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username= // Seu email
spring.mail.password= // Sua chave de acesso
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

### Configuração do E-mail com API do Google

Para enviar e-mails usando a API do Google, é necessário gerar uma chave de acesso específica para aplicativos. Para isso:

1. Acesse [Minha Conta Google](https://myaccount.google.com/).
2. Vá para "Segurança".
3. Ative a verificação em duas etapas.
4. Na seção "Senhas de app", crie uma nova senha para o aplicativo.
5. Utilize essa senha gerada em `spring.mail.password` no `application.properties`.

Mais informações sobre a configuração de senhas de app podem ser encontradas [aqui](https://support.google.com/accounts/answer/185833?hl=pt-br).

---

Isso deve cobrir a configuração básica e execução do projeto. Certifique-se de ajustar qualquer configuração adicional conforme necessário para o seu ambiente de desenvolvimento.