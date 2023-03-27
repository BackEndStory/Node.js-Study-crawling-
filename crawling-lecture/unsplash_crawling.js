const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');


// const splash_crawler = async () => {
//     try {

//         const browser = await puppeteer.launch({ headless: true });
//         const page = await browser.newPage();
//         await page.goto('https://unsplash.com');
//         const result = await page.evaluate(() => {
//             img_list = [];
//             const img = document.querySelectorAll('div.ripi6 img.tB6UZ.a5VGX');
//             if(img.length){
//                 img.forEach((v)=>{
//                     if(v.src){
//                           img_list.push(v.src);
//                     }
//                 });
//             }
//             return img_list
//         });
//     console.log(result);
//     } catch (e) {
//         console.log(e);
//     }

// }

// splash_crawler();



const school_crawler = async () => {
    try {

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto('https://www.shinhan.ac.kr/kr/194/subview.do');
        const result = await page.evaluate(() => {
            name_list = [];
            url_list = [];
            const name = document.querySelectorAll('a.artclLinkView strong');
            if (name.length) {
                name.forEach((v) => {

                    name_list.push(v.textContent);

                });}
            const url = document.querySelectorAll('a.artclLinkView');
            if (url.length) {
                url.forEach((v) => {

                    url_list.push(v.href);
            
                });
               }
                return {name_list,url_list}
            });
        console.log(result.name_list);
        console.log(result.url_list);
    } catch (e) {
        console.log(e);
    }

}

school_crawler();