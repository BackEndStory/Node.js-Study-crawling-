const puppeteer = require('puppeteer');


const proxy = async () => {
    try {

        let browser = await puppeteer.launch({ headless: false});
        let page = await browser.newPage();
        await page.goto('http://spys.one/free-proxy-list/KR/');
    
        const serverData = await page.evaluate(() => {
            const ips = Array.from(document.querySelectorAll("tr> td:first-of-type > font.spy14 ")).map((v)=>v.textContent.replace(/document\.write\(.+\)/,""));
            const types = Array.from(document.querySelectorAll('tr > td:nth-of-type(2)')).slice(5).map((v)=> v.textContent);
            const latencies = Array.from( document.querySelectorAll("tr> td:nth-of-type(6) > font.spy1 ")).map((v)=> v.textContent);
            console.log(types);
            return ips.map((v,i)=>{                      // 배열 순서대로 배열 합치기
                return {
                    ip:v,
                    type: types[i],
                    latency: latencies[i]
                };
            });
        });
        const filtered = serverData.filter((v) => v.type.startsWith("HTTP")).sort((p,c) => p.latency - c.latency);    // type이 HTTP로 시작하고latency 오름차순으로 정렬
        console.log(filtered[0]);
        await page.close();
        await browser.close();
        browser = await puppeteer.launch({ 
            headless: false,
            args: ['--window-size=1920,1080', '--disable-notifications',`--proxy-server=${filtered[3].ip}`]      // 해당 아이피로 접속
        });
        page = await browser.newPage();
    } catch (e) {
        console.log(e);
    }
}

proxy();