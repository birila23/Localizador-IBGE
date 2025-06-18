import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres'
});
conectar();

async function conectar() {
    try {
        await sequelize.authenticate();
        console.log('Conexão estabelecida!');
    } catch (error) {
        console.error('Conexão falha com o banco', error);
    }
}

export default sequelize;