const parse = require('csv-parse/lib/sync');            // 바이너리 파일을 문자열로 바꿔줌(버전을 4~대로 해야됨)
const stringify = require('csv-stringify/lib/sync');
const fs = require('fs');                               // 파일 시스템
const puppeteer = require('puppeteer');
const csv = fs.readFileSync('csv/data.csv');
const recodes = parse(csv.toString('utf-8'));           // csv가 버퍼형식이므로 한글로 전환 후 파싱
const axios = require('axios');
fs.readdir('screenshoot', (err) => {
    if (err) {
        console.log('screenshoot 폴더가 없어 screenshoot 폴더를 생성합니다.');
        fs.mkdirSync('screenshoot');
    }
});


const screenshot_crawling = async () => {
    try {
        const result_list = [];
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--window-size=1920,1080']
        });    // puppeteer 시작
        for (const [i, r] of recodes.entries()) {
            try {

                const page = await browser.newPage();
                await page.setViewport({ width: 1920, height: 1080 });
                await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36');
                await page.goto(r[1]);
                const result = await page.evaluate(() => {                    // dom. document를 쓸 때 evaluate안에다가 적는다
                    const scoreEl = document.querySelector('.score.score_left .star_score');
                    let score = '';
                    if (scoreEl) {
                        score = score.textContent;
                    }
                    return { score };
                });

                if (result.score) {
                    console.log(r[0], "평점", result.score.trim());
                    result_list.push([r[0], r[1], result.score.trim()]);

                }

                await page.screenshot({
                    path: `screenshoot/${r[0]}.png`,           // 스크린샷 저장 경로
                    fullPage: false,                           // 스크린샷 전체 페이지
                    clip: {                                    // 스크린샷 사이즈 조절
                        x:100,
                        y:100,
                        width:300,
                        height:300
                    }
                });           // 스크린샷 하기 

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

screenshot_crawling();