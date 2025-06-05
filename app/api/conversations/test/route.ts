import { NextRequest, NextResponse } from 'next/server'

// テスト用の会話データ
let testConversations: any[] = []

export async function GET(request: NextRequest) {
  return NextResponse.json(testConversations)
}

export async function POST(request: NextRequest) {
  try {
    const { userId, title = "新しい会話" } = await request.json()
    
    const newConversation = {
      id: `conv_${Date.now()}`,
      user_id: userId,
      title,
      created_at: new Date(),
      updated_at: new Date(),
      messages: []
    }
    
    testConversations.push(newConversation)
    
    return NextResponse.json(newConversation)
  } catch (error) {
    console.error('Test conversation creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create test conversation' },
      { status: 500 }
    )
  }
} 