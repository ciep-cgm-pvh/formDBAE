import { MongoClient } from 'mongodb'

const URI =
  'mongodb+srv://cgmtipvh:ydaZOTLaS2tBTmRR@formdbae.ioaql.mongodb.net/?retryWrites=true&w=majority&appName=formDBAE'

const client = new MongoClient(URI)

export const db = client.db('formDBAE')

const formCollection = await db.collection('form').find({}).toArray()

console.log(formCollection)