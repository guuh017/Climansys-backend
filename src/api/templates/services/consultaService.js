const consulta = require('../models/models').consulta
const displayErrorOrNext = require('../models/errors')

consulta.methods(['get', 'post', 'put', 'patch', 'delete'])
consulta.updateOptions({ new: true, runValidators: true })

consulta.after('post', displayErrorOrNext).after('put', displayErrorOrNext)

consulta.route('count', (req, res, next) => {
	consulta.count((error, value) => {
		if(error){
			res.status(500).json({ errors: [error] })
		} else {
			res.json({ value })
		}
	})
})

module.exports = consulta