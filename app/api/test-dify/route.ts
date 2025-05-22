import { NextResponse } from 'next/server';
import { API_KEY, API_URL, APP_ID } from '@/config';
import { v4 as uuidv4 } from 'uuid';

/**
 * Dify APIへの接続をテストするためのシンプルなエンドポイント
 */
export async function GET() {
  try {
    // 環境変数の確認
    const configInfo = {
      APP_ID: APP_ID || '未設定',
      API_KEY: API_KEY ? '設定済み' : '未設定',
      API_URL: API_URL || '未設定',
      timestamp: new Date().toISOString()
    };
    
    console.log('Dify API設定情報:', configInfo);
    
    // Dify APIへの接続テスト
    if (!API_KEY || !API_URL) {
      return NextResponse.json({
        success: false,
        message: 'API_KEYまたはAPI_URLが設定されていません',
        config: configInfo
      }, { status: 400 });
    }
    
    // 直接Dify APIへリクエスト
    const testResponse = await fetch(`${API_URL}/parameters`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'App-Id': APP_ID
      }
    });
    
    // レスポンスをログに記録
    console.log('Dify API Test Response Status:', testResponse.status);
    
    if (!testResponse.ok) {
      const errorText = await testResponse.text();
      console.error('Dify API Test Error:', errorText);
      
      return NextResponse.json({
        success: false,
        message: `Dify APIからエラーレスポンスを受信: ${testResponse.status}`,
        error: errorText,
        config: configInfo
      }, { status: 500 });
    }
    
    const responseData = await testResponse.json();
    
    return NextResponse.json({
      success: true,
      message: 'Dify APIへの接続テスト成功',
      data: responseData,
      config: configInfo
    });
  } catch (error) {
    console.error('Dify API接続テストエラー:', error);
    
    return NextResponse.json({
      success: false,
      message: '接続テスト中にエラーが発生しました',
      error: String(error),
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 