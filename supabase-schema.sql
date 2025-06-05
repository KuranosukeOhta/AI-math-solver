-- AI Math Solver アプリケーション用のSupabaseスキーマ
-- PrismaスキーマからSupabaseに適用するためのSQL
-- 必要に応じて既存のテーブルを削除（注意：データが失われます）
-- DROP TABLE IF EXISTS public."MessageImage" CASCADE;
-- DROP TABLE IF EXISTS public."Message" CASCADE;
-- DROP TABLE IF EXISTS public."Conversation" CASCADE;
-- DROP TABLE IF EXISTS public."SharedConversation" CASCADE;
-- DROP TABLE IF EXISTS public."TokenUsageLog" CASCADE;
-- DROP TABLE IF EXISTS public."User" CASCADE;
-- ユーザーテーブル
CREATE TABLE IF NOT EXISTS public."User" (
    id TEXT PRIMARY KEY DEFAULT concat('user_', gen_random_uuid()::text),
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    "studentId" TEXT UNIQUE,
    "tokenUsage" INTEGER DEFAULT 0,
    "estimatedCost" DOUBLE PRECISION DEFAULT 0,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW(),
    -- Google OAuth関連
    "googleId" TEXT UNIQUE,
    "profileImage" TEXT
);
-- 会話テーブル
CREATE TABLE IF NOT EXISTS public."Conversation" (
    id TEXT PRIMARY KEY DEFAULT concat('conv_', gen_random_uuid()::text),
    "userId" TEXT NOT NULL REFERENCES public."User"(id) ON DELETE CASCADE,
    title TEXT DEFAULT '新しい会話',
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);
-- メッセージテーブル
CREATE TABLE IF NOT EXISTS public."Message" (
    id TEXT PRIMARY KEY DEFAULT concat('msg_', gen_random_uuid()::text),
    "conversationId" TEXT NOT NULL REFERENCES public."Conversation"(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT NOW()
);
-- メッセージ画像テーブル
CREATE TABLE IF NOT EXISTS public."MessageImage" (
    id TEXT PRIMARY KEY DEFAULT concat('img_', gen_random_uuid()::text),
    "messageId" TEXT NOT NULL REFERENCES public."Message"(id) ON DELETE CASCADE,
    filename TEXT NOT NULL,
    "originalName" TEXT,
    "mimeType" TEXT NOT NULL,
    size INTEGER NOT NULL,
    "base64Data" TEXT NOT NULL,
    url TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW()
);
-- トークン使用量ログテーブル
CREATE TABLE IF NOT EXISTS public."TokenUsageLog" (
    id TEXT PRIMARY KEY DEFAULT concat('token_', gen_random_uuid()::text),
    "userId" TEXT NOT NULL REFERENCES public."User"(id) ON DELETE CASCADE,
    "inputTokens" INTEGER NOT NULL,
    "outputTokens" INTEGER NOT NULL,
    "totalTokens" INTEGER NOT NULL,
    "modelName" TEXT NOT NULL,
    cost DOUBLE PRECISION NOT NULL,
    "conversationId" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW()
);
-- 🆕 シェアされた会話テーブル（新機能）
CREATE TABLE IF NOT EXISTS public."SharedConversation" (
    id TEXT PRIMARY KEY DEFAULT concat('share_', gen_random_uuid()::text),
    "conversationId" TEXT NOT NULL REFERENCES public."Conversation"(id) ON DELETE CASCADE,
    "shareId" TEXT UNIQUE NOT NULL DEFAULT concat('s_', substring(gen_random_uuid()::text, 1, 8)),
    title TEXT NOT NULL,
    "isPublic" BOOLEAN DEFAULT true,
    "expiresAt" TIMESTAMPTZ,
    "viewCount" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);
-- インデックスの作成
CREATE INDEX IF NOT EXISTS "idx_conversation_userId" ON public."Conversation"("userId");
CREATE INDEX IF NOT EXISTS "idx_message_conversationId" ON public."Message"("conversationId");
CREATE INDEX IF NOT EXISTS "idx_messageImage_messageId" ON public."MessageImage"("messageId");
CREATE INDEX IF NOT EXISTS "idx_tokenUsageLog_userId" ON public."TokenUsageLog"("userId");
CREATE INDEX IF NOT EXISTS "idx_sharedConversation_shareId" ON public."SharedConversation"("shareId");
CREATE INDEX IF NOT EXISTS "idx_sharedConversation_conversationId" ON public."SharedConversation"("conversationId");
-- RLS (Row Level Security) の設定
ALTER TABLE public."User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Conversation" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Message" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."MessageImage" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."TokenUsageLog" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."SharedConversation" ENABLE ROW LEVEL SECURITY;
-- RLS ポリシー（ユーザーは自分のデータのみアクセス可能）
CREATE POLICY "Users can view own data" ON public."User" FOR ALL USING (auth.uid()::text = id);
CREATE POLICY "Users can view own conversations" ON public."Conversation" FOR ALL USING (auth.uid()::text = "userId");
CREATE POLICY "Users can view own messages" ON public."Message" FOR ALL USING (
    EXISTS (
        SELECT 1
        FROM public."Conversation"
        WHERE id = "conversationId"
            AND "userId" = auth.uid()::text
    )
);
CREATE POLICY "Users can view own message images" ON public."MessageImage" FOR ALL USING (
    EXISTS (
        SELECT 1
        FROM public."Message" m
            JOIN public."Conversation" c ON m."conversationId" = c.id
        WHERE m.id = "messageId"
            AND c."userId" = auth.uid()::text
    )
);
CREATE POLICY "Users can view own token usage" ON public."TokenUsageLog" FOR ALL USING (auth.uid()::text = "userId");
-- シェアされた会話は公開可能
CREATE POLICY "Shared conversations are publicly viewable" ON public."SharedConversation" FOR
SELECT USING (
        "isPublic" = true
        AND (
            "expiresAt" IS NULL
            OR "expiresAt" > NOW()
        )
    );
CREATE POLICY "Users can manage own shared conversations" ON public."SharedConversation" FOR ALL USING (
    EXISTS (
        SELECT 1
        FROM public."Conversation"
        WHERE id = "conversationId"
            AND "userId" = auth.uid()::text
    )
);
-- 更新日時の自動更新関数
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW."updatedAt" = NOW();
RETURN NEW;
END;
$$ language 'plpgsql';
-- トリガーの設定
CREATE TRIGGER update_user_updated_at BEFORE
UPDATE ON public."User" FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_conversation_updated_at BEFORE
UPDATE ON public."Conversation" FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_shared_conversation_updated_at BEFORE
UPDATE ON public."SharedConversation" FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
-- サンプルデータの挿入（オプション）
-- INSERT INTO public."User" (id, email, password, name) VALUES 
-- ('test_user', 'test@example.com', 'hashed_password', 'テストユーザー');
COMMENT ON TABLE public."User" IS 'ユーザー情報を管理するテーブル';
COMMENT ON TABLE public."Conversation" IS 'チャット会話を管理するテーブル';
COMMENT ON TABLE public."Message" IS 'チャットメッセージを管理するテーブル';
COMMENT ON TABLE public."MessageImage" IS 'メッセージに添付された画像を管理するテーブル';
COMMENT ON TABLE public."TokenUsageLog" IS 'AIモデルのトークン使用量を記録するテーブル';
COMMENT ON TABLE public."SharedConversation" IS 'シェアされた会話を管理するテーブル（新機能）';