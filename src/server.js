const express = require('express')
const app = express()
const port = 3000

const football = require('./routes/football')
const containLetters = require('./routes/containLetters')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/football', football)
app.use('/containLetters', containLetters)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})