require('dotenv').config();
const express = require('express');
const app = express();

// const http = require('http');
// const https = require('https');

const sequelize = require('./model/index').sequelize;
const BoardRouter = require('./router/BoardRouter');
const UserRouter = require('./router/UserRouter');
const path = require('path');

const { errorHandler } = require('./ResponseHandler');

const PORT = 3000;

sequelize.sync()
  .then(() => {
    console.log('db connetion success!');
  });

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public'), { etag : true, maxAge : 900000 }));

app.use('/user', UserRouter);
app.use('/board', BoardRouter);

app.use((err, req, res, next) => {
  if (err) {
    console.error('ERROR OCCURED! code : ', err);
    const errMsg = errorHandler(err.message);
    res.status(parseInt(errMsg.code.slice(0, 3))).json(errMsg);
    
    return;
  }
  
  res.status(404).json({ url : req.url, message : "요청을 수행할 수 없습니다."});
  next();
});

app.use((req, res, next) => {
  res.status(404).send("Not Found");
  next();
})

// http.createServer(app).listen(3000);
// https.createServer({ /* options */ }, app).listen(443)

app.listen(PORT, () => {
  console.log("App listening on 3000");
});



// msa 도입하면 사용할듯?
// app.on('mount', (parent) => {
//   console.log('parent node mounted', parent);
// });