const puppeteer = require('puppeteer');

const crawling = async () => {
    const browser = await puppeteer.launch({ headless: false });    // puppeteer 시작

    const [page1, page2, page3] = await Promise.all([      //   브라우저 시작
        browser.newPage(),
        browser.newPage(),
        browser.newPage()
    ]);
    await Promise.all([
        page1.goto('http://naver.com'),
        page2.goto('http://google.com'),
        page3.goto('https://www.inflearn.com/course/%ED%81%AC%EB%A1%A4%EB%A7%81/dashboard')
    ]);
    await Promise.all([
        page1.waitForTimeout(4000),    // 버전때문에 waitFor 대신 waitForTimeout을 써줘야함  => 해당 초만큼 대기
        page1.waitForTimeout(2000),
        page1.waitForTimeout(1000),
    ]);

    await page1.close();                    // 페이지 닫기
    await page2.close();
    await page3.close();
    await browser.close();                // 브라우저 닫기
};

//crawling();



const parse = require('csv-parse/lib/sync');            // 버전을 4~대로 해야됨
const fs = require('fs');                               // 파일 시스템
const csv = fs.readFileSync('csv/data.csv');           // csv파일 가져오기



const recodes = parse(csv.toString('utf-8'));           // csv가 버퍼형식이므로 한글로 전환 후 파싱

const csv_crawling = async () => {
    try{
        const browser = await puppeteer.launch({ headless: false });    // puppeteer 시작
        await Promise.all(recodes.map( async (r,i) => { 
            try{
                const page = await browser.newPage();
                await page.goto(r[1]);
                const scoreEl = await page.$('.score.score_left .star_score');
                if(scoreEl){
                    const text = await page.evaluate(tag => tag.textContent, scoreEl);
                    console.log(r[0], "평점", text.trim());
                }
            }catch(e){
                console.error(e);
            }
        }));
      await browser.close();
    }catch(e){
        console.error(e);
    }
};
   
    
csv_crawling();




