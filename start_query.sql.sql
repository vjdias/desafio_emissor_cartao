UPDATE public.tb_clients
SET account='teste', email='email@hgchgc', email_proposal_content='32834', limit_credit=4.0, "name"='nomhoihe', name_proposal='PJ', active= TRUE, proposal_id='3304de32-f383-4377-b1c7-e8762df505a2'
WHERE client_id='06e7e74d-63c1-49ff-abbe-252ec7094efe'::uuid;
UPDATE public.tb_clients
SET account='UU', email='valdir.d.silva.junior@gmail.com', email_proposal_content='32836', limit_credit=0.0, "name"='VAL', name_proposal='PJ', active=NULL, proposal_id='3304de32-f383-4377-b1c7-e8762df505a2'
WHERE client_id='5c5090b4-c81a-462e-b17a-6a7d88d6a5ad'::uuid;
UPDATE public.tb_clients
SET account='1684684684684684', email='valdir.d.silva.junior@gmail.com', email_proposal_content='32837', limit_credit=50.0, "name"='Valdir', name_proposal='PJ', active=FALSE,proposal_id='3304de32-f383-4377-b1c7-e8762df505a2'
WHERE client_id='0fb4a58f-09c6-4a8c-9af4-0bbaf8953ecf'::uuid;
UPDATE public.tb_clients
SET account='ojpj', email='valdir.d.silva.junior@gmail.com', email_proposal_content='32838', limit_credit=55001.0, "name"='jpoj', name_proposal='PJ', active=TRUE, proposal_id='3304de32-f383-4377-b1c7-e8762df505a2'
WHERE client_id='9f3424af-d0fc-4646-94db-1775ce6a390f'::uuid;

