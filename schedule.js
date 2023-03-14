const schedule = require('node-schedule');
const xlsx = require('xlsx');
const workbook = xlsx.readFile('./crawling-lecture/xlsx/data.xlsx');
const ws = workbook.Sheets.영화목록;                     
const recodes2 = xlsx.utils.sheet_to_json(ws);


/**
 *  초 분 시간 날짜 달 요일  
 * (해당 컴퓨터 시간 기준임)
 */
module.exports =  () => {
 
    schedule.scheduleJob('00 10 22 * * *', function () {        
        recodes2.forEach((r) => {
            console.log( r.제목, r.링크);
        })
      console.log('스케쥴러 완료');
    })
}



