const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const usuario = require('../models/models').usuario
const env = require('../../../.env')

const emailRegex = /\S+@\S+\.\S+/
const pwdRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,20})/

const enviaErrosDB = (res, dbErrors) => {
    const errors = []
    _.forIn(dbErrors.errors, error => errors.push(error.message))
    return res.status(400).json({ errors })
}

const login = (req, res, next) => {
    console.log('fui chamado')
    const email = req.body.email || ''
    console.log(email)
    const senha = req.body.senha || ''
    console.log(senha)
    usuario.findOne({email}, (err, usuarioDb) => {
        if(err){
            return enviaErrosDB(res, err)
        } else if(usuarioDb && bcrypt.compareSync(senha, usuarioDb.senha)){
            const token = jwt.sign(usuarioDb.toJSON(), env.authSecret, {
                expiresIn: "1 day"
            })
            console.log(`Token Gerado para ${usuarioDb.nome} ${new Date()}`)
            const { nome, email} = usuarioDb
            res.json({ nome, email, token })
        } else {
            return res.status(400).send({ errors: [ 'Usuário/Senha inválidos' ]})
        }
    })
}

const validarToken = (req, res) => {
    const token = req.body.token || ''
    jwt.verify(token, env.authSecret, (err, decoded) => {
        return res.status(200).send({ valid: !err })
    })
}

const signup = (req, res, next) => {
    const nome = req.body.nome || ''
    const email = req.body.email || ''
    const senha = req.body.senha || ''
    const confirmacaoSenha = req.body.confirmacao_senha || ''
    
    if(!email.match(emailRegex)) {
        return res.status(400).send({errors: ['O e-mail informado está inválido']})
    }
    if(!senha.match(pwdRegex)) {
        return res.status(400).send({errors: [
            "Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 8-20."
        ]})
    }

    const salt = bcrypt.genSaltSync()
    const pwdHash = bcrypt.hashSync(senha, salt)

    if(!bcrypt.compareSync(confirmacaoSenha, pwdHash)) {
        return res.status(400).send({ errors: ['Senhas não conferem.'] })
    }
    usuario.findOne({ email }, (err, usuarioDb) => {
        if(err) {
            return enviaErrosDB(res, err)
        } else if (usuarioDb) {
            return res.status(400).send({errors: ['Usuário já cadastrado.']})
        } else {
            const newUsuario = new usuario({ nome, email, senha: pwdHash })
            newUsuario.save(err => {
                if(err) {
                    return enviaErrosDB(res, err)
                } else {
                    console.log('Chamei o Login')
                    login(req, res, next)
                }
            })
        }
    })
}

module.exports = { login, signup, validarToken }