UPDATE public.tb_proposal
SET description='Proposta para PJ', email_content='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
<head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>Bem-vindo ao Nosso Banco</title>
    <style>
        body {
            background-color: #eef2f3;
            font-family: HelveticaNeue, Helvetica, Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 700px;
            width: 100%;
            margin: 20px;
            background-color: #ffffff;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #2b2d6e;
            padding: 25px;
            border-radius: 10px 10px 0 0;
            color: #fff;
            text-align: center;
        }
        .header .logo-text {
            font-size: 28px;
            font-weight: bold;
            color: #ffffff;
        }
        .content {
            padding: 25px;
        }
        .content h1 {
            color: #2b2d6e;
            font-size: 26px;
            font-weight: bold;
            margin-bottom: 15px;
        }
        .content p {
            font-size: 17px;
            color: #333;
            line-height: 1.6;
            margin-bottom: 15px;
        }
        .credit-card {
            position: relative;
            width: 100%;
            max-width: 370px;
            height: 220px;
            border-radius: 15px;
            background: linear-gradient(135deg, #ff7b7b, #cc0000);
            color: white;
            padding: 25px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin: 25px auto;
        }
        .credit-card::before, .credit-card::after {
            content: "";
            position: absolute;
            width: 100%;
            height: 20px;
            background: white;
            opacity: 0.2;
            transform: rotate(-45deg);
        }
        .credit-card::before {
            top: 40px;
            left: -50%;
        }
        .credit-card::after {
            top: 110px;
            left: -50%;
        }
        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .bank-name {
            font-size: 1.3em;
            font-weight: bold;
        }
        .chip {
            width: 55px;
            height: 40px;
            background: white;
            border-radius: 5px;
        }
        .card-number {
            font-size: 1.6em;
            letter-spacing: 2.5px;
            margin-top: 25px;
        }
        .card-info {
            display: flex;
            justify-content: space-between;
        }
        .card-holder, .card-expiration {
            display: flex;
            flex-direction: column;
        }
        .card-holder span, .card-expiration span {
            font-size: 0.85em;
            color: #ccc;
        }
        .card-holder strong, .card-expiration strong {
            font-size: 1.3em;
        }
        .card-footer {
            display: flex;
            justify-content: flex-end;
        }
        .card-logo {
            font-size: 1.7em;
            font-weight: bold;
        }
        .footer {
            text-align: center;
            padding: 15px;
            font-size: 13px;
            color: #9199a1;
        }
        .footer a {
            color: #9199a1;
            text-decoration: underline;
            margin: 0 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo-text">Banco Exemplo</div>
            <h2>Bem-vindo ao Nosso Banco</h2>
        </div>
        <div class="content">
            <h1>Olá, {userName}!</h1>
            <p>É com grande satisfação que informamos que seu novo cartão de crédito foi liberado com sucesso.</p>
            <div class="credit-card">
                <div class="card-header">
                    <div class="bank-name">Banco Exemplo</div>
                    <div class="chip"></div>
                </div>
                <div class="card-number">{accountNumber}</div>
                <div class="card-info">
                    <div class="card-holder">
                        <span>Nome do Titular</span>
                        <strong>{userName}</strong>
                    </div>
                    <div class="card-expiration">
                        <span>Validade</span>
                        <strong>12/25</strong>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="card-logo">Visa</div>
                </div>
            </div>
            <p><strong>Limite do cartão:</strong> R$ {creditLimit}</p>
            <p>Agradecemos por escolher nosso banco para suas necessidades financeiras. Se precisar de qualquer assistência, por favor, entre em contato conosco.</p>
        </div>
        <div class="footer">
            <p>Você está recebendo este e-mail porque se registrou em nosso banco.</p>
            <a href="#" target="_blank">Cancelar inscrição</a>
            <a href="#" target="_blank">Editar configurações de e-mail</a>
            <a href="#" target="_blank">Contato</a>
            <a href="#" target="_blank">Privacidade</a>
        </div>
    </div>
</body>
</html>

', email_title='Bem vindo a proposta PJ', "name"='PJ', type_prosposal='type', type_proposal=NULL
WHERE proposal_id='3304de32-f383-4377-b1c7-e8762df505a9'::uuid;
UPDATE public.tb_proposal
SET description='Proposta para PF', email_content='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
<head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>Bem-vindo ao Nosso Banco</title>
    <style>
        body {
            background-color: #eef2f3;
            font-family: HelveticaNeue, Helvetica, Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 700px;
            width: 100%;
            margin: 20px;
            background-color: #ffffff;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #2b2d6e;
            padding: 25px;
            border-radius: 10px 10px 0 0;
            color: #fff;
            text-align: center;
        }
        .header .logo-text {
            font-size: 28px;
            font-weight: bold;
            color: #ffffff;
        }
        .content {
            padding: 25px;
        }
        .content h1 {
            color: #2b2d6e;
            font-size: 26px;
            font-weight: bold;
            margin-bottom: 15px;
        }
        .content p {
            font-size: 17px;
            color: #333;
            line-height: 1.6;
            margin-bottom: 15px;
        }
        .credit-card {
            position: relative;
            width: 100%;
            max-width: 370px;
            height: 220px;
            border-radius: 15px;
            background: linear-gradient(135deg, #ff7b7b, #cc0000);
            color: white;
            padding: 25px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin: 25px auto;
        }
        .credit-card::before, .credit-card::after {
            content: "";
            position: absolute;
            width: 100%;
            height: 20px;
            background: white;
            opacity: 0.2;
            transform: rotate(-45deg);
        }
        .credit-card::before {
            top: 40px;
            left: -50%;
        }
        .credit-card::after {
            top: 110px;
            left: -50%;
        }
        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .bank-name {
            font-size: 1.3em;
            font-weight: bold;
        }
        .chip {
            width: 55px;
            height: 40px;
            background: white;
            border-radius: 5px;
        }
        .card-number {
            font-size: 1.6em;
            letter-spacing: 2.5px;
            margin-top: 25px;
        }
        .card-info {
            display: flex;
            justify-content: space-between;
        }
        .card-holder, .card-expiration {
            display: flex;
            flex-direction: column;
        }
        .card-holder span, .card-expiration span {
            font-size: 0.85em;
            color: #ccc;
        }
        .card-holder strong, .card-expiration strong {
            font-size: 1.3em;
        }
        .card-footer {
            display: flex;
            justify-content: flex-end;
        }
        .card-logo {
            font-size: 1.7em;
            font-weight: bold;
        }
        .footer {
            text-align: center;
            padding: 15px;
            font-size: 13px;
            color: #9199a1;
        }
        .footer a {
            color: #9199a1;
            text-decoration: underline;
            margin: 0 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo-text">Banco Exemplo</div>
            <h2>Bem-vindo ao Nosso Banco Empresarial</h2>
        </div>
        <div class="content">
            <h1>Olá, {userName}!</h1>
            <p>É com grande satisfação que informamos que o cartão de crédito empresarial da sua empresa foi liberado com sucesso.</p>
            <div class="credit-card">
                <div class="card-header">
                    <div class="bank-name">Banco Exemplo</div>
                    <div class="chip"></div>
                </div>
                <div class="card-number">{accountNumber}</div>
                <div class="card-info">
                    <div class="card-holder">
                        <span>Nome do Titular</span>
                        <strong>{userName}</strong>
                    </div>
                    <div class="card-expiration">
                        <span>Validade</span>
                        <strong>12/25</strong>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="card-logo">Visa</div>
                </div>
            </div>
            <p><strong>Limite do cartão:</strong> R$ {creditLimit}</p>
            <p>Agradecemos por escolher nosso banco para as necessidades financeiras da sua empresa. Se precisar de qualquer assistência, por favor, entre em contato conosco.</p>
        </div>
        <div class="footer">
            <p>Você está recebendo este e-mail porque sua empresa se registrou em nosso banco.</p>
            <a href="#" target="_blank">Cancelar inscrição</a>
            <a href="#" target="_blank">Editar configurações de e-mail</a>
            <a href="#" target="_blank">Contato</a>
            <a href="#" target="_blank">Privacidade</a>
        </div>
    </div>
</body>
</html>

', email_title='Bem vindo a proposta PF', "name"='PF', type_prosposal='type1', type_proposal=NULL
WHERE proposal_id='3304de32-f383-4377-b1c7-e8762df505a2'::uuid;