import { useCallback } from 'react'

interface TokenUsage {
  inputTokens: number
  outputTokens: number
  model?: string
  conversationId?: string
}

export const useTokenRecording = () => {
  const recordTokenUsage = useCallback(async (usage: TokenUsage) => {
    try {
      const { inputTokens, outputTokens, model = 'openai/o4-mini', conversationId } = usage
      
      console.log('Recording token usage:', {
        inputTokens,
        outputTokens,
        model,
        conversationId
      })

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
        const errorData = await response.json().catch(() => ({}))
        console.error('Token recording failed:', response.status, errorData)
        return false
      }

      const result = await response.json()
      console.log('Token usage recorded successfully:', result)
      return true
    } catch (error) {
      console.error('Error recording token usage:', error)
      return false
    }
  }, [])

  return {
    recordTokenUsage
  }
} 