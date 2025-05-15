# Conversation Web App Template
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Config App
Create a file named `.env.local` in the current directory and copy the contents from `.env.example`. Setting the following content:
```
# APP ID: This is the unique identifier for your app. You can find it in the app's detail page URL. 
# For example, in the URL `https://cloud.dify.ai/app/xxx/workflow`, the value `xxx` is your APP ID.
NEXT_PUBLIC_APP_ID=

# APP API Key: This is the key used to authenticate your app's API requests. 
# You can generate it on the app's "API Access" page by clicking the "API Key" button in the top-right corner.
NEXT_PUBLIC_APP_KEY=

# APP URL: This is the API's base URL. If you're using the Dify cloud service, set it to: https://api.dify.ai/v1.
NEXT_PUBLIC_API_URL=
```

Config more in `config/index.ts` file:   
```js
export const APP_INFO: AppInfo = {
  title: 'Chat APP',
  description: '',
  copyright: '',
  privacy_policy: '',
  default_language: 'zh-Hans'
}

export const isShowPrompt = true
export const promptTemplate = ''
```

## Getting Started
First, install dependencies:
```bash
npm install
# or
yarn
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Using Docker

```
docker build . -t <DOCKER_HUB_REPO>/webapp-conversation:latest
# now you can access it in port 3000
docker run -p 3000:3000 <DOCKER_HUB_REPO>/webapp-conversation:latest
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

> ⚠️ If you are using [Vercel Hobby](https://vercel.com/pricing), your message will be truncated due to the limitation of vercel.


The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Supabase設定

以下のテーブルをSupabaseで作成する必要があります：

### usersテーブル
```sql
create table public.users (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  password text not null,
  name text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- RLSポリシーを設定
alter table public.users enable row level security;
```

### subscriptionsテーブル
```sql
create table public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  subscription_end timestamp with time zone not null,
  payment_id uuid references public.payments(id),
  is_trial boolean default false,
  created_at timestamp with time zone default now() not null
);

-- RLSポリシーを設定
alter table public.subscriptions enable row level security;
```

### paymentsテーブル
```sql
create table public.payments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  amount integer not null,
  stripe_id text,
  status text not null, -- 'completed', 'trial', 'failed', 'pending'のいずれか
  hours_added numeric not null, -- 小数点以下も許可（トライアル用）
  created_at timestamp with time zone default now() not null
);

-- RLSポリシーを設定
alter table public.payments enable row level security;
```

## 環境変数設定

以下の環境変数をVercelダッシュボードで設定する必要があります：

```
# Dify API設定
NEXT_PUBLIC_APP_ID=your_dify_app_id
NEXT_PUBLIC_APP_KEY=your_dify_api_key
NEXT_PUBLIC_API_URL=your_dify_api_url

# Stripe API設定
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# NextAuth設定
NEXTAUTH_SECRET=bKkXKFqmg0ooaQ5FCJIPWXiYwJxEDQFQ07wP0txd7eY=
NEXTAUTH_URL=https://your-domain.vercel.app

# Supabase設定
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 料金設定（円）
NEXT_PUBLIC_PRICE_PER_HOUR=300
```

## トライアル機能

このアプリケーションには以下の機能が含まれています：

1. **無料トライアル**: 新規ユーザーは初回ログイン時に5分間の無料トライアル期間が自動的に付与されます
2. **時間制課金**: トライアル後は1時間あたり300円の料金で利用可能です
3. **残り時間表示**: 現在のサブスクリプションの残り時間がリアルタイムで表示されます

## Stripe Webhook設定

1. Stripeダッシュボードで新しいWebhookエンドポイントを作成します
2. エンドポイントURLを `https://your-domain.vercel.app/api/stripe/webhook` に設定します
3. 以下のイベントを購読します：
   - `checkout.session.completed`
4. Signing Secretをコピーして、環境変数 `STRIPE_WEBHOOK_SECRET` に設定します
