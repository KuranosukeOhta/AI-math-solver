'use client'

import { useCallback } from 'react'

// o4-mini料金設定（1M tokensあたりの価格、単位: USD）
// o4-mini-2025-04-16の価格を使用
const O4_MINI_PRICE = {
  'o4-mini': {
    INPUT: 1.10,   // $1.10 per 1M tokens
    OUTPUT: 4.40   // $4.40 per 1M tokens
  },
  'o4-mini-2025-04-16': {
    INPUT: 1.10,   // $1.10 per 1M tokens
    OUTPUT: 4.40   // $4.40 per 1M tokens
  },
  // デフォルト値（モデルが不明の場合）
  'default': {
    INPUT: 1.10,
    OUTPUT: 4.40,
  }
};

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
   * @param conversationId 会話ID（オプション）
   */
  const recordTokenUsage = useCallback(async (
    inputText: string,
    outputText: string,
    model: string = 'o4-mini-2025-04-16',
    conversationId?: string
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
          conversationId
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
  const estimateUsage = useCallback((inputText: string, outputText: string, model: string = 'o4-mini-2025-04-16') => {
    const inputTokens = countTokens(inputText) + 200;
    const outputTokens = countTokens(outputText);
    const totalTokens = inputTokens + outputTokens;
    
    // モデルに基づいた価格設定を取得
    const modelPricing = O4_MINI_PRICE[model as keyof typeof O4_MINI_PRICE] || O4_MINI_PRICE.default;
    
    // コストの計算（USD）
    const inputCost = (inputTokens / 1000000) * modelPricing.INPUT;
    const outputCost = (outputTokens / 1000000) * modelPricing.OUTPUT;
    const cost = inputCost + outputCost;
    
    return {
      inputTokens,
      outputTokens,
      totalTokens,
      cost
    }
  }, [countTokens])

  return { recordTokenUsage, estimateUsage, countTokens }
} 