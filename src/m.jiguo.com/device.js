const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors')

module.exports = async function (deviceName = 'iPhone 6') {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.emulate(devices[deviceName])
	return new Promise((resolve) => {
		resolve({
			page,
			browser
		})
	})
}
