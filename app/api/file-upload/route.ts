import type { NextRequest } from 'next/server'
import { API_KEY, API_URL } from '@/config'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return new Response('ファイルが選択されていません', { status: 400 })
    }

    // DifyのファイルアップロードAPIエンドポイント
    const difyUploadUrl = `${API_URL || 'https://api.dify.ai/v1'}/files/upload`
    
    // Difyにファイルをアップロード
    const uploadFormData = new FormData()
    uploadFormData.append('file', file)

    const response = await fetch(difyUploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: uploadFormData,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Difyファイルアップロードエラー:', response.status, errorText)
      return new Response('ファイルアップロードに失敗しました', { status: response.status })
    }

    const result = await response.json()
    
    // Difyから返されたファイル情報をクライアントに返す
    return new Response(JSON.stringify({
      id: result.id,
      name: result.name,
      size: result.size,
      extension: result.extension,
      mime_type: result.mime_type,
      created_by: result.created_by,
      created_at: result.created_at
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  catch (e: unknown) {
    console.error('ファイルアップロード処理中にエラーが発生:', e)
    const errorMessage = e instanceof Error ? e.message : 'ファイルアップロードで不明なエラーが発生しました'
    return new Response(errorMessage, { status: 500 })
  }
}
