const atendente = require('../models/models').atendente
const displayErrorOrNext = require('../models/errors')

atendente.methods(['get', 'post', 'put', 'patch', 'delete'])
atendente.updateOptions({ new: true, runValidators: true })

atendente.after('post', displayErrorOrNext).after('put', displayErrorOrNext)

atendente.route('count', (req, res, next) => {
	atendente.count((error, value) => {
		if(error){
			res.status(500).json({ errors: [error] })
		} else {
			res.json({ value })
		}
	})
})

module.exports = atendente