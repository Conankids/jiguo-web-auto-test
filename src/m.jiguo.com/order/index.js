const {timeout, log} = require('../../share/index')
const path = require('path')

let captureImagePath = path.resolve(__dirname, 'capture')

module.exports = async function order({page, url}) {

	log('开始测试下单、取消订单、支付宝支付功能', 'blue')

	await page.goto(url)

	//还没有下单就先下单
	if (/\/mb\/pay\/payorder/i.test(url)) {
		await page.waitForSelector('#product_remarks')
		await page.screenshot({
			path: path.join(captureImagePath, 'writ-order.png')
		})
		log('开始填写订单')
		await page.type('#product_remarks', '自动化测试订单')
		await page.tap('#submitOrders')
	}

	await page.waitForSelector('#pay')
	log('订单支付页面')
	await page.screenshot({
		path: path.join(captureImagePath, 'order-detail.png')
	})
	const source_url = await page.evaluate(() => window.location.href)
	await page.tap('#pay')

	//进入支付宝页面
	await page.waitForSelector('.result-logo')
	log('进入支付宝页面')
	await page.screenshot({
		path: path.join(captureImagePath, 'order-ali-pay.png')
	})

	log('返回订单详情页面')
	await page.goto(source_url)
	await page.waitForSelector('#pay')
	await page.screenshot({
		path: path.join(captureImagePath, 'order-detail-2.png')
	})

	//把订单取消掉
	log('点击取消订单按钮，显示取消原因选项')
	await page.tap('#submitCancelOrders')
	await timeout(380)
	await page.screenshot({
		path: path.join(captureImagePath, 'order-detail-list-cause.png')
	})
	await page.tap('.select-cause-wrap-right .select-cause-item:last-child')

	await page.screenshot({
		path: path.join(captureImagePath, 'order-detail-select-cause.png')
	})

	log('提交取消订单信息')
	await page.tap('.cancel-order-cause-wrap .submit-btn')

	await page.waitForSelector('.order-head-status.gray')
	await page.screenshot({
		path: path.join(captureImagePath, 'order-detail-cancel.png')
	})
	log('取消订单成功')
	log('')

	return page
}




