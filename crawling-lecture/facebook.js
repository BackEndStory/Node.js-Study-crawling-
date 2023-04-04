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
        await page.hover("._6ltg");                   // 버튼위에 마우스 올리기
        await page.evaluate(() => {
            (() => {
              const box = document.createElement('div');
              box.classList.add('mouse-helper');
              const styleElement = document.createElement('style');
              styleElement.innerHTML = `
                .mouse-helper {
                  pointer-events: none;
                  position: absolute;
                  z-index: 100000;
                  top: 0;
                  left: 0;
                  width: 20px;
                  height: 20px;
                  background: rgba(0,0,0,.4);
                  border: 1px solid white;
                  border-radius: 10px;
                  margin-left: -10px;
                  margin-top: -10px;
                  transition: background .2s, border-radius .2s, border-color .2s;
                }
                .mouse-helper.button-1 {
                  transition: none;
                  background: rgba(0,0,0,0.9);
                }
                .mouse-helper.button-2 {
                  transition: none;
                  border-color: rgba(0,0,255,0.9);
                }
                .mouse-helper.button-3 {
                  transition: none;
                  border-radius: 4px;
                }
                .mouse-helper.button-4 {
                  transition: none;
                  border-color: rgba(255,0,0,0.9);
                }
                .mouse-helper.button-5 {
                  transition: none;
                  border-color: rgba(0,255,0,0.9);
                }
                `;
              document.head.appendChild(styleElement);
              document.body.appendChild(box);
              document.addEventListener('mousemove', event => {
                box.style.left = event.pageX + 'px';
                box.style.top = event.pageY + 'px';
                updateButtons(event.buttons);
              }, true);
              document.addEventListener('mousedown', event => {
                updateButtons(event.buttons);
                box.classList.add('button-' + event.which);
              }, true);
              document.addEventListener('mouseup', event => {
                updateButtons(event.buttons);
                box.classList.remove('button-' + event.which);
              }, true);
              function updateButtons(buttons) {
                for (let i = 0; i < 5; i++)
                  box.classList.toggle('button-' + i, !!(buttons & (1 << i)));
              }
            })();
          });
        await page.mouse.move(100,200);
        await page.waitForTimeout(2000);
        await page.mouse.click(900,300);
    
        //await page.click("._6ltg");                   // 해당 버튼 클릭 시
        // await page.waitForResponse((response)=>{
        //     return response.url().includes('login_attempt');    // 단순 시간을 기다리기보다 개발자 도구 네트워크를 통해 로그인이 완료 됐다는 신호를 받고 실행
        // });
        // await page.waitForTimeout(6000);
        // await page.keyboard.press("Escape");
        // await page.click("div.x1rg5ohu.x1n2onr6.x3ajldb.x1ja2u2z");

        // await page.waitForSelector("div.x1oo3vh0.x1rdy4ex div.xu06os2.x1ok221b");
        // await page.waitForTimeout(3000);
        // await page.evaluate(()=>{
        //     document.querySelectorAll("div.x1oo3vh0.x1rdy4ex div.xu06os2.x1ok221b")[4].click();
        // })
        //await page.click();
        // await page.close();
        // await browser.close();
    } catch (e) {
        console.log(e);
    }

}

faceBookLogin();