const mongoose = require('mongoose')
module.exports = mongoose.connect('mongodb+srv://thfona:123@climansysdb-fmh7q.mongodb.net/test?retryWrites=true', { useCreateIndex: true, useNewUrlParser: true })
//mongoose.connect('mongodb://localhost/climansysDB', { useCreateIndex: true, useNewUrlParser: true })


mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite minimo '{MIN}'."
mongoose.Error.messages.Number.max = "O '{VALUE}' informado é Maior que o limite maximo '{MAX}'."
mongoose.Error.messages.String.enum = "O '{VALUE}' não é válido para o atributo '{PATH}'."