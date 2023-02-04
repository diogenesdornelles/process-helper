import mongoose from 'mongoose'

const TemaSchema = new mongoose.Schema({
  temaNum: {
    type: Number,
    trim: true
  },
  name: {
    type: String,
    trim: true,
    unique: [true, 'Tema já consta do cadastro!'],
    allowNull: false
  },
  _type: {
    type: String
  },
  juizo: {
    type: String
  },
  textos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Texto' }]

}, { timestamps: true })

const Tema = mongoose.model('Tema', TemaSchema)

export default Tema
