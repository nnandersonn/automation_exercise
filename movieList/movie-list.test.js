const {By, Builder, Capabilities} = require('selenium-webdriver')

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await driver.get('http://127.0.0.1:5500/movieList/index.html')
})

afterAll(async ()=> {
    await driver.quit()
})



test('movie crossed off', async ()=> {
    await driver.findElement(By.xpath('//input')).sendKeys('Blade Runner')
    await driver.findElement(By.xpath('//button')).click()
    let titleSpan = await driver.findElement(By.xpath('//li/span'))
    await titleSpan.click()
    let message = await driver.findElement(By.xpath('//aside')).getText()
    console.log(message)

    await driver.sleep(2000)
    
    expect(message).toContain('watched')
})

test('Movie added back to list', async () => {
    let titleSpan = await driver.findElement(By.xpath('//li/span'))
    await titleSpan.click()
    let message = await driver.findElement(By.xpath('//aside')).getText()
    console.log(message)

    await driver.sleep(2000)
    
    expect(message).toContain('added')
})

test('movie deleted', async () => {
    let deleteButton = await driver.findElement(By.xpath('//li/button'))
    await deleteButton.click()
    let message = await driver.findElement(By.xpath('//aside')).getText()
    console.log(message)

    await driver.sleep(2000)
    
    expect(message).toContain('deleted')

})
