const puppeteer = require('puppeteer');


const alert_confirm_prompt = async () => {
    try {
        const browser = await puppeteer.launch({ headless: false, args: ['--window-size=1920,1080', '--disable-notifications'] });
        const page = await browser.newPage();
        await page.setViewport({
            width: 1080,
            height: 1080
        });
        // page.on('dialog', async (dialog)=>{                        // alert , confirm, prompt보다 앞에 와야함
        //     console.log(dialog.type(), dialog.message());          // alert 대처방법
        //     await dialog.dismiss();
        // });
        // page.on('dialog', async (dialog)=>{                        // alert , confirm, prompt보다 앞에 와야함
        //     console.log(dialog.type(), dialog.message());          // confirm 대처방법
        //    // await dialog.dismiss();                                //  취소 누를 시
        //     await dialog.accept();                                 //  확인 누를 시 
        // });

        page.on('dialog', async (dialog)=>{                        // alert , confirm, prompt보다 앞에 와야함
            console.log(dialog.type(), dialog.message());          // prompt 대처방법
            if(dialog.message() === "끄세요"){
                await dialog.accept('https://naver.com'); 
            } else{
                await dialog.accept('https://google.com');  
            }                                                        
        });
        // await page.evaluate(()=>{                               // alert 실행 
        //     alert("이 창이 꺼져야 다음으로 넘어갑니다.");
        //     location.href = "https://naver.com";
        // });

        // await page.evaluate(()=>{                                  // confirm 실행                           
        //     if(confirm("이 창이 꺼져야 다음으로 넘어갑니다.")){
        //         location.href = "https://google.com";
        //     }else{
        //         location.href = "https://naver.com";
        //     }
        // });

        await page.evaluate(()=>{                               // prompt 실행 
            const data = prompt('주소를 입력하세요');
            location.href = data;
        });
    } catch (e) {
        console.log(e);
    }
}

alert_confirm_prompt();