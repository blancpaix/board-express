require('dotenv').config();
const express = require('express');
const app = express();

// const http = require('http');
// const https = require('https');

const sequelize = require('./model/index').sequelize;
const BoardRouter = require('./router/BoardRouter');
const UserRouter = require('./router/UserRouter');
const path = require('path');

const PORT = 3000;

sequelize.sync()
  .then(() => {
    console.log('db connetion success!');
  });

// 이거는 msa 할때 쓸듯??
// app.on('mount', (parent) => {
//   console.log('parent!! mounted', parent);
// });

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public'), { etag : true, maxAge : 900000 }));

app.use('/user', UserRouter);
app.use('/board', BoardRouter);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  
  res.status(404).send(err);
  console.log('이거는 뭐가 없어요...', req.url);
  next(err);
});

// http.createServer(app).listen(3000);
// https.createServer({ /* options */ }, app).listen(443)

app.listen(PORT, () => {
  console.log("App listening on 3000");
});