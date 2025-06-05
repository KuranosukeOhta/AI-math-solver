-- ===============================================
-- AI Math Solver Database Schema (snake_case統一版)
-- PostgreSQL / Supabase用
-- ===============================================
-- 既存テーブルを削除（注意：本番環境では慎重に実行）
DROP TABLE IF EXISTS public.shared_conversations CASCADE;
DROP TABLE IF EXISTS public.message_images CASCADE;
DROP TABLE IF EXISTS public.messages CASCADE;
DROP TABLE IF EXISTS public.conversations CASCADE;
DROP TABLE IF EXISTS public.token_usage_logs CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;
-- ===============================================
-- 1. USERS テーブル
-- ===============================================
CREATE TABLE public.users (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    student_id TEXT UNIQUE,
    token_usage INTEGER DEFAULT 0 NOT NULL,
    estimated_cost DOUBLE PRECISION DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    -- Google OAuth関連
    google_id TEXT UNIQUE,
    profile_image TEXT
);
-- ===============================================
-- 2. TOKEN_USAGE_LOGS テーブル
-- ===============================================
CREATE TABLE public.token_usage_logs (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    user_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    input_tokens INTEGER NOT NULL,
    output_tokens INTEGER NOT NULL,
    total_tokens INTEGER NOT NULL,
    model_name TEXT NOT NULL,
    cost DOUBLE PRECISION NOT NULL,
    conversation_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
-- ===============================================
-- 3. CONVERSATIONS テーブル
-- ===============================================
CREATE TABLE public.conversations (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    user_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT DEFAULT '新しい会話' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
-- ===============================================
-- 4. MESSAGES テーブル
-- ===============================================
CREATE TABLE public.messages (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    conversation_id TEXT NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
-- ===============================================
-- 5. MESSAGE_IMAGES テーブル
-- ===============================================
CREATE TABLE public.message_images (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    message_id TEXT NOT NULL REFERENCES public.messages(id) ON DELETE CASCADE,
    filename TEXT NOT NULL,
    original_name TEXT,
    mime_type TEXT NOT NULL,
    size INTEGER NOT NULL,
    base64_data TEXT NOT NULL,
    url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
-- ===============================================
-- 6. SHARED_CONVERSATIONS テーブル（シェア機能）
-- ===============================================
CREATE TABLE public.shared_conversations (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    conversation_id TEXT NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    share_id TEXT UNIQUE DEFAULT gen_random_uuid()::TEXT NOT NULL,
    title TEXT NOT NULL,
    is_public BOOLEAN DEFAULT true NOT NULL,
    expires_at TIMESTAMPTZ,
    view_count INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
-- ===============================================
-- インデックス作成
-- ===============================================
-- パフォーマンス向上のためのインデックス
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_student_id ON public.users(student_id);
CREATE INDEX idx_users_google_id ON public.users(google_id);
CREATE INDEX idx_token_usage_logs_user_id ON public.token_usage_logs(user_id);
CREATE INDEX idx_token_usage_logs_created_at ON public.token_usage_logs(created_at);
CREATE INDEX idx_conversations_user_id ON public.conversations(user_id);
CREATE INDEX idx_conversations_created_at ON public.conversations(created_at);
CREATE INDEX idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX idx_messages_created_at ON public.messages(created_at);
CREATE INDEX idx_message_images_message_id ON public.message_images(message_id);
CREATE INDEX idx_shared_conversations_share_id ON public.shared_conversations(share_id);
CREATE INDEX idx_shared_conversations_conversation_id ON public.shared_conversations(conversation_id);
CREATE INDEX idx_shared_conversations_expires_at ON public.shared_conversations(expires_at);
-- ===============================================
-- Row Level Security (RLS) ポリシー
-- ===============================================
-- RLS有効化
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.token_usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shared_conversations ENABLE ROW LEVEL SECURITY;
-- USERSテーブルのポリシー
CREATE POLICY "Users can view own profile" ON public.users FOR
SELECT USING (auth.uid()::TEXT = id);
CREATE POLICY "Users can update own profile" ON public.users FOR
UPDATE USING (auth.uid()::TEXT = id);
-- TOKEN_USAGE_LOGSテーブルのポリシー
CREATE POLICY "Users can view own token usage" ON public.token_usage_logs FOR
SELECT USING (auth.uid()::TEXT = user_id);
CREATE POLICY "System can insert token usage" ON public.token_usage_logs FOR
INSERT WITH CHECK (true);
-- CONVERSATIONSテーブルのポリシー
CREATE POLICY "Users can view own conversations" ON public.conversations FOR
SELECT USING (auth.uid()::TEXT = user_id);
CREATE POLICY "Users can create own conversations" ON public.conversations FOR
INSERT WITH CHECK (auth.uid()::TEXT = user_id);
CREATE POLICY "Users can update own conversations" ON public.conversations FOR
UPDATE USING (auth.uid()::TEXT = user_id);
CREATE POLICY "Users can delete own conversations" ON public.conversations FOR DELETE USING (auth.uid()::TEXT = user_id);
-- MESSAGESテーブルのポリシー
CREATE POLICY "Users can view messages in own conversations" ON public.messages FOR
SELECT USING (
        conversation_id IN (
            SELECT id
            FROM public.conversations
            WHERE user_id = auth.uid()::TEXT
        )
    );
CREATE POLICY "Users can create messages in own conversations" ON public.messages FOR
INSERT WITH CHECK (
        conversation_id IN (
            SELECT id
            FROM public.conversations
            WHERE user_id = auth.uid()::TEXT
        )
    );
-- MESSAGE_IMAGESテーブルのポリシー
CREATE POLICY "Users can view images in own messages" ON public.message_images FOR
SELECT USING (
        message_id IN (
            SELECT m.id
            FROM public.messages m
                JOIN public.conversations c ON m.conversation_id = c.id
            WHERE c.user_id = auth.uid()::TEXT
        )
    );
CREATE POLICY "Users can create images in own messages" ON public.message_images FOR
INSERT WITH CHECK (
        message_id IN (
            SELECT m.id
            FROM public.messages m
                JOIN public.conversations c ON m.conversation_id = c.id
            WHERE c.user_id = auth.uid()::TEXT
        )
    );
-- SHARED_CONVERSATIONSテーブルのポリシー
CREATE POLICY "Users can view own shared conversations" ON public.shared_conversations FOR
SELECT USING (
        conversation_id IN (
            SELECT id
            FROM public.conversations
            WHERE user_id = auth.uid()::TEXT
        )
    );
CREATE POLICY "Anyone can view public shared conversations" ON public.shared_conversations FOR
SELECT USING (
        is_public = true
        AND (
            expires_at IS NULL
            OR expires_at > NOW()
        )
    );
CREATE POLICY "Users can create shares for own conversations" ON public.shared_conversations FOR
INSERT WITH CHECK (
        conversation_id IN (
            SELECT id
            FROM public.conversations
            WHERE user_id = auth.uid()::TEXT
        )
    );
CREATE POLICY "Users can update own shared conversations" ON public.shared_conversations FOR
UPDATE USING (
        conversation_id IN (
            SELECT id
            FROM public.conversations
            WHERE user_id = auth.uid()::TEXT
        )
    );
CREATE POLICY "Users can delete own shared conversations" ON public.shared_conversations FOR DELETE USING (
    conversation_id IN (
        SELECT id
        FROM public.conversations
        WHERE user_id = auth.uid()::TEXT
    )
);
-- ===============================================
-- トリガー関数とトリガー
-- ===============================================
-- updated_at自動更新関数
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- updated_atトリガー
CREATE TRIGGER update_users_updated_at BEFORE
UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_conversations_updated_at BEFORE
UPDATE ON public.conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_shared_conversations_updated_at BEFORE
UPDATE ON public.shared_conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- ===============================================
-- 初期データの挿入例
-- ===============================================
-- サンプルユーザー（開発環境用）
-- INSERT INTO public.users (id, email, password, name, student_id) VALUES
-- ('sample-user-1', 'test@example.com', 'hashed_password_here', 'テストユーザー', 'ab12345');
-- ===============================================
-- 完了メッセージ
-- ===============================================
DO $$ BEGIN RAISE NOTICE 'Database schema created successfully with snake_case naming convention!';
RAISE NOTICE 'Tables created: users, token_usage_logs, conversations, messages, message_images, shared_conversations';
RAISE NOTICE 'RLS policies and triggers are enabled.';
END $$;