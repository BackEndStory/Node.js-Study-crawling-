const axios = require('axios');

const dotenv = require('dotenv');
dotenv.config();
const env = process.env;

/**
 * 주식발행정보 외부 api 
 */
const stockapi_publication_api = async () => {
    const key = env.STOCK_API_KEY;
    const url = 'http://apis.data.go.kr/1160100/service/GetStocIssuInfoService/getItemBasiInfo';
    var queryParams = '?' + encodeURIComponent('serviceKey') + `=${key}`; /* Service Key*/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */
    queryParams += '&' + encodeURIComponent('resultType') + '=' + encodeURIComponent('json'); /* */
    // queryParams += '&' + encodeURIComponent('basDt') + '=' + encodeURIComponent('20200423'); /* */
    // queryParams += '&' + encodeURIComponent('crno') + '=' + encodeURIComponent('1101114728246'); /* */
    //queryParams += '&' + encodeURIComponent('stckIssuCmpyNm') + '=' + encodeURIComponent('복지유니온'); /* */
    const response = await axios.get(url + queryParams);
    console.log(JSON.stringify(response.data.response.body.items.item));
}
stockapi_publication_api();

/**
 * 도서 정보 외부 api
 */
const book_api = async () => {
    const key = env.BOOK_API_KEY;
    const url = `https://www.nl.go.kr/seoji/SearchApi.do?cert_key=${key}&result_style=json&page_no=1&page_size=10&input_date=20230101`;
   
    const response = await axios.get(url);
    const result = response.data.docs;
    //console.log(result);
    const result2 = result.map((el)=> el.TITLE);
    console.log(result2);
}
book_api();


