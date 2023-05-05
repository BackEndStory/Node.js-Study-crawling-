const puppeteer = require('puppeteer');
const fs = require('fs');const dotenv = require('dotenv');
dotenv.config({ path: "../.env" });   // dotenv사용 시 path  설정해주기


const instargram = async () => {
    try {

        const browser = await puppeteer.launch({ 
            headless: false, 
            args: ['--window-size=1920,1080', '--disable-notifications'],
            userDataDir : 'C:\Program Files\Google\Chrome\Application\112.0.5615.138\default_apps'
         }); // '--disable-notifications' 알람 뜨는것을 막음 
             


        const page = await browser.newPage(); 
 
        await page.setViewport({
            width: 1080,
            height: 1080
        });
        await page.goto('https://www.instagram.com/');
        
        if(await page.$("img[alt='sss.ryeol님의 프로필 사진']")){
            console.log("자동로그인 완료");

        }
        else{
            await page.type("input[name='username']", process.env.INSTAGRAM_ID);    
            await page.type("input[name='password']", process.env.INSTAGRAM_PASSWORD);
            await page.click("._acan._acap._acas._aj1-");
            await page.waitForNavigation();                      // 로그인 넘어가는 거 기다리기
            await page.click("div[tabindex='0']");
    

        }
        await page.waitForTimeout(3000);
        const newPost = await page.evaluate(() => {
            const article = document.querySelector('article:first-child');
            const postId = article.querySelector('h1 a') && article.querySelector('h1 a').href;
            const name = article.querySelector('span .xt0psk2 a') && article.querySelector('span .xt0psk2 a').textContent;
            const img = article.querySelector('._aagv img') && article.querySelector('._aagv img').src;
            const content = article.querySelector('span h1._aacl._aaco._aacu._aacx._aad7._aade') && article.querySelector('span h1._aacl._aaco._aacu._aacx._aad7._aade').textContent;

            return {
                postId,
                postId,
                name,
                img,
                content
            };
        });

        console.log(newPost);



       
        
    
    } catch (e) {
        console.log(e);
    }
}

instargram();