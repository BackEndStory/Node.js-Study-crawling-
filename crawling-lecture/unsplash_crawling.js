const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');


const splash_crawler = async () => {
    try {

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto('https://unsplash.com');
        const result = await page.evaluate(() => {
            img_list = [];
            const img = document.querySelectorAll('div.ripi6 img.tB6UZ.a5VGX');
            if(img.length){
                img.forEach((v)=>{
                    if(v.src){
                          img_list.push(v.src);
                    }
                });
            }
            return img_list
        });
    console.log(result);
    } catch (e) {
        console.log(e);
    }

}

splash_crawler();