const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');
const email = require('./routes/email-notify');
const scheduler = require('./schedule');

app.set('port', process.env.DEV_PORT || 3000);
app.use(express.json());
app.use(morgan('combined'));

app.use(express.urlencoded({extended:false}));
app.use('/email',email);


app.use((req, res, next) => {
    const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.listen(process.env.DEV_PORT , () => {  
    console.log(app.get('port'), '번 포트에서 대기중');
    scheduler();
});