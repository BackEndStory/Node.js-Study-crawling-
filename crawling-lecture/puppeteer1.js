const puppeteer = require('puppeteer');

const crawling = async () =>{
    const browser = await puppeteer.launch({headless:false});    // puppeteer 시작
    const page = await browser.newPage();    //   브라우저 시작
    await page.goto('http://naver.com');      // 네이버로 이동
    await page.waitForTimeout(10000);    // 버전때문에 waitFor 대신 waitForTimeout을 써줘야함  => 해당 초만큼 대기
    await page.close();                    // 페이지 닫기
    await browser.close();                // 브라우저 닫기
};

crawling();