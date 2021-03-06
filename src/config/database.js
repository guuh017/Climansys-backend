const mongoose = require('mongoose')

const url = process.env.MONGOLAB_URI ? process.env.MONGOLAB_URI : 'mongodb://localhost/climansysDB'
module.exports = mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true })

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite minimo '{MIN}'."
mongoose.Error.messages.Number.max = "O '{VALUE}' informado é Maior que o limite maximo '{MAX}'."
mongoose.Error.messages.String.enum = "O '{VALUE}' não é válido para o atributo '{PATH}'."