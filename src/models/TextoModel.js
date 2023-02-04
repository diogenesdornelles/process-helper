import mongoose from 'mongoose'

const TextoSchema = new mongoose.Schema({
  textoNum: {
    type: Number,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    allowNull: false
  },
  content: {
    type: String,
    trim: true,
    allowNull: false
  },
  tema_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tema'
  }
}, { timestamps: true })

const Texto = mongoose.model('Texto', TextoSchema)

export default Texto
