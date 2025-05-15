-- usersテーブルのRLSポリシー
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
-- 認証済みユーザーは自分のデータを読み取れる
CREATE POLICY "ユーザーは自分のデータを読み取れる" ON public.users FOR
SELECT USING (auth.uid() = id);
-- 認証済みユーザーは自分のデータを更新できる
CREATE POLICY "ユーザーは自分のデータを更新できる" ON public.users FOR
UPDATE USING (auth.uid() = id);
-- subscriptionsテーブルのRLSポリシー
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
-- 認証済みユーザーは自分のサブスクリプションを読み取れる
CREATE POLICY "ユーザーは自分のサブスクリプションを読み取れる" ON public.subscriptions FOR
SELECT USING (auth.uid() = user_id);
-- 認証済みユーザーは自分のサブスクリプションを更新できる
CREATE POLICY "ユーザーは自分のサブスクリプションを更新できる" ON public.subscriptions FOR
UPDATE USING (auth.uid() = user_id);
-- 認証済みユーザーは自分のサブスクリプションを挿入できる
CREATE POLICY "ユーザーは自分のサブスクリプションを挿入できる" ON public.subscriptions FOR
INSERT WITH CHECK (auth.uid() = user_id);
-- paymentsテーブルのRLSポリシー
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
-- 認証済みユーザーは自分の支払い情報を読み取れる
CREATE POLICY "ユーザーは自分の支払い情報を読み取れる" ON public.payments FOR
SELECT USING (auth.uid() = user_id);
-- 認証済みユーザーは自分の支払い情報を挿入できる
CREATE POLICY "ユーザーは自分の支払い情報を挿入できる" ON public.payments FOR
INSERT WITH CHECK (auth.uid() = user_id);
-- サービスロールがすべてのテーブルにアクセスできるようにするポリシー
CREATE POLICY "サービスロールはすべてのユーザーデータにアクセスできる" ON public.users USING (auth.jwt()->>'role' = 'service_role');
CREATE POLICY "サービスロールはすべてのサブスクリプションにアクセスできる" ON public.subscriptions USING (auth.jwt()->>'role' = 'service_role');
CREATE POLICY "サービスロールはすべての支払い情報にアクセスできる" ON public.payments USING (auth.jwt()->>'role' = 'service_role');