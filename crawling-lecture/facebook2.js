const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: "../.env" });   // dotenv사용 시 path  설정해주기


const faceBook = async () => {
    try {

        const browser = await puppeteer.launch({ headless: false, args: ['--window-size=1920,1080', '--disable-notifications'] }); // '--disable-notifications' 알람 뜨는것을 막음 
        const page = await browser.newPage(); 
 
        await page.setViewport({
            width: 1080,
            height: 1080
        });
        await page.goto('https://facebook.com');
        await page.type("#email", process.env.ID);    
        await page.type("#pass", process.env.PASS);
        await page.waitForSelector("._6ltg");         // 해당 버튼 태그 기다리기
        await page.click("._6ltg");
 
        await page.waitForResponse((response)=>{
                return response.url().includes('/login/');    // 단순 시간을 기다리기보다 개발자 도구 네트워크를 통해 로그인이 완료 됐다는 신호를 받고 실행
            });
        await page.waitForTimeout(3000);
        // const newPost = await page.evaluate(()=>{
        //     const firstFeed = document.querySelector('div[data-pagelet="FeedUnit_{n}"]');                           // 게시글 크롤링 실패(태그 분석)
        //     const name = document.querySelectorAll('span.xt0psk2  strong span');                                     // 게시글 작성자 크롤링 실패(태그 분석)
        //     const content = document.querySelectorAll('.x6s0dn4.x1jx94hy.x78zum5.xdt5ytf.x6ikm8r.x10wlt62.x1n2onr6.xh8yej3');  // 게시글 내용 크롤링 실패(태그 분석)
     
        //     document.querySelector("div[aria-label='좋아요'").click();    // 좋아요 태그 클릭
        
        //     return {
        //         name,
        //         content
        //     };
        // });
        
        const likeBtn =  await page.$("div[aria-label='공감']");
        await page.evaluate((like)=>{
            const likeBtn2 =  document.querySelector("div[aria-label='좋아요']");
            if(like.getAttribute("aria-label")=="공감"){              // 좋아요가 눌러져 있을 경우 누르지 않음
               likeBtn2.click();    // 좋아요 태그 클릭
            }
        
        },likeBtn);
    
    } catch (e) {
        console.log(e);
    }
}

faceBook();