const axios = require('axios');

const dotenv = require('dotenv');
dotenv.config();
const env = process.env;

/**
 * 주식발행정보 외부 api 
 */
// const stockapi_publication_api = async () => {
//     const key = env.STOCK_API_KEY;
//     const url = 'http://apis.data.go.kr/1160100/service/GetStocIssuInfoService/getItemBasiInfo';
//     var queryParams = '?' + encodeURIComponent('serviceKey') + `=${key}`; /* Service Key*/
//     queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
//     queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */
//     queryParams += '&' + encodeURIComponent('resultType') + '=' + encodeURIComponent('json'); /* */
//     // queryParams += '&' + encodeURIComponent('basDt') + '=' + encodeURIComponent('20200423'); /* */
//     // queryParams += '&' + encodeURIComponent('crno') + '=' + encodeURIComponent('1101114728246'); /* */
//     //queryParams += '&' + encodeURIComponent('stckIssuCmpyNm') + '=' + encodeURIComponent('복지유니온'); /* */
//     const response = await axios.get(url + queryParams);
//     console.log(JSON.stringify(response.data.response.body.items.item));
// }
// stockapi_publication_api();

/**
 * 도서 정보 외부 api
 */
// const book_api = async () => {
//     const key = env.BOOK_API_KEY;
//     const url = `https://www.nl.go.kr/seoji/SearchApi.do?cert_key=${key}&result_style=json&page_no=1&page_size=10&input_date=20230101`;

//     const response = await axios.get(url);
//     const result = response.data.docs;
//     //console.log(result);
//     const result2 = result.map((el)=> el.TITLE);
//     console.log(result2);
// }
// book_api();

// const cook_api = async () => {
//     const key = "bfeb699b6f1844bb9c21";
//     const url = `http://openapi.foodsafetykorea.go.kr/api/${key}/I0030/json/1/5`;

//     const response = await axios.get(url);
//     const result = response.data;
//     console.log(result);
//     // const result2 = result.map((el)=> el.TITLE);
//     // console.log(result2);
// }
// ///&PRDLST_NM=6년근 고려홍삼정 PREMIUM
// cook_api();

const DATA_SOURCES = {
    development: {
        host: "127.0.0.1",
        user: "root",
        password: "cn37rqww@",
        port: 3306,
        database: "nodejs",
    }
};

const mysql = require('mysql2/promise')


var url = 'http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList';
var queryParams =
    '?' + encodeURIComponent('serviceKey') + env.MEDICINEKEY; /* Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent(1); /* */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); /* */
queryParams += '&' + encodeURIComponent('itemName') + '=' + encodeURIComponent(''); /* */
queryParams += '&' + encodeURIComponent('efcyQesitm') + '=' + encodeURIComponent(''); /* */
//queryParams += '&' + encodeURIComponent('useMethodQesitm') + '=' + encodeURIComponent(''); /* */
queryParams += '&' + encodeURIComponent('atpnWarnQesitm') + '=' + encodeURIComponent(''); /* */
queryParams += '&' + encodeURIComponent('atpnQesitm') + '=' + encodeURIComponent(''); /* */
queryParams += '&' + encodeURIComponent('seQesitm') + '=' + encodeURIComponent(''); /* */
queryParams += '&' + encodeURIComponent('type') + '=' + encodeURIComponent('json'); /* */


var request = require('request');

request({
    url: url + queryParams,
    method: 'GET'
}, async function (error, response, body) {

    const data = JSON.parse(body);

    console.log(data.body.items.length);

    for (let i = 0; i < 10; i++) {

        const connection = await mysql.createConnection(DATA_SOURCES.development);
        await connection.connect();

        //     const parts = data.body.items[i].efcyQesitm.split(',').slice(0, 3);

        const parts = data.body.items[i].efcyQesitm.replace(/^이 약은 |에 사용합니다\.$/g, '').replace(/합니다\.$/, '').split(',').slice(0, 3);
        const nameParts = data.body.items[i].itemName.split('(')[0].trim();
        const warnParts = data.body.items[i].useMethodQesitm.split('.')[0].trim() + '.';


        const userSelect = `insert into medicine(name, effect, nini) values 
            ('${nameParts}', '${parts.join(', ')}', '${warnParts}') ;`;
        await connection.query(userSelect);
        await connection.end();

    }
});







