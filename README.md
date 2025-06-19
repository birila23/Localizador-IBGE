# 🌍 Localizador IBGE - Tody Team


Este é um projeto backend desenvolvido em **Node.js** com **Express** e **Sequelize**, que serve como uma API para localização de estados e municípios utilizando dados do IBGE.

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [CORS](https://www.npmjs.com/package/cors)

## ⚙️ Configuração

1. Clone o repositório:
   ```bash
   git clone <URL-do-repositório>
   cd localizador-ibge-tody-team
   ```
2. Instale as dependências:
 ```
npm install
 ```
3. Configure as variaveis de ambiente:
```bash
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
DB_PORT=3000
```
4. Inicie o servidor
```bash
npm start
```

📌 Observações
O projeto utiliza o PostgreSQL como banco de dados relacional.

O Sequelize faz a interface ORM com o banco.

O Express gerencia as rotas e lógica de requisição/resposta.

O uso do dotenv permite configurar facilmente variáveis de ambiente.
