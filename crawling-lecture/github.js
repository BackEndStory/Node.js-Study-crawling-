const puppeteer = require('puppeteer');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: "../.env" });   // dotenv사용 시 path  설정해주기



const github = async () => {
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
        const keyword = 'crawler';
        await page.goto(`https://www.github.com/search?q=${keyword}`, {
            waitUntil: 'networkidle0',
        });
        let results = [];
        let pageNum = 1;
        while(pageNum < 3){
            const r = await page.evaluate(() => {
                const tags = document.querySelectorAll(".repo-list li");
                const result = [];
                tags.forEach((t) => {
                    result.push({
                        title : t && t.querySelector('.d-flex') && t.querySelector('.d-flex').textContent.trim(),
                        lang : t && t.querySelector("span[itemprop='programmingLanguage']") && t.querySelector("span[itemprop='programmingLanguage']").textContent.trim(),
                        start : t && t.querySelector('.Link--muted') && t.querySelector('.Link--muted').textContent.trim()
                    })
                });
                return result;
            });
            results = results.concat(r);
            await page.waitForSelector('.next_page');
            await page.click('.next_page');
            pageNum++;
            await page.waitForResponse((response) => {
                return response.url().startsWith(`https://github.com/search/count?p=${pageNum}`) && response.status() === 200;
              });
            await page.waitForTimeout(2000)
          
        }  
        console.log(results.length);
        console.log(results[0]);
    
     


    } catch (e) {
        console.log(e);
    }
}

github();
