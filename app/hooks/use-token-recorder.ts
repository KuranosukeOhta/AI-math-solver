'use client'

import { useCallback } from 'react'

// OpenAI APIの料金（1000トークンあたりの価格、単位: USD）
// 2024年8月時点の情報。変更された場合は更新が必要
const TOKEN_PRICE = {
  INPUT: 0.5 / 1000,  // $0.5 per 1M tokens for input
  OUTPUT: 1.5 / 1000,  // $1.5 per 1M tokens for output
}

/**
 * トークン使用量を記録するためのフック
 */
export const useTokenRecorder = () => {
  /**
   * 簡易的なトークン数計算（実際のトークナイズとは異なる場合があります）
   */
  const countTokens = useCallback((text: string) => {
    // 簡易的な計算: 英語の場合は約4文字で1トークン、日本語や中国語は1文字で1トークン程度
    const englishTokens = (text.match(/[a-zA-Z0-9]+/g) || []).join('').length / 4;
    const nonEnglishTokens = (text.match(/[^\x00-\x7F]+/g) || []).join('').length;
    return Math.ceil(englishTokens + nonEnglishTokens);
  }, [])

  /**
   * トークン使用量を記録する
   * @param inputText 入力テキスト
   * @param outputText 出力テキスト
   * @param model 使用したモデル名
   */
  const recordTokenUsage = useCallback(async (
    inputText: string,
    outputText: string,
    model: string = 'gpt-4'
  ) => {
    try {
      // トークン数を計算
      const inputTokens = countTokens(inputText) + 200; // システムプロンプト等の追加トークン
      const outputTokens = countTokens(outputText);

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
  }, [countTokens])

  /**
   * 予測されるトークン使用量とコストを計算する
   */
  const estimateUsage = useCallback((inputText: string, outputText: string) => {
    const inputTokens = countTokens(inputText) + 200;
    const outputTokens = countTokens(outputText);
    const totalTokens = inputTokens + outputTokens;
    
    // コストの計算（USD）
    const cost = (inputTokens * TOKEN_PRICE.INPUT) + (outputTokens * TOKEN_PRICE.OUTPUT);
    
    return {
      inputTokens,
      outputTokens,
      totalTokens,
      cost
    }
  }, [countTokens])

  return { recordTokenUsage, estimateUsage, countTokens }
} 