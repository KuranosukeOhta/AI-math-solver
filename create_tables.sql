-- Userテーブルの作成
CREATE TABLE IF NOT EXISTS "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "student_id" TEXT UNIQUE,
    "token_usage" INTEGER NOT NULL DEFAULT 0,
    "estimated_cost" FLOAT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- TokenUsageLogテーブルの作成
CREATE TABLE IF NOT EXISTS "token_usage_logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "input_tokens" INTEGER NOT NULL,
    "output_tokens" INTEGER NOT NULL,
    "total_tokens" INTEGER NOT NULL,
    "model_name" TEXT NOT NULL,
    "cost" FLOAT NOT NULL,
    "conversation_id" TEXT,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
);
-- トークン使用量とコストを更新するための関数
CREATE OR REPLACE FUNCTION increment_token_usage_and_cost(
        user_id_input TEXT,
        token_amount INTEGER,
        cost_amount FLOAT
    ) RETURNS VOID AS $$ BEGIN
UPDATE users
SET token_usage = token_usage + token_amount,
    estimated_cost = estimated_cost + cost_amount,
    updated_at = CURRENT_TIMESTAMP
WHERE id = user_id_input;
END;
$$ LANGUAGE plpgsql;