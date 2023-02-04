import app from './app'
import mongoose from 'mongoose'

mongoose.connect(process.env.CONNSTRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.emit('ready')
  })
  .catch(e => console.log(e))

app.on('ready', () => {
  app.listen(3002, () => {
    console.log('Acessar http://localhost:3002')
    console.log('Servidor executando na porta 3002')
  })
})
