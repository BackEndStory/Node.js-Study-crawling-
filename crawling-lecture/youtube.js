const puppeteer = require('puppeteer-extra');
const fs = require('fs'); const dotenv = require('dotenv');
dotenv.config({ path: "../.env" });   // dotenv사용 시 path  설정해주기
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const youtube = async () => {
    try {

        const browser = await puppeteer.launch({
            headless: false,
            args: ['--window-size=1920,1080', '--disable-notifications'],
            //      userDataDir: 'C:\Program Files\Google\Chrome\Application\112.0.5615.138\default_apps'
        }); // '--disable-notifications' 알람 뜨는것을 막음 

        const page = await browser.newPage();
        await page.setViewport({
            width: 1080,
            height: 1080
        });
        await page.goto('https://youtube.com', {
            waitUntil: 'networkidle0',
        });

        await page.waitForTimeout(2000);
        await page.waitForSelector('yt-button-shape > a');
        await page.click('yt-button-shape > a');
        await page.waitForSelector('#identifierId');
        await page.waitForTimeout(3000);
        await page.type('#identifierId', process.env.GOOGLEEMAIL);
        await page.waitForTimeout(1000);
        await page.click("#identifierNext");                 // 크롬 자체에서 막음
        // const login = await page.evaluate(() => {
        //     document.querySelector('#identifierId');
        // })
     

    } catch (e) {
        console.log(e);
    }
}

youtube();