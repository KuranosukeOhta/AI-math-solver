'use client'

import { upload } from '@/service/base'

type ImageUploadParams = {
  file: File
  onProgressCallback: (progress: number) => void
  onSuccessCallback: (res: { id: string }) => void
  onErrorCallback: () => void
}
type ImageUpload = (v: ImageUploadParams) => void
export const imageUpload: ImageUpload = ({
  file,
  onProgressCallback,
  onSuccessCallback,
  onErrorCallback,
}) => {
  const formData = new FormData()
  formData.append('file', file)
  const onProgress = (e: ProgressEvent) => {
    if (e.lengthComputable) {
      const percent = Math.floor(e.loaded / e.total * 100)
      onProgressCallback(percent)
    }
  }

  upload({
    xhr: new XMLHttpRequest(),
    data: formData,
    onprogress: onProgress,
  })
    .then((res: any) => {
      // レスポンスがJSONオブジェクトの場合とstring IDの場合の両方に対応
      let fileId: string
      if (typeof res === 'string') {
        // 旧形式: 直接IDが返される
        fileId = res
      } else if (res && typeof res === 'object' && res.id) {
        // 新形式: JSONオブジェクトが返される
        fileId = res.id
      } else {
        // JSONパースを試行
        try {
          const parsed = typeof res === 'string' ? JSON.parse(res) : res
          fileId = parsed.id || res
        } catch (e) {
          // パースに失敗した場合は元の値を使用
          fileId = res
        }
      }
      
      onSuccessCallback({ id: fileId })
    })
    .catch(() => {
      onErrorCallback()
    })
}
