const puppeteer = require('puppeteer');
const fs = require('fs'); const dotenv = require('dotenv');
dotenv.config({ path: "../.env" });   // dotenv사용 시 path  설정해주기


const shinhan = async () => {
    try {

        const browser = await puppeteer.launch({
            headless: false,
            args: ['--window-size=1920,900', '--disable-notifications'],
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

        const writerArray = [];
        const contentArray = [];

        for (var i = 1; i < 12; i++) {
            console.log(i);
            const shinhan = await page.evaluate((index) => {
            
                const content = document.querySelector(`tbody>tr:nth-child(${index})>td._artclTdTitle>a>strong`).textContent;
                const writer = document.querySelector(`tbody>tr:nth-child(${index})>td._artclTdWriter`).textContent;

         
                

                return {content, writer};
            }, i);
            writerArray.push(shinhan.writer);
            contentArray.push(shinhan.content);
            console.log(shinhan);
        }

        console.log(writerArray);
        console.log(contentArray);




        await page.waitForTimeout(3000);




    } catch (e) {
        console.log(e);
    }
}

shinhan();