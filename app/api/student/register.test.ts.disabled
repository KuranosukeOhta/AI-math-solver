/** @jest-environment node */

import { createRequest } from 'node-mocks-http';
// import { createRequest, createResponse } from 'node-mocks-http'; // createResponse は不要
import { POST } from './register';
import { supabase } from '@/utils/supabase';

jest.mock('@/utils/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(),
      insert: jest.fn(() => ({
        select: jest.fn(),
        single: jest.fn(),
      })),
    })),
  },
}));

describe('POST /api/student/register', () => {
  test('should return 400 if studentId or name is missing', async () => {
    const requestBody = { studentId: 'AA12345' };
    const request = createRequest({
      method: 'POST',
      json: true,
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });

    // リクエストモックに .json() メソッドを追加
    (request as any).json = async () => requestBody;

    // API ルート関数を実行
    const response = await POST(request as any); // NextRequest と MockRequest の型が完全に一致しない可能性があるため any を使用

    // 400 ステータスコードが返されることを期待
    expect(response.status).toBe(400); // response.statusCode ではなく response.status を使用
    // エラーメッセージが返されることを期待
    const body = await response.json(); // response.json() を呼び出してボディを取得
    expect(body).toEqual(expect.objectContaining({
      success: false,
      message: '学番と名前を入力してください', // エラーメッセージを実際の API の応答に合わせる
    }));
  });
}); 