/**
 * ■ Package list
 * npm i selenium-webdriver
 * npm i chromedriver
 */

// package
const webdriver = require('selenium-webdriver')
const { Builder, By, util } = webdriver;

// 環境変数 設定
//const { LOGIN_URL, LOGIN_EMAIL, LOGIN_PASS} = process.env
const LOGIN_URL = 'https://future-link-create.slack.com/services/export'
const LOGIN_EMAIL = 'da-okazaki@outlook.com'
const LOGIN_PASS = 'transD0@'

// Chrome 設定
const capabilities = webdriver.Capabilities.chrome();
capabilities.set('chromeOptions', {
    args: [
        '--headless',
        '--no-sandbox',
        '--disable-gpu',
        `--window-size=1980,1200`
        // other chrome options
    ]
});

const timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Slack ログエクスポート処理
 */
const main = async () => {

    // ブラウザ 起動
    const driver = await new Builder().withCapabilities(capabilities).build();

    // エクスポート画面　移動
    await driver.get(LOGIN_URL);

    // Slack ログイン
    await timeout(2000)
    await driver.findElement(By.id('email')).sendKeys(LOGIN_EMAIL)
    await timeout(2000)
    await driver.findElement(By.id('password')).sendKeys(LOGIN_PASS)
    await driver.findElement(By.id('signin_btn')).click()

    // メニュー 選択
    await timeout(3000)
    await driver.findElement(By.xpath("//div[@class='c-input_select__wrapper']")).click()
    
    // 24時間 選択
    await timeout(1000)    
    await driver.findElement(By.xpath("//div[@data-qa='service_export_date_preset_option_24h']")).click()

    // エクスポート 開始
    await timeout(1000)
    //await driver.findElement(By.className('p-service_export_date_range__button')).click()
    
    
    // ブラウザ 終了
    //driver.quit();
}

//exports.handler = (event) => {
    try {
        console.log("## event")
        //console.log(event)

        main()
    } catch (err) {
        console.log(err)
    }
//}
