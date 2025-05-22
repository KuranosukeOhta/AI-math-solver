'use client'

import { useCallback } from 'react'

/**
 * トークン使用量を記録するためのフック
 */
export const useTokenRecorder = () => {
  /**
   * トークン使用量を記録する
   * @param inputTokens 入力トークン数
   * @param outputTokens 出力トークン数
   * @param model 使用したモデル名
   */
  const recordTokenUsage = useCallback(async (
    inputTokens: number,
    outputTokens: number,
    model: string = 'gpt-4'
  ) => {
    try {
      const response = await fetch('/api/token/record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputTokens,
          outputTokens,
          model,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        console.error('トークン使用量記録エラー:', data.message)
        return false
      }

      return true
    } catch (error) {
      console.error('トークン使用量記録中にエラーが発生しました:', error)
      return false
    }
  }, [])

  return { recordTokenUsage }
} 