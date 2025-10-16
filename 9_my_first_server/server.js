const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, Express World!');
});

app.listen(port, () => {
  console.log(`서버가 ${port}번 포트에서 실행 중입니다.`);
});
