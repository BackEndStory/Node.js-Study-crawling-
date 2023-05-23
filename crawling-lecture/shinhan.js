const puppeteer = require('puppeteer');
const fs = require('fs'); const dotenv = require('dotenv');
dotenv.config({ path: "../.env" });   // dotenv사용 시 path  설정해주기


const shinhan = async () => {
    try {

        const browser = await puppeteer.launch({
            headless: false,
            args: ['--window-size=1920,1080', '--disable-notifications'],
            userDataDir: 'C:\Program Files\Google\Chrome\Application\112.0.5615.138\default_apps'
        }); // '--disable-notifications' 알람 뜨는것을 막음 

        const page = await browser.newPage();
        await page.setViewport({
            width: 1080,
            height: 1080
        });
        await page.goto('https://www.shinhan.ac.kr/kr/194/subview.do', {
            waitUntil: 'networkidle0',
        });
     

        const shinhan = await page.evaluate(() => {
            const content = document.querySelector('tbody>tr a');
            return content;
        });

        console.log(shinhan)




        await page.waitForTimeout(3000);




    } catch (e) {
        console.log(e);
    }
}

shinhan();