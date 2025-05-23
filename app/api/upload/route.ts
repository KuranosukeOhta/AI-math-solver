import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

// 許可するファイルタイプ
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'text/markdown',
  'text/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp'
];

// 最大ファイルサイズ (15MB)
const MAX_FILE_SIZE = 15 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'ファイルが見つかりません' },
        { status: 400 }
      );
    }

    // ファイルサイズチェック
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'ファイルサイズが大きすぎます（最大15MB）' },
        { status: 400 }
      );
    }

    // ファイルタイプチェック
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: '許可されていないファイル形式です' },
        { status: 400 }
      );
    }

    // ファイル名を生成
    const fileId = uuidv4();
    const extension = file.name.split('.').pop() || '';
    const fileName = `${fileId}.${extension}`;

    // ファイルを保存
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // アップロードディレクトリ（public/uploads）
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const filePath = join(uploadDir, fileName);

    try {
      await writeFile(filePath, buffer);
    } catch (error) {
      console.error('ファイル保存エラー:', error);
      return NextResponse.json(
        { error: 'ファイルの保存に失敗しました' },
        { status: 500 }
      );
    }

    // レスポンス
    return NextResponse.json({
      success: true,
      file: {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        url: `/uploads/${fileName}`,
        uploadedId: fileId,
      }
    });

  } catch (error) {
    console.error('アップロードエラー:', error);
    return NextResponse.json(
      { error: 'ファイルアップロードに失敗しました' },
      { status: 500 }
    );
  }
} 