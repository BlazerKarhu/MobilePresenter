const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/', async (req, res) => {
  res.send('hello world!')
})

app.listen(3000, () => {
    console.log(`Server listening on localhost:3000`)
  })