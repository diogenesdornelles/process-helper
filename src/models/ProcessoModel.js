import mongoose from 'mongoose'

const ProcessoSchema = new mongoose.Schema({
  numero: {
    type: String,
    trim: true
  },
  juizo: {
    type: String,
    trim: true
  },
  assunto: {
    type: String,
    trim: true
  },
  localizador: {
    type: String,
    trim: true
  },
  cls: {
    type: Date,
    trim: true
  },
  dias: {
    type: String,
    trim: true
  },
  sigla: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    trim: true
  },
  comentario: {
    type: String,
    trim: true,
    defaultValue: ''
  },
  table_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table'
  },
  active: {
    type: Boolean,
    default: true
  }

}, { timestamps: true })

const Processo = mongoose.model('Processo', ProcessoSchema)

export default Processo
