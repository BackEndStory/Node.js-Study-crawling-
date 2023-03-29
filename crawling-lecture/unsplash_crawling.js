const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');

fs.readdir('imgs', (err) => {
    if (err) {
        console.log('imgs 폴더가 없어 imgs 폴더를 생성합니다.');
        fs.mkdirSync('imgs');
    }
});
const splash_crawler = async () => {
    try {

        const browser = await puppeteer.launch({ headless: true});
        const page = await browser.newPage();
        await page.goto('https://unsplash.com');
        result = [];
        while (result.length <= 50) {

            const srcs = await page.evaluate(() => {
                const img_list = [];
                const img = document.querySelectorAll('div.MorZF ');

                if (img.length) {
                    img.forEach((v) => {
                        let src = v.querySelector("img.tB6UZ.a5VGX").src;
                        if (src) {
                            img_list.push(src);
                        }
                        v.parentElement.removeChild(v);                 // 해당 태그 삭제
                    });
                }
                window.scrollBy(0, 100);                                 // 스크롤 움직이기
                setTimeout(() => {
                    window.scrollBy(0, 200);
                }, 500);

                return img_list
            });
            result = result.concat(srcs);


            await page.waitForSelector('div.MorZF');                         // 태그 재설정
            console.log("새 이미지 태그 로딩 완료");
        }
        console.log(result);
        result.forEach(async (src) => {
            const imageResult = await axios.get(src.replace(/\?.*$/, ''), {
                responseType: 'arraybuffer'
            });
            fs.writeFileSync(`imgs/${new Date().valueOf()}.jpeg`, imageResult.data);

        });
        await page.close();
        await browser.close();
    } catch (e) {
        console.log(e);
    }

}

splash_crawler();



// const school_crawler = async () => {
//     try {

//         const browser = await puppeteer.launch({ headless: true });
//         const page = await browser.newPage();
//         await page.goto('https://www.shinhan.ac.kr/kr/194/subview.do');
//         const result = await page.evaluate(() => {
//             name_list = [];
//             url_list = [];
//             const name = document.querySelectorAll('a.artclLinkView strong');
//             if (name.length) {
//                 name.forEach((v) => {

//                     name_list.push(v.textContent);

//                 });}
//             const url = document.querySelectorAll('a.artclLinkView');
//             if (url.length) {
//                 url.forEach((v) => {

//                     url_list.push(v.href);
            
//                 });
//                }
//                 return {name_list,url_list}
//             });
//         console.log(result.name_list);
//         console.log(result.url_list);
//     } catch (e) {
//         console.log(e);
//     }

// }

// school_crawler();