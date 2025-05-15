const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

// CORSを許可
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  // プリフライトリクエストの処理
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

// リクエストのログ出力
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// 静的ファイルを提供するディレクトリを設定
app.use('/_next', express.static(path.join(__dirname, '.next')));
app.use('/static', express.static(path.join(__dirname, 'public')));

// APIリクエストを処理するためのプロキシ設定
// 本番環境ではこの部分は必要ありませんが、開発環境ではAPIリクエストをNext.jsサーバーに転送する必要があります

// サーバーを起動
app.listen(port, () => {
  console.log(`静的ファイルサーバーが http://localhost:${port} で起動しました`);
  console.log(`環境変数: ${process.env.NODE_ENV || 'development'}`);
}); 