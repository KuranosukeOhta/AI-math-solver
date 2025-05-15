-- テーブルのデータをリセットする
TRUNCATE TABLE public.users CASCADE;
TRUNCATE TABLE public.subscriptions CASCADE;
TRUNCATE TABLE public.payments CASCADE;
-- RLSを一時的に無効化して、テスト中のアクセス問題を解決する
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments DISABLE ROW LEVEL SECURITY;
-- 既存のRLSポリシーをクリーンアップ
DROP POLICY IF EXISTS "ユーザーは自分のデータを読み取れる" ON public.users;
DROP POLICY IF EXISTS "ユーザーは自分のデータを更新できる" ON public.users;
DROP POLICY IF EXISTS "ユーザーを挿入できる" ON public.users;
DROP POLICY IF EXISTS "サービスロールはすべてのユーザーデータにアクセスできる" ON public.users;
DROP POLICY IF EXISTS "ユーザーは自分のサブスクリプションを読み取れる" ON public.subscriptions;
DROP POLICY IF EXISTS "ユーザーは自分のサブスクリプションを更新できる" ON public.subscriptions;
DROP POLICY IF EXISTS "ユーザーは自分のサブスクリプションを挿入できる" ON public.subscriptions;
DROP POLICY IF EXISTS "サービスロールはすべてのサブスクリプションにアクセスできる" ON public.subscriptions;
DROP POLICY IF EXISTS "ユーザーは自分の支払い情報を読み取れる" ON public.payments;
DROP POLICY IF EXISTS "ユーザーは自分の支払い情報を挿入できる" ON public.payments;
DROP POLICY IF EXISTS "サービスロールはすべての支払い情報にアクセスできる" ON public.payments;
-- 安全のため: ユーザーテーブルに適切なインデックスが設定されていることを確認
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
-- 開発の進行のため、権限を出力
SELECT table_schema,
    table_name,
    grantee,
    privilege_type
FROM information_schema.table_privileges
WHERE table_schema = 'public'
ORDER BY table_schema,
    table_name,
    grantee,
    privilege_type;