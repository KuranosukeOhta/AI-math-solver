/** @jest-environment node */

import { createRequest } from 'node-mocks-http';
// import { createRequest, createResponse } from 'node-mocks-http'; // createResponse は不要
import { GET } from './check';
import { getUserById } from '@/utils/supabase'; // Supabase の関数をインポート

// Supabase のモック
jest.mock('@/utils/supabase', () => ({
  // getUserById 関数をモック化
  getUserById: jest.fn(),
}));

describe('GET /api/student/check', () => {
  test('should return 401 if userId cookie is missing', async () => { // 404 ではなく 401 が返るように修正
    const request = createRequest({
      method: 'GET',
      headers: {

      },
    });
    // const response = createResponse(); // createResponse は不要

    // モックリクエストに .cookies.get() メソッドを追加
    (request as any).cookies = {
      get: jest.fn((name: string) => {
        if (name === 'userId') {
          return undefined; // userId クッキーがない場合をシミュレート
        }
        return undefined; // その他のクッキーは undefined
      }),
    };

    // API ルート関数を実行
    const response = await GET(request as any); // NextRequest と MockRequest の型が完全に一致しない可能性があるため any を使用

    // 401 ステータスコードが返されることを期待
    expect(response.status).toBe(401); // response.statusCode ではなく response.status を使用
    // エラーメッセージが返されることを期待
    const body = await response.json(); // response.json() を呼び出してボディを取得
    expect(body).toEqual(expect.objectContaining({
      success: false,
      message: 'ユーザー情報が見つかりません', // エラーメッセージを実際の API の応答に合わせる
    }));
  });

  // TODO: userId cookie がある場合のテストを追加
}); 