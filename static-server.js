const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

// CORSを許可
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// 静的ファイルを提供するディレクトリを設定
app.use('/_next', express.static(path.join(__dirname, '.next')));

// サーバーを起動
app.listen(port, () => {
    console.log(`静的ファイルサーバーが http://localhost:${port} で起動しました`);
}); 