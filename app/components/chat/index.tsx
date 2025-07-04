'use client'
import type { FC } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import s from './style.module.css'
import Answer from './answer'
import Question from './question'
import type { FeedbackFunc } from './type'
import type { ChatItem, VisionFile, VisionSettings } from '@/types/app'
import { TransferMethod } from '@/types/app'
import type { FileEntity, FileUpload } from '@/app/components/base/file-uploader-in-attachment/types'
import Toast from '@/app/components/base/toast'
import ChatImageUploader from '@/app/components/base/image-uploader/chat-image-uploader'
import ImageList from '@/app/components/base/image-uploader/image-list'
import FileUploaderInAttachmentWrapper from '@/app/components/base/file-uploader-in-attachment'
import { useImageFiles } from '@/app/components/base/image-uploader/hooks'
import { useFile } from '@/app/components/base/file-uploader-in-attachment/hooks'
import { useTokenRecorder } from '@/app/hooks/use-token-recorder'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SendIcon, PaperclipIcon, ImageIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// エラーメッセージの定数
const ERROR_MESSAGES = {
  NETWORK: 'ネットワークエラーが発生しました。接続を確認してください。',
  SERVER: 'サーバーエラーが発生しました。しばらく経ってからお試しください。',
  UNAUTHORIZED: '認証エラーが発生しました。',
  UNKNOWN: '予期せぬエラーが発生しました。'
}

export type IChatProps = {
  chatList: ChatItem[]
  /**
   * Whether to display the editing area and rating status
   */
  feedbackDisabled?: boolean
  /**
   * Whether to display the input area
   */
  isHideSendInput?: boolean
  onFeedback?: FeedbackFunc
  checkCanSend?: () => boolean
  onSend?: (message: string, files: VisionFile[], documents?: FileEntity[]) => void
  useCurrentUserAvatar?: boolean
  isResponding?: boolean
  controlClearQuery?: number
  visionConfig?: VisionSettings
  fileConfig?: FileUpload
}

