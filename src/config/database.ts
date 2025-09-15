import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'produtoBD',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  logging: false,
})

// opcional: testa a conexão ao iniciar
sequelize
  .authenticate()
  .then(() => console.log('Conexão com o DB estabelecida.'))
  .catch((err) => console.error('Erro ao conectar ao DB:', err))

export default sequelize
