const puppeteer = require('puppeteer');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: "../.env" });   // dotenv사용 시 path  설정해주기



const twitter = async () => {
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

        await page.goto(`https://www.twitter.com`, {
            waitUntil: 'networkidle0',
        });
        await page.type('.LoginForm-username input', process.env.EMAIL);
        await page.type('.LoginForm-password input', process.env.PASSWORD);
        await page.waitForSelector('input[type=submit]');
        await page.click();

    } catch (e) {
        console.log(e);
    }
}

twitter();