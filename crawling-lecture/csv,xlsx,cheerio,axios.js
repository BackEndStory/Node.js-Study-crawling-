const cheerio = require('cheerio');
const parse = require('csv-parse/lib/sync');            // 버전을 4~대로 해야됨
const fs = require('fs');                               // 파일 시스템
const csv = fs.readFileSync('csv/data.csv');           // csv파일 가져오기
const axios = require('axios');



// const recodes1 = parse(csv.toString('utf-8'));           // csv가 버퍼형식이므로 한글로 전환 후 파싱
// recodes1.forEach((i,r) => { 
//     console.log(r,i);
// });

const add_to_sheet = require('./add_to_xlsx_data');
const xlsx = require('xlsx');
const workbook = xlsx.readFile('xlsx/data.xlsx');
const ws = workbook.Sheets.영화목록;                     // 데이터 액셀 시트 중 영화목록 가져오기
const recodes2 = xlsx.utils.sheet_to_json(ws,
    // {header:'A'}
);             // 시트를 제이슨 형식으로 변환  {header:'A'}를 넣어줄 시 해당 A,B에 맞게 키를 가져옴
// console.log(ws['!ref']);
// console.log(recodes2);

recodes2.forEach((r) => {
    console.log(r.제목, r.링크);
})

const crawler = async () => {
    //await Promise.all( recodes2.map( async (r) =>{
    add_to_sheet(ws, 'C1', 's', '평점');
    for (const [e, r] of recodes2.entries()) {

        const response = await axios.get(r.링크);
        if (response.status === 200) {
            const html = response.data;

            const $ = cheerio.load(html);

            const text = $('.score.score_left .star_score').text();  // 태그 시 띄어쓰기도 주의!
            console.log(r.제목, '평점', text.trim());         // 공백제거
            const newCell = 'C' + (e + 2);
            add_to_sheet(ws, newCell, 'n', parseFloat(text.trim()));
        }
    }
    xlsx.writeFile(workbook, 'xlsx/data.xlsx');
    //   }
    //   )
    //  );
};
crawler();



