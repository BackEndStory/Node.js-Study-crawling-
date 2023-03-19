const parse = require('csv-parse/lib/sync');            // 바이너리 파일을 문자열로 바꿔줌(버전을 4~대로 해야됨)
const stringify = require('csv-stringify/lib/sync'); 
const fs = require('fs');                               // 파일 시스템
const puppeteer = require('puppeteer');
const csv = fs.readFileSync('csv/data.csv'); 
const recodes = parse(csv.toString('utf-8'));           // csv가 버퍼형식이므로 한글로 전환 후 파싱
const axios = require('axios');
fs.readdir('poster', (err) => {
    if (err) {
        console.log('poster 폴더가 없어 poster 폴더를 생성합니다.');
        fs.mkdirSync('poster');
    }
});


const get_img_crawling = async () => {
    try {
        const result_list = [];
        const browser = await puppeteer.launch({ headless: false });    // puppeteer 시작
        for (const [i, r] of recodes.entries()) {
            try {

                const page = await browser.newPage();
                await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36');
                await page.goto(r[1]);
                const result = await page.evaluate(() => {                    // dom. document를 쓸 때 evaluate안에다가 적는다
                    const scoreEl = document.querySelector('.score.score_left .star_score');
                    let score = '';
                    if (scoreEl) {
                        score = score.textContent;
                    }
                    const imgEl = document.querySelector('.poster img');
                    let img = '';
                    if (imgEl) {
                        img = imgEl.src;
                    }
                    return { score, img };
                });
                if (result.score) {
                    console.log(r[0], "평점", result.score.trim(), result.img.trim());
                    result_list.push([r[0], r[1], result.score.trim(), result.img.trim()]);
                }
                if (result.img) {
                    const imgResult = await axios.get(result.img.replace(/\?.*$/,''), {
                        responseType: 'arraybuffer',
                    });
                    fs.writeFileSync(`poster/${r[0]}.jpg`, imgResult.data);
                }
                await page.waitForTimeout(1000);
            } catch (e) {
                console.error(e);
            }
        };
        await browser.close();
        const str = stringify(result_list);
        fs.writeFileSync('csv/result.csv', str);
    } catch (e) {
        console.error(e);
    }
};

get_img_crawling();
