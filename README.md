# AI Math Solver - ChatGPTライクな数学解決チャットアプリ

OpenRouterを使用したNext.js製のAI数学解決チャットアプリケーションです。Google認証、会話保存、LaTeX数式表示、思考プロセスのストリーミング表示などの機能を提供します。

## 主な機能

- 🔐 **Google認証** - NextAuth.jsを使用したセキュアな認証
- 🤖 **OpenRouter API** - o1-preview/gpt-4oモデルによる高品質な数学解答
- 💭 **思考プロセス表示** - AIの思考過程をリアルタイムでストリーミング
- 📷 **画像アップロード** - 数学の問題画像を直接アップロード
- 💬 **会話保存** - 全ての会話とメッセージを永続化
- 📐 **LaTeX数式表示** - KaTeXによる美しい数式レンダリング
- 🎨 **ChatGPTライクUI** - モダンで使いやすいインターフェース
- 📱 **レスポンシブ対応** - デスクトップ・モバイル両対応

## 必要な環境変数

以下の環境変数を `.env.local` ファイルに設定してください：

```bash
# データベース (PostgreSQL)
DATABASE_URL="postgresql://username:password@localhost:5432/ai_math_solver"

# OpenRouter API
OPENROUTER_API_KEY="your-openrouter-api-key"

# Google OAuth (NextAuth.js)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# サイト設定
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Supabase (オプション - 既存ユーザー管理継続用)
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

## セットアップ手順

### 1. リポジトリのクローン
```bash
git clone <repository-url>
cd AI-math-solver
```

### 2. 依存関係のインストール
```bash
npm install
```

### 3. データベースのセットアップ
```bash
# Prismaクライアントの生成
npx prisma generate

# データベースマイグレーション
npx prisma migrate dev --name init
```

### 4. Google OAuth設定

1. [Google Cloud Console](https://console.cloud.google.com/) でプロジェクトを作成
2. OAuth 2.0 認証情報を作成
3. リダイレクトURIに `http://localhost:3000/api/auth/callback/google` を追加
4. クライアントIDとシークレットを環境変数に設定

### 5. OpenRouter設定

1. [OpenRouter](https://openrouter.ai/) でアカウントを作成
2. APIキーを取得
3. 環境変数に設定

### 6. 開発サーバー起動
```bash
npm run dev
```

## アーキテクチャ

### API エンドポイント

- `/api/chat-openrouter` - OpenRouterチャット（ストリーミング対応）
- `/api/images/upload` - 画像アップロード（base64変換）
- `/api/conversations` - 会話の作成・取得
- `/api/conversations/[id]` - 個別会話操作
- `/api/messages` - メッセージ保存
- `/api/auth/[...nextauth]` - NextAuth.js認証

### データベーススキーマ

```sql
-- ユーザー
model User {
  id            String     @id @default(cuid())
  email         String     @unique
  name          String?
  googleId      String?    @unique
  profileImage  String?
  conversations Conversation[]
}

-- 会話
model Conversation {
  id          String   @id @default(cuid())
  userId      String
  title       String   @default("新しい会話")
  messages    Message[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

-- メッセージ
model Message {
  id             String   @id @default(cuid())
  conversationId String
  role           String   // 'user', 'assistant', 'system'
  content        String
  images         MessageImage[]
  createdAt      DateTime @default(now())
}

-- 画像
model MessageImage {
  id            String   @id @default(cuid())
  messageId     String
  filename      String
  base64Data    String   @db.Text
  createdAt     DateTime @default(now())
}
```

### 使用技術

#### フロントエンド
- **Next.js 14** - App Router使用
- **React** - UIライブラリ
- **TypeScript** - 型安全な開発
- **Tailwind CSS** - スタイリング
- **Framer Motion** - アニメーション
- **KaTeX** - 数式表示

#### バックエンド
- **Next.js API Routes** - APIエンドポイント
- **Prisma** - データベースORM
- **PostgreSQL** - データベース
- **NextAuth.js** - 認証

#### 外部サービス
- **OpenRouter** - AIモデルAPI
- **Google OAuth** - 認証プロバイダー

## 主要機能の詳細

### 1. 思考プロセス表示
OpenRouterのo1-previewモデルの思考プロセスをリアルタイムでストリーミング表示

### 2. 画像処理
- ドラッグ&ドロップアップロード
- base64エンコード
- 数学問題の画像解析

### 3. 会話管理
- 自動タイトル生成
- 会話履歴の永続化
- 会話の削除・編集

### 4. 数式表示
- LaTeX記法対応
- インライン・ブロック数式
- 美しいレンダリング

## デプロイ

### Vercel
```bash
npm run build
vercel deploy
```

環境変数をVercelの設定画面で追加してください。

### Docker
```bash
docker build -t ai-math-solver .
docker run -p 3000:3000 ai-math-solver
```

## 開発

### ディレクトリ構造
```
├── app/
│   ├── api/                    # APIエンドポイント
│   ├── auth/                   # 認証関連ページ
│   ├── chat/                   # チャットページ
│   ├── components/             # UIコンポーネント
│   └── generated/              # Prismaクライアント
├── lib/                        # ユーティリティ
├── prisma/                     # データベーススキーマ
└── utils/                      # ヘルパー関数
```

### 開発コマンド
```bash
# 開発サーバー
npm run dev

# ビルド
npm run build

# データベースマイグレーション
npx prisma migrate dev

# Prismaクライアント生成
npx prisma generate

# データベース閲覧
npx prisma studio
```

## ライセンス

MIT License

## サポート

問題や質問がある場合は、GitHubのIssuesまでお願いします。
