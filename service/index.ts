import type { IOnCompleted, IOnData, IOnError, IOnFile, IOnMessageEnd, IOnMessageReplace, IOnNodeFinished, IOnNodeStarted, IOnThought, IOnWorkflowFinished, IOnWorkflowStarted } from './base'
import { get, post, ssePost } from './base'
import type { Feedbacktype } from '@/types/app'
import { v4 as uuidv4 } from 'uuid'
import { APP_ID } from '@/config'

export const sendChatMessage = async (
  body: Record<string, any>,
  {
    onData,
    onCompleted,
    onThought,
    onFile,
    onError,
    getAbortController,
    onMessageEnd,
    onMessageReplace,
    onWorkflowStarted,
    onNodeStarted,
    onNodeFinished,
    onWorkflowFinished,
  }: {
    onData: IOnData
    onCompleted: IOnCompleted
    onFile: IOnFile
    onThought: IOnThought
    onMessageEnd: IOnMessageEnd
    onMessageReplace: IOnMessageReplace
    onError: IOnError
    getAbortController?: (abortController: AbortController) => void
    onWorkflowStarted: IOnWorkflowStarted
    onNodeStarted: IOnNodeStarted
    onNodeFinished: IOnNodeFinished
    onWorkflowFinished: IOnWorkflowFinished
  },
) => {
  const enhancedBody = {
    inputs: {},
    ...body,
    response_mode: 'streaming',
    user: body.user || `user_${APP_ID}:${uuidv4()}`,
  }
  
  console.log('[DEBUG] Enhanced Dify API request body:', enhancedBody)
  
  return ssePost('chat-messages', {
    body: enhancedBody,
  }, { onData, onCompleted, onThought, onFile, onError, getAbortController, onMessageEnd, onMessageReplace, onNodeStarted, onWorkflowStarted, onWorkflowFinished, onNodeFinished })
}

export const fetchConversations = async () => {
  try {
    const response = await get('conversations', { params: { limit: 100, first_id: '' } })
    console.log('[DEBUG] Conversations response:', response)
    return response
  } catch (error) {
    console.error('[DEBUG] Error fetching conversations:', error)
    throw error
  }
}

export const fetchChatList = async (conversationId: string) => {
  try {
    const response = await get('messages', { params: { conversation_id: conversationId, limit: 20, last_id: '' } })
    console.log('[DEBUG] Chat list response:', response)
    return response
  } catch (error) {
    console.error('[DEBUG] Error fetching chat list:', error)
    throw error
  }
}

// init value. wait for server update
export const fetchAppParams = async () => {
  try {
    const response = await get('parameters', { params: {} })
    console.log('[DEBUG] App parameters response:', response)
    return response
  } catch (error) {
    console.error('[DEBUG] Error fetching app parameters:', error)
    throw error
  }
}

export const updateFeedback = async ({ url, body }: { url: string; body: Feedbacktype }) => {
  try {
    const response = await post(url, { body })
    console.log('[DEBUG] Feedback update response:', response)
    return response
  } catch (error) {
    console.error('[DEBUG] Error updating feedback:', error)
    throw error
  }
}

export const generationConversationName = async (id: string) => {
  try {
    const response = await post(`conversations/${id}/name`, { body: { auto_generate: true } })
    console.log('[DEBUG] Generation conversation name response:', response)
    return response
  } catch (error) {
    console.error('[DEBUG] Error generating conversation name:', error)
    throw error
  }
}
