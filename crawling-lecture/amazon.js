// const puppeteer = require('puppeteer-extra');
// const fs = require('fs'); 
// const dotenv = require('dotenv');
// dotenv.config({ path: "../.env" });   // dotenv사용 시 path  설정해주기



// const amazon = async () => {
//     try {
//         const results = [];
//         const browser = await puppeteer.launch({
//             headless: false,
//             args: ['--window-size=1920,1080', '--disable-notifications'],
//             //      userDataDir: 'C:\Program Files\Google\Chrome\Application\112.0.5615.138\default_apps'
//         }); // '--disable-notifications' 알람 뜨는것을 막음 
//         await Promise.all([1,2,3,4,5].map( async (v) => {
//             const page = await browser.newPage();
//             await page.setViewport({
//                 width: 1080,
//                 height: 1080
//             });
//             const keyword = 'mouse';
//             await page.goto(`https://www.amazon.com/s?k=${keyword}&page=${v}`, {
//                 waitUntil: 'networkidle0',
//             });
      
//             const r = await page.evaluate(() => {
//                 const data = document.querySelectorAll('.s-result-list .a-section.a-spacing-small.a-spacing-top-small ');
//                 const result = [];
//                 data.forEach((t) => {
//                     result.push({
//                         "name" : t && t.querySelector('h2') && t.querySelector('h2').textContent,
//                         "price" : t && t.querySelector('span.a-offscreen') && t.querySelector('span.a-offscreen').textContent
//                     });
//                 });
//                 return result;
//             });
//        //     console.log(results);
//             results.concat(r);
               
//         }));
//         console.log(results.length);
//         console.log(results[0]);

      


//     } catch (e) {
//         console.log(e);
//     }
// }

// amazon();

const puppeteer = require('puppeteer');

const crawler = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--window-size=1920,1080', '--disable-notifications', '--no-sandbox'],
    });
    let result = [];
    await Promise.all([1,2,3,4,5].map(async (v) => {
      const page = await browser.newPage();
      await page.setViewport({
        width: 1080,
        height: 1080,
      });
      const keyword = 'mouse';
      await page.goto(`https://www.amazon.com/s?k=${keyword}&page=${v}`, {
        waitUntil: 'networkidle0',
      });
      const r = await page.evaluate(() => {
        const tags = document.querySelectorAll('.s-result-list div.a-section.a-spacing-small.a-spacing-top-small');
        const result = [];
        tags.forEach((t) => {
          result.push({
            name: t && t.querySelector('h2') && t.querySelector('h2').textContent.trim(),
           price: t && t.querySelector('span.a-offscreen') && t.querySelector('span.a-offscreen').textContent,
          })
        });
        return result;
      });
      result = result.concat(r);
      // await page.close();
    }));
    console.log(result.length);
    console.log(result[0]);
    // await browser.close();
  } catch (e) {
    console.error(e);
  }
};

crawler();