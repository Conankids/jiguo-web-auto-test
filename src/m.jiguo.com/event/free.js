const {log} = require('../../share/index')
const path = require('path')
const device = require('../device')

let captureImagePath = path.resolve(__dirname, 'capture')

module.exports = async function free({page}) {

	log('开始测试试用列表、试用详情功能', 'blue')

	await page.goto('http://m.jiguo.com/mb/event/index.html')
	await page.waitForSelector('ul.mian-stream-inner li a:first-child')

	log('已进入试用列表页')
	await page.screenshot({
		path: path.join(captureImagePath, 'event-index.png')
	})

	log('获取第一个能下单的链接')
	// const result = await page.evaluate(() => {
	// 	var puppeteer_elements = document.querySelectorAll('.mian-stream-inner li .home-item-type');
	// 	var puppeteer_url = ''
	// 	Array.from(puppeteer_elements).forEach((item) => {
	// 		// home-item-type
	// 		if (puppeteer_url) return
	// 		if (/\/mb\/pay\/(payorder|myorder)/i.test(item.href)) {
	// 			puppeteer_url = item.href
	// 		}
	// 	})
	// 	return {
	// 		url: puppeteer_url
	// 	}
	// })



	log('点击第一个试用')
	await page.tap("ul.mian-stream-inner li a:first-child")
	await page.waitForSelector('#meta-list a')

	log('已进入试用详情页')
	await page.screenshot({
		path: path.join(captureImagePath, 'event-detail.png')
	})

	log('获取第一个能下单的链接')
	const result = await page.evaluate(() => {
		var puppeteer_elements = document.querySelectorAll('#meta-list a');
		var puppeteer_url = ''
		Array.from(puppeteer_elements).forEach((item) => {
			if (puppeteer_url) return
			if (/\/mb\/pay\/(payorder|myorder)/i.test(item.href)) {
				puppeteer_url = item.href
			}
		})
		return {
			url: puppeteer_url
		}
	})

	if (!result.url) {
		log('没有找到下单地址')
		return false
	}

	log('')

	return {
		page,
		url: result.url
	}
}

let browser
device().then(({page, ...args}) => {
	browser = args.browser
	return page
}).then((page) => {
	return module.exports({
		page
	})
}).then(() => {
	browser.close()
}).catch((err) => {
	browser.close()
	console.log(err)
})




