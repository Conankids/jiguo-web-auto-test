const device = require('./device')
const login = require('./login')
const event = require('./event')
const order = require('./order')

let browser
device().then(({page, ...args}) => {
	browser = args.browser
	return page
}).then((page) => {
	return login({
		page
	})
}).then((page) => {
	return event.pay({
		page
	})

}).then((args) => {
	if (!args || !args.url) {
		throw new Error('没有找到')
	}
	return order({
		page: args.page,
		url: args.url,
	})

}).then(() => {
	browser.close()
}).catch((err) => {
	browser.close()
	console.log(err)
})







