const chalk = require('chalk')
const log = console.log

module.exports.timeout = function timeout(delay) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			try {
				resolve(1)
			} catch (e) {
				reject(0)
			}
		}, delay)
	})
}

module.exports.log = function (msg, apiName = 'green') {
	return log(chalk[apiName](String(msg)))
}