import mongoose from 'mongoose'

const TableSchema = new mongoose.Schema({
  numero: {
    type: Number
  },
  processos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Processo' }]
}, { timestamps: true })

const Table = mongoose.model('Table', TableSchema)

export default Table
