const express = require('express')
var md5 = require("md5")

const posts = require('./endpoints/posts')
const tags = require('./endpoints/tags')
const media = require('./endpoints/media')

const app = express()

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/posts', posts)
app.use('/api/tags', tags)
app.use('/api/media', media)

app.get('/', async (req, res) => {
  res.send('hello world!')
})

app.listen(3000, () => {
    console.log(`Server listening on localhost:3000`)
  })

