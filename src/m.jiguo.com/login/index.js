const {log} = require('../../share/index')
const path = require('path')

let captureImagePath = path.resolve(__dirname, 'capture')

module.exports = async function login({page}) {

	log('开始测试登录功能', 'blue')
	log('进入登录页面')
	await page.goto('http://m.jiguo.com/mb/user/login.html')
	await page.waitForSelector('input[name="tel"]')
	await page.screenshot({path: path.join(captureImagePath, 'login.png')})

	log('输入登录账户：18500391867 密码：12345678')
	await page.type('input[name="tel"]', '18500391867')
	await page.type('input[name="passwd"]', '12345678')

	log('提交登录信息')
	await page.tap('.submitBtn a')

	await page.waitForSelector('.has-login')
	await page.waitForSelector('#banner-inner')
	log('登录成功，已跳转到首页')
	await page.screenshot({path: path.join(captureImagePath, 'login-success.png')})

	log('')

	return page
}




