import { Model, DataTypes } from 'sequelize'
import sequelize from '../config/database'

class Produto extends Model {
  public id!: number
  public nome!: string
  public preco!: number
  public descricao?: string
}

Produto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'produtos',
    timestamps: true,
  },
)

export default Produto
