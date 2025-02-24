import type { Request, Response } from 'express'
import { ObjectId } from 'mongodb'

interface FormData {
  _id?: string
  name: string
  email: string
  entidade: string
  createdAt: Date
}

export class FormController {
  private db: any

  constructor(database: any) {
    this.db = database.collection('form')
  }

  async index(req: Request, res: Response) {
    try {
      const data = await this.db.find({}).toArray() 
      return res.status(200).json(data) 
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, email, entidade }: Partial<FormData> = req.body

      if (!name || !email || !entidade) {
        return res.status(400).json({
          error: 'Todos os campos são obrigatórios: name, email, entidade',
        })
      }

      const newEntry: FormData = {
        name,
        email,
        entidade,
        createdAt: new Date(), 
      }

      const result = await this.db.insertOne(newEntry) 
      return res.status(201).json({
        message: 'Registro criado com sucesso',
        data: { ...newEntry, _id: result.insertedId }, 
      })
    } catch (error) {
      console.error('Erro ao criar registro:', error)
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params 

      if (!id || !ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID inválido' })
      }

      const objectId = new ObjectId(id)
      const result = await this.db.deleteOne({ _id: objectId }) 

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Documento não encontrado' })
      }

      return res.status(200).json({ message: 'Documento excluído com sucesso' })
    } catch (error) {
      console.error('Erro ao excluir documento:', error)
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
}
