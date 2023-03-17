const parse = require('csv-parse/lib/sync');            // 바이너리 파일을 문자열로 바꿔줌(버전을 4~대로 해야됨)
const fs = require('fs');                               // 파일 시스템
const puppeteer = require('puppeteer');


fs.readdir('poster',(err)=>{
    if(err){
        console.log('poster 폴더가 없어 poster 폴더를 생성합니다.');
        fs.mkdirSync('poster');
    }
});


const get_img_crawling = async () => {
    try {
        const result = [];
        const browser = await puppeteer.launch({ headless: false });    // puppeteer 시작
        for(const [i,r] of recodes.entries()) {
            try {
               
                const page = await browser.newPage();
                await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36');
                await page.goto(r[1]);
                const text = await page.evaluate(()=>{                    // dom. document를 쓸 때 evaluate안에다가 적는다
                    const scoreEl = document.querySelector('.score.score_left .star_score');
                    let score = '';
                    if(scoreEl){
                        score =  score.textContent;
                    }
                    const imgEl = document.querySelector('.poster img');
                    let img = '';
                    if(imgEl){
                        img = imgEl.src;
                    }
                    return { score, img};
                });
                if(text){
                    console.log(r[0], "평점", text.trim());
                    result.push([r[0], r[1], text.trim()]);   
                } 
                await page.waitForTimeout(2000);
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

get_img_crawling();
