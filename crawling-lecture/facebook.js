const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: "../.env" });   // dotenv사용 시 path  설정해주기


const faceBookLogin = async () => {
    try {

        const browser = await puppeteer.launch({ headless: false, args: ['--window-size=1920,1080'] });
        const page = await browser.newPage();
        const id = process.env.ID;
        const password = process.env.PASS;
        await page.setViewport({
            width: 1920,
            height: 1080
        });
        await page.goto('https://facebook.com');
        // await page.evaluate((id,password)=>{
        //     document.querySelector("#email").value = "01071348924";        // 해당 텍스트에 값 입력
        //     document.querySelector("#pass").value = "cn37rqww@";
        // },id,password);

        await page.type("#email",process.env.ID);    //
        await page.type("#pass",process.env.PASS);
        await page.waitForSelector("._6ltg");         // 해당 버튼 태그 기다리기
        await page.hover("._6ltg");
        await page.waitForTimeout(2000);
        await page.click("._6ltg");                   // 해당 버튼 클릭 시
        await page.waitForTimeout(6000);
        await page.keyboard.press("Escape");


        // await page.close();
        // await browser.close();
    } catch (e) {
        console.log(e);
    }

}

faceBookLogin();