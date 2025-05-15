const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

// 静的ファイルを提供するディレクトリを設定
app.use('/_next', express.static(path.join(__dirname, '.next')));

// サーバーを起動
app.listen(port, () => {
    console.log(`静的ファイルサーバーが http://localhost:${port} で起動しました`);
}); 