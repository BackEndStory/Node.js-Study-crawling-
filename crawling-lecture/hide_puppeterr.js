const parse = require('csv-parse/lib/sync');            // 바이너리 파일을 문자열로 바꿔줌(버전을 4~대로 해야됨)
const fs = require('fs');                               // 파일 시스템
const csv = fs.readFileSync('csv/data.csv');           // csv파일 가져오기
const stringify = require('csv-stringify/lib/sync');    // 문자열을 바이너리 형식으로 바꿔줌(버전을 4~대로 해야됨)
const recodes = parse(csv.toString('utf-8'));           // csv가 버퍼형식이므로 한글로 전환 후 파싱
const puppeteer = require('puppeteer');


/**
 * 로봇이 아닌 척 하기 위한 크롤링 함수
 */
const hide_csv_crawling = async () => {
    try {
        const result = [];
        const browser = await puppeteer.launch({ headless: false });    // puppeteer 시작
        for(const [i,r] of recodes.entries()) {
            try {
               
                const page = await browser.newPage('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36');
                await page.setUserAgent('');
                await page.goto(r[1]);
                const text = await page.evaluate(()=>{                    // dom. document를 쓸 때 evaluate안에다가 적는다
                    const score = document.querySelector('.score.score_left .star_score');
                    if(score){
                        return score.textContent;
                    }
                });
                if(text){
                    console.log(r[0], "평점", text.trim());
                    result.push([r[0], r[1], text.trim()]);   
                } 
                await page.waitForTimeout(2000)
            } catch (e) {
                console.error(e);
            }
        };
        await browser.close();
        const str = stringify(result);
        fs.writeFileSync('csv/result.csv', str);
    } catch (e) {
        console.error(e);
    }
};

csv_crawling_write_data();