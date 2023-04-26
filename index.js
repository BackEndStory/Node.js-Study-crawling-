const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');
const email = require('./routes/email-notify');
const scheduler = require('./schedule');
const webSocket = require('./socket');
const jwt = require('jsonwebtoken');


app.set('port', process.env.DEV_PORT || 3000);
app.use(express.json());
app.use(morgan('combined'));

app.use(express.urlencoded({extended:false}));
app.use('/email',email);

const sign1 =  () => { 
    const payload = { 
      title: "to 호연",
      message: "ㅋㅋㅋㅋㅋ 임파서블 블록버스터!!! 제한시간 내에 메시지를 보아라! 빠밤!@ㅣㅓㅣ근데 오늘도 뭔가 일찍 자긴 글렀네..ㅋㅋㅋ ",
    };

    return jwt.sign(payload, "secret", { 
      algorithm: 'HS256', 
      expiresIn: '1m', 	  
    });
  }
const a = sign1();
console.log(a);
app.use((req, res, next) => {
    const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

const server = app.listen(process.env.DEV_PORT , () => {  
    console.log(app.get('port'), '번 포트에서 대기중');
    scheduler();
});

webSocket(server);