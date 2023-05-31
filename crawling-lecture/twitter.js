const puppeteer = require('puppeteer');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: "../.env" });   // dotenv사용 시 path  설정해주기


/**
 * infinity 형식의 트위터
 */
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
        await page.click('input[type=submit]');

        await page.waitForNavigation();

        while (await page.$('.js-stream-item')) {
            const firstItem = await page.$('.js-stream-item:first-child');
            if (await page.$('.js-stream-item:first-child .js-macaw-cards-iframe-container')) {
                const tweetId = await page.evaluate((item) => {
                    return item.dataset.itemId;
                }, firstItem);
                await page.evaluate(() => {
                    window.scrollBy(0, 10);          // 스크롤을 내려줘야지 데이터 초기화
                });
                await page.waitForSelector('.js-stream-item:first-child iframe');
                const iframe = await page.frames().find((frame) => frame.url().includes(tweetId));
                if (iframe) {
                    const result = await iframe.evaluate(() => {
                        return {
                            title: document.querySelector('h2') && document.querySelector('h2').textContent,
                        }
                    });
                    console.log(result);
                }
            }
            await page.evaluate((item) => item.parentNode.removeChild(item), firstItem);              // 데이터를 담는다면 그 데이터 삭제
            await page.evaluate(() => {
                window.scrollBy(0, 10);
            });
            await page.waitForSelector('.js-stream-item')
            await page.waitFor(2000);
        }

    } catch (e) {
        console.log(e);
    }
}

twitter();