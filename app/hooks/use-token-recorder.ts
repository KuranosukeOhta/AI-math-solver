'use client'

import { useCallback } from 'react'

// OpenAI APIの料金（1000トークンあたりの価格、単位: USD）
// 2024年8月時点の情報。変更された場合は更新が必要
const TOKEN_PRICE = {
  'gpt-4': {
    INPUT: 0.01, // $10 per 1M tokens for input
    OUTPUT: 0.03, // $30 per 1M tokens for output
  },
  'gpt-3.5-turbo': {
    INPUT: 0.0005, // $0.5 per 1M tokens for input
    OUTPUT: 0.0015, // $1.5 per 1M tokens for output
  },
  // デフォルト値（モデルが不明の場合）
  'default': {
    INPUT: 0.01,
    OUTPUT: 0.03,
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
    model: string = 'gpt-4',
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
  const estimateUsage = useCallback((inputText: string, outputText: string, model: string = 'gpt-4') => {
    const inputTokens = countTokens(inputText) + 200;
    const outputTokens = countTokens(outputText);
    const totalTokens = inputTokens + outputTokens;
    
    // モデルに基づいた価格設定を取得
    const modelPricing = TOKEN_PRICE[model as keyof typeof TOKEN_PRICE] || TOKEN_PRICE.default;
    
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