import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'ファイルが選択されていません' }, 
        { status: 400 }
      )
    }

    // サポートされる画像形式の確認
    const supportedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!supportedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'サポートされていない画像形式です' }, 
        { status: 400 }
      )
    }

    // ファイルサイズの確認（10MB制限）
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: '画像ファイルは10MB以下である必要があります' }, 
        { status: 400 }
      )
    }

    // ファイルをバッファに変換
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // base64エンコード
    const base64 = buffer.toString('base64')
    const dataUrl = `data:${file.type};base64,${base64}`

    // レスポンス形式
    const response = {
      id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      size: file.size,
      type: file.type,
      url: dataUrl,
      base64: base64,
      created_at: new Date().toISOString()
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('画像アップロード処理中にエラーが発生:', error)
    return NextResponse.json(
      { error: '画像のアップロードに失敗しました' }, 
      { status: 500 }
    )
  }
} 