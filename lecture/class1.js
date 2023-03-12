const parse = require('csv-parse/lib/sync');            // 버전을 4~대로 해야됨
const fs = require('fs');                               // 파일 시스템
const csv = fs.readFileSync('csv/data.csv');           // csv파일 가져오기

const recodes1 = parse(csv.toString('utf-8'));           // csv가 버퍼형식이므로 한글로 전환 후 파싱
recodes1.forEach((i,r) => { 
    console.log(r,i);
});


const  xlsx = require('xlsx');
const workbook = xlsx.readFile('xlsx/data.xlsx');
const ws = workbook.Sheets.영화목록;                     // 데이터 액셀 시트 중 영화목록 가져오기
const recodes2 = xlsx.utils.sheet_to_json(ws);             // 시트를 제이슨 형식으로 변환
recodes2.forEach((r,i)=>{
    console.log(i,r.제목,r.링크);
})
//console.log(recodes2);



