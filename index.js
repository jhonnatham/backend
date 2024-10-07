const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

// process request format json
app.use(express.json())

app.use(cors())

//router
const product = require('./router/product')

app.use('/api/products', product)

// default test response
app.get('/', function (req, res) {
  res.send('Hello World')
})

// execute  server
app.listen(port, () => console.log(`Conectado al puerto ${port}`))