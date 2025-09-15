import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import sequelize from '../config/database'
import Produto from '../models/Produto'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.json())

// Testa conexão e sincroniza modelos
async function initDb() {
  try {
    await sequelize.authenticate()
    await sequelize.sync() // cria tabela se não existir
    console.log('DB conectado e sincronizado.')
  } catch (err) {
    console.error('Erro DB:', err)
    process.exit(1)
  }
}

initDb()

// Rotas CRUD
app.get('/api/produtos', async (req, res) => {
  const items = await Produto.findAll()
  res.json(items)
})

app.post('/api/produtos', async (req, res) => {
  const novo = await Produto.create(req.body)
  res.status(201).json(novo)
})

app.put('/api/produtos/:id', async (req, res) => {
  const { id } = req.params
  await Produto.update(req.body, { where: { id } })
  const atualizado = await Produto.findByPk(id)
  res.json(atualizado)
})

app.delete('/api/produtos/:id', async (req, res) => {
  const { id } = req.params
  await Produto.destroy({ where: { id } })
  res.status(204).send()
})

const PORT = process.env.SERVER_PORT || 3000
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`)
})
