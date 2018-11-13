const port = 3003
const bodyParser = require('body-parser')
const express = require('express')

const server = express()

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

server.listen(port, () => console.log(`Climansys API rodando na porta ${port}.`))

module.exports = server