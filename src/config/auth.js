const jwt = require('jsonwebtoken')
const env = require('../.env')

module.exports = (req, res, next) => {
    // CORS preflight request pesquisar melhor
    if(req.method === 'OPTIONS') {
        next()
    } else {
        const token = req.body.token || req.query.token || req.headers['authorization']
        if(!token) {
            return res.status(403).send({errors: ['Nenhum Token Parametrizado.']})
        }
        jwt.verify(token, env.authSecret, (err, decoded) => {
            if(err) {
                return res.status(403).send({
                    errors: ['Falha na autenticação do Token.']
                })
            } else {
                /* 
                    pesquisar mais detalhadamente sobre o metodo decoded
                    req.decoded = decoded
                */
                next()
            }
        })
    }
}