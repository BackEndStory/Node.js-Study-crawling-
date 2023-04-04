const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: "../.env" });   // dotenv사용 시 path  설정해주기


const faceBookLogin = async () => {
    try {

        const browser = await puppeteer.launch({ headless: false, args: ['--window-size=1920,1080', '--disable-notifications'] });
        const page = await browser.newPage();
        const id = process.env.ID;
        const password = process.env.PASS;
        await page.setViewport({
            width: 1080,
            height: 1080
        });
        await page.goto('https://facebook.com');
        // await page.evaluate((id,password)=>{
        //     document.querySelector("#email").value = "01071348924";        // 해당 텍스트에 값 입력
        //     document.querySelector("#pass").value = "cn37rqww@";
        // },id,password);

        await page.type("#email", process.env.ID);    //
        await page.type("#pass", process.env.PASS);
        await page.waitForSelector("._6ltg");         // 해당 버튼 태그 기다리기
        await page.hover("._6ltg");
        await page.waitForTimeout(2000);
        await page.click("._6ltg");                   // 해당 버튼 클릭 시
        await page.waitForResponse((response)=>{
            return response.url().includes('login_attempt');    // 단순 시간을 기다리기보다 개발자 도구 네트워크를 통해 로그인이 완료 됐다는 신호를 받고 실행
        });


        await page.waitForTimeout(6000);
        await page.keyboard.press("Escape");
        await page.click("div.x1rg5ohu.x1n2onr6.x3ajldb.x1ja2u2z");


        // await page.close();
        // await browser.close();
    } catch (e) {
        console.log(e);
    }

}

faceBookLogin();