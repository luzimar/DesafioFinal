# Meetapp API

## Setup

Para o funcionamento deste projeto basta criar um arquivo .env na raiz do projeto
adicionando as seguintes configurações:

APP_URL = localhost
NODE_ENV = development

DIALECT_DB = postgres
HOST_DB = your_host
USERNAME_DB = your_username_db
PASSWORD_DB = your_password_db
DATABASE = meetapp

APP_SECRET = your_app_secret
TOKEN_EXPIRES_IN = 7d

MONGO_DB_HOST = your_host_mongo

MAIL_HOST = smtp.mailtrap.io
MAIL_USER_AUTH = your_user_mail_trap
MAIL_PASS_AUTH = your_password_mail_trap

REDIS_HOST = your_host_redis
REDIS_PORT = your_redis_port

SUBSCRIPTION_KEY = your_subscription_key

SENTRY_DSN = your_sentry_dsn

### Install dependencies

Para instalar as dependências de pacotes basta:

- npm install ou yarn

### Startup

Para inicilizar em ambiente local deve-se seguir os passos abaixo:

- npm run queue ou yarn queue para inicializar o servidor redis local
- npm run dev ou yarn dev para inicializar a api em modo de desenvolvimento