const Chat: FC<IChatProps> = ({
  chatList,
  feedbackDisabled = false,
  isHideSendInput = false,
  onFeedback,
  checkCanSend,
  onSend = () => { },
  useCurrentUserAvatar,
  isResponding,
  controlClearQuery,
  visionConfig,
  fileConfig,
}) => {
  const { t } = useTranslation()
  const { notify } = Toast
  const isUseInputMethod = useRef(false)
  const { recordTokenUsage } = useTokenRecorder()

  const [query, setQuery] = React.useState('')
  const [documents, setDocuments] = useState<FileEntity[]>([])
  const [showImageUploader, setShowImageUploader] = useState(true)
  const [showFileUploader, setShowFileUploader] = useState(false)

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setQuery(value)
  }

  const logError = (message: string) => {
    notify({ type: 'error', message, duration: 3000 })
  }

  const valid = () => {
    if (!query || query.trim() === '') {
      logError('メッセージを入力してください')
      return false
    }
    return true
  }

  // 最後の応答が来たときにトークン使用量を記録
  useEffect(() => {
    // 応答が完了したときに実行（最後のメッセージが応答で、応答中ではない場合）
    if (chatList.length >= 2 && !isResponding) {
      const lastItem = chatList[chatList.length - 1]
      const secondLastItem = chatList[chatList.length - 2]

      if (lastItem.isAnswer && !secondLastItem.isAnswer) {
        // 最後のユーザーの質問と応答のペアでトークン使用量を記録
        recordTokenUsage(
          secondLastItem.content,
          lastItem.content,
          'gpt-4' // デフォルトモデル
        ).catch(err => {
          console.error('トークン記録エラー:', err)
        })
      }
    }
  }, [chatList, isResponding, recordTokenUsage])

  useEffect(() => {
    if (controlClearQuery) {
      setQuery('')
      setDocuments([])
    }
  }, [controlClearQuery])

  const {
    files,
    onUpload,
    onRemove,
    onReUpload,
    onImageLinkLoadError,
    onImageLinkLoadSuccess,
    onClear,
  } = useImageFiles()

  const handleSend = () => {
    if (!valid() || (checkCanSend && !checkCanSend()))
      return

    const visionFiles = files.filter(file => file.progress !== -1).map(fileItem => ({
      type: 'image',
      transfer_method: fileItem.type,
      url: fileItem.url,
      upload_file_id: fileItem.fileId,
    }))

    onSend(query, visionFiles, documents)

    if (!files.find(item => item.type === TransferMethod.local_file && !item.fileId)) {
      if (files.length)
        onClear()
      setDocuments([])
      if (!isResponding)
        setQuery('')
    }
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === 'Enter') {
      e.preventDefault()
      // prevent send message when using input method enter
      if (!e.shiftKey && !isUseInputMethod.current)
        handleSend()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    isUseInputMethod.current = e.nativeEvent.isComposing
    if (e.code === 'Enter' && !e.shiftKey) {
      setQuery(query.replace(/\n$/, ''))
      e.preventDefault()
    }
  }

  // デフォルトのファイル設定
  const defaultFileConfig: FileUpload = {
    enabled: true,
    allowed_file_types: ['pdf', 'doc', 'docx', 'txt', 'md', 'csv', 'xlsx'],
    allowed_file_extensions: ['.pdf', '.doc', '.docx', '.txt', '.md', '.csv', '.xlsx'],
    allowed_file_upload_methods: [TransferMethod.local_file, TransferMethod.remote_url],
    number_limits: 5,
    fileUploadConfig: {
      batch_count_limit: 5,
      file_size_limit: 15 * 1024 * 1024, // 15MB
    }
  }

  const effectiveFileConfig = fileConfig || defaultFileConfig

  // ファイルアップロード用フック（ドラッグ&ドロップとコピペ対応）
  const {
    handleLocalFileUpload,
    handleClipboardPasteFile,
    isDragActive,
    handleDragFileEnter,
    handleDragFileOver,
    handleDragFileLeave,
    handleDropFile,
  } = useFile(effectiveFileConfig)

  return (
    <div className={cn(!feedbackDisabled && 'px-3.5', 'h-full')}>
      {/* Chat List */}
      <div className="h-full space-y-[30px] pb-24">
        {chatList.map((item) => {
          if (item.isAnswer) {
            const isLast = item.id === chatList[chatList.length - 1].id
            return <Answer
              key={item.id}
              item={item}
              feedbackDisabled={feedbackDisabled}
              onFeedback={onFeedback}
              isResponding={isResponding && isLast}
            />
          }
          return (
            <Question
              key={item.id}
              id={item.id}
              content={item.content}
              useCurrentUserAvatar={useCurrentUserAvatar}
              imgSrcs={(item.message_files && item.message_files?.length > 0) ? item.message_files.map(item => item.url) : []}
            />
          )
        })}
      </div>
      {
        !isHideSendInput && (
          <div className={cn(!feedbackDisabled && '!left-3.5 !right-3.5', 'fixed z-10 bottom-6 left-0 right-0 max-w-7xl mx-auto px-4')}>
            <Card className="border shadow-md p-2"
              onDragEnter={handleDragFileEnter}
              onDragOver={handleDragFileOver}
              onDragLeave={handleDragFileLeave}
              onDrop={handleDropFile}
            >
              {/* ドラッグ&ドロップオーバーレイ */}
              {isDragActive && (
                <div className="absolute inset-0 bg-blue-50/80 border-2 border-dashed border-blue-500 rounded-lg flex items-center justify-center z-10">
                  <div className="text-blue-600 text-center">
                    <PaperclipIcon className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">ファイルをドロップしてアップロード</p>
                  </div>
                </div>
              )}

              {/* Attachment Section */}
              <div className="mb-2 flex items-center space-x-2">
                {/* Image Upload Toggle */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={showImageUploader ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setShowImageUploader(!showImageUploader)
                          if (showFileUploader) setShowFileUploader(false)
                        }}
                      >
                        <ImageIcon className="h-4 w-4" />
                        画像
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>画像をアップロード</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* File Upload Toggle */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={showFileUploader ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setShowFileUploader(!showFileUploader)
                          if (showImageUploader) setShowImageUploader(false)
                        }}
                      >
                        <PaperclipIcon className="h-4 w-4" />
                        ファイル
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>文書ファイルをアップロード（D&D・コピペ対応）</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Active files count */}
                {(files.length > 0 || documents.length > 0) && (
                  <Badge variant="secondary">
                    {files.length + documents.length} ファイル
                  </Badge>
                )}
              </div>

              {/* Image Upload Section */}
              {showImageUploader && visionConfig?.enabled && (
                <div className="mb-2 flex items-center">
                  <ChatImageUploader
                    settings={visionConfig}
                    onUpload={onUpload}
                    disabled={files.length >= visionConfig.number_limits}
                  />
                  <div className="mx-2 w-[1px] h-4 bg-border" />
                  <ImageList
                    list={files}
                    onRemove={onRemove}
                    onReUpload={onReUpload}
                    onImageLinkLoadError={onImageLinkLoadError}
                    onImageLinkLoadSuccess={onImageLinkLoadSuccess}
                  />
                </div>
              )}

              {/* File Upload Section */}
              {showFileUploader && effectiveFileConfig.enabled && (
                <div className="mb-2">
                  <FileUploaderInAttachmentWrapper
                    value={documents}
                    onChange={setDocuments}
                    fileConfig={effectiveFileConfig}
                  />
                </div>
              )}

              {/* Text Input Section */}
              <div className="flex items-end space-x-2">
                <Textarea
                  className="min-h-[40px] max-h-[200px] resize-none"
                  placeholder="メッセージを入力してください...（ファイルのドラッグ&ドロップ、コピペも可能）"
                  value={query}
                  onChange={handleContentChange}
                  onKeyUp={handleKeyUp}
                  onKeyDown={handleKeyDown}
                  onPaste={handleClipboardPasteFile}
                />
                <Button
                  onClick={handleSend}
                  disabled={isResponding || !query.trim()}
                  size="icon"
                >
                  <SendIcon className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        )
      }
    </div>
  )
}

export default React.memo(Chat)
