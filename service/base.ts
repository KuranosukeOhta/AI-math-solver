import { API_PREFIX, APP_ID, API_KEY, API_URL } from '@/config'
import Toast from '@/app/components/base/toast'
import type { AnnotationReply, MessageEnd, MessageReplace, ThoughtItem } from '@/app/components/chat/type'
import type { VisionFile } from '@/types/app'

const TIME_OUT = 100000

const ContentType = {
  json: 'application/json',
  stream: 'text/event-stream',
  form: 'application/x-www-form-urlencoded; charset=UTF-8',
  download: 'application/octet-stream', // for download
}

// DifyのAPI認証ヘッダーを追加
const getDifyAuthHeaders = () => {
  return {
    'Content-Type': ContentType.json,
    'Authorization': `Bearer ${API_KEY}`,
    'App-Id': APP_ID || '',
  }
}

const baseOptions = {
  method: 'GET',
  mode: 'cors',
  credentials: 'include', // always send cookies、HTTP Basic authentication.
  headers: new Headers({
    'Content-Type': ContentType.json,
  }),
  redirect: 'follow',
}

export type WorkflowStartedResponse = {
  task_id: string
  workflow_run_id: string
  event: string
  data: {
    id: string
    workflow_id: string
    sequence_number: number
    created_at: number
  }
}

export type WorkflowFinishedResponse = {
  task_id: string
  workflow_run_id: string
  event: string
  data: {
    id: string
    workflow_id: string
    status: string
    outputs: any
    error: string
    elapsed_time: number
    total_tokens: number
    total_steps: number
    created_at: number
    finished_at: number
  }
}

export type NodeStartedResponse = {
  task_id: string
  workflow_run_id: string
  event: string
  data: {
    id: string
    node_id: string
    node_type: string
    index: number
    predecessor_node_id?: string
    inputs: any
    created_at: number
    extras?: any
  }
}

export type NodeFinishedResponse = {
  task_id: string
  workflow_run_id: string
  event: string
  data: {
    id: string
    node_id: string
    node_type: string
    index: number
    predecessor_node_id?: string
    inputs: any
    process_data: any
    outputs: any
    status: string
    error: string
    elapsed_time: number
    execution_metadata: {
      total_tokens: number
      total_price: number
      currency: string
    }
    created_at: number
  }
}

export type IOnDataMoreInfo = {
  conversationId?: string
  taskId?: string
  messageId: string
  errorMessage?: string
  errorCode?: string
}

export type IOnData = (text: string, isFirstMessage: boolean, params: Record<string, any>) => void
export type IOnThought = (thought: any) => boolean | void
export type IOnFile = (file: any) => void
export type IOnMessageEnd = (messageEnd: any) => void
export type IOnMessageReplace = (messageReplace: any) => void
export type IOnCompleted = (hasError?: boolean) => void
export type IOnError = () => void
export type IOnWorkflowStarted = (data: Record<string, any>) => void
export type IOnNodeStarted = (data: Record<string, any>) => void
export type IOnNodeFinished = (data: Record<string, any>) => void
export type IOnWorkflowFinished = (data: Record<string, any>) => void

type IOtherOptions = {
  isPublicAPI?: boolean
  bodyStringify?: boolean
  needAllResponseContent?: boolean
  deleteContentType?: boolean
  onData?: IOnData // for stream
  onThought?: IOnThought
  onFile?: IOnFile
  onMessageEnd?: IOnMessageEnd
  onMessageReplace?: IOnMessageReplace
  onError?: IOnError
  onCompleted?: IOnCompleted // for stream
  getAbortController?: (abortController: AbortController) => void
  onWorkflowStarted?: IOnWorkflowStarted
  onWorkflowFinished?: IOnWorkflowFinished
  onNodeStarted?: IOnNodeStarted
  onNodeFinished?: IOnNodeFinished
}

function unicodeToChar(text: string) {
  return text.replace(/\\u[0-9a-f]{4}/g, (_match, p1) => {
    return String.fromCharCode(parseInt(p1, 16))
  })
}

const handleStream = (
  response: Response,
  onData: IOnData,
  onCompleted?: IOnCompleted,
  onThought?: IOnThought,
  onMessageEnd?: IOnMessageEnd,
  onMessageReplace?: IOnMessageReplace,
  onFile?: IOnFile,
  onWorkflowStarted?: IOnWorkflowStarted,
  onWorkflowFinished?: IOnWorkflowFinished,
  onNodeStarted?: IOnNodeStarted,
  onNodeFinished?: IOnNodeFinished,
) => {
  if (!response.ok)
    throw new Error('Network response was not ok')

  const reader = response.body?.getReader()
  const decoder = new TextDecoder('utf-8')
  let buffer = ''
  let bufferObj: Record<string, any>
  let isFirstMessage = true
  function read() {
    let hasError = false
    reader?.read().then((result: any) => {
      if (result.done) {
        onCompleted && onCompleted()
        return
      }
      buffer += decoder.decode(result.value, { stream: true })
      const lines = buffer.split('\n')
      try {
        lines.forEach((message) => {
          if (message.startsWith('data: ')) { // check if it starts with data:
            try {
              bufferObj = JSON.parse(message.substring(6)) as Record<string, any>// remove data: and parse as json
            }
            catch (e) {
              // mute handle message cut off
              onData('', isFirstMessage, {
                conversationId: bufferObj?.conversation_id,
                messageId: bufferObj?.message_id,
              })
              return
            }
            if (bufferObj.status === 400 || !bufferObj.event) {
              onData('', false, {
                conversationId: undefined,
                messageId: '',
                errorMessage: bufferObj?.message,
                errorCode: bufferObj?.code,
              })
              hasError = true
              onCompleted?.(true)
              return
            }
            if (bufferObj.event === 'message' || bufferObj.event === 'agent_message') {
              // can not use format here. Because message is splited.
              onData(unicodeToChar(bufferObj.answer), isFirstMessage, {
                conversationId: bufferObj.conversation_id,
                taskId: bufferObj.task_id,
                messageId: bufferObj.id,
              })
              isFirstMessage = false
            }
            else if (bufferObj.event === 'agent_thought') {
              onThought?.(bufferObj as ThoughtItem)
            }
            else if (bufferObj.event === 'message_file') {
              onFile?.(bufferObj as VisionFile)
            }
            else if (bufferObj.event === 'message_end') {
              onMessageEnd?.(bufferObj as MessageEnd)
            }
            else if (bufferObj.event === 'message_replace') {
              onMessageReplace?.(bufferObj as MessageReplace)
            }
            else if (bufferObj.event === 'workflow_started') {
              onWorkflowStarted?.(bufferObj as WorkflowStartedResponse)
            }
            else if (bufferObj.event === 'workflow_finished') {
              onWorkflowFinished?.(bufferObj as WorkflowFinishedResponse)
            }
            else if (bufferObj.event === 'node_started') {
              onNodeStarted?.(bufferObj as NodeStartedResponse)
            }
            else if (bufferObj.event === 'node_finished') {
              onNodeFinished?.(bufferObj as NodeFinishedResponse)
            }
          }
        })
        buffer = lines[lines.length - 1]
      }
      catch (e) {
        onData('', false, {
          conversationId: undefined,
          messageId: '',
          errorMessage: `${e}`,
        })
        hasError = true
        onCompleted?.(true)
        return
      }
      if (!hasError)
        read()
    })
  }
  read()
}

const baseFetch = (url: string, fetchOptions: any, { needAllResponseContent }: IOtherOptions) => {
  const options = Object.assign({}, baseOptions, fetchOptions)

  const urlPrefix = API_PREFIX

  let urlWithPrefix = `${urlPrefix}${url.startsWith('/') ? url : `/${url}`}`

  const { method, params, body } = options
  // handle query
  if (method === 'GET' && params) {
    const paramsArray: string[] = []
    Object.keys(params).forEach(key =>
      paramsArray.push(`${key}=${encodeURIComponent(params[key])}`),
    )
    if (urlWithPrefix.search(/\?/) === -1)
      urlWithPrefix += `?${paramsArray.join('&')}`

    else
      urlWithPrefix += `&${paramsArray.join('&')}`

    delete options.params
  }

  if (body)
    options.body = JSON.stringify(body)

  // Handle timeout
  return Promise.race([
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('request timeout'))
      }, TIME_OUT)
    }),
    new Promise((resolve, reject) => {
      globalThis.fetch(urlWithPrefix, options)
        .then((res: any) => {
          const resClone = res.clone()
          // Error handler
          if (!/^(2|3)\d{2}$/.test(res.status)) {
            try {
              const bodyJson = res.json()
              switch (res.status) {
                case 401: {
                  Toast.notify({ type: 'error', message: 'Invalid token' })
                  return
                }
                default:
                  // eslint-disable-next-line no-new
                  new Promise(() => {
                    bodyJson.then((data: any) => {
                      Toast.notify({ type: 'error', message: data.message })
                    })
                  })
              }
            }
            catch (e) {
              Toast.notify({ type: 'error', message: `${e}` })
            }

            return Promise.reject(resClone)
          }

          // handle delete api. Delete api not return content.
          if (res.status === 204) {
            resolve({ result: 'success' })
            return
          }

          // return data
          const data = options.headers.get('Content-type') === ContentType.download ? res.blob() : res.json()

          resolve(needAllResponseContent ? resClone : data)
        })
        .catch((err) => {
          Toast.notify({ type: 'error', message: err })
          reject(err)
        })
    }),
  ])
}

export const upload = (fetchOptions: any): Promise<any> => {
  const urlPrefix = API_PREFIX
  const urlWithPrefix = `${urlPrefix}/file-upload`
  const defaultOptions = {
    method: 'POST',
    url: `${urlWithPrefix}`,
    data: {},
  }
  const options = {
    ...defaultOptions,
    ...fetchOptions,
  }
  return new Promise((resolve, reject) => {
    const xhr = options.xhr
    xhr.open(options.method, options.url)
    for (const key in options.headers)
      xhr.setRequestHeader(key, options.headers[key])

    xhr.withCredentials = true
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            // レスポンスをJSONとしてパースを試行
            const response = JSON.parse(xhr.response)
            resolve(response)
          } catch (e) {
            // JSONパースに失敗した場合は、旧形式（string ID）として処理
            resolve({ id: xhr.response })
          }
        } else {
          reject(xhr)
        }
      }
    }
    xhr.upload.onprogress = options.onprogress
    xhr.send(options.data)
  })
}

export const ssePost = (
  url: string,
  fetchOptions: any,
  {
    onData,
    onCompleted,
    onThought,
    onFile,
    onMessageEnd,
    onMessageReplace,
    onWorkflowStarted,
    onWorkflowFinished,
    onNodeStarted,
    onNodeFinished,
    onError,
  }: IOtherOptions,
) => {
  // Dify API認証ヘッダーを追加
  const difyAuthHeaders = getDifyAuthHeaders()
  
  const options = Object.assign({}, baseOptions, {
    method: 'POST',
    headers: difyAuthHeaders,
  }, fetchOptions)

  const urlPrefix = API_PREFIX
  const urlWithPrefix = `${urlPrefix}${url.startsWith('/') ? url : `/${url}`}`

  console.log(`[DEBUG] Sending request to: ${urlWithPrefix}`)
  console.log(`[DEBUG] Request headers:`, options.headers)
  
  const { body } = options
  if (body) {
    options.body = JSON.stringify(body)
    console.log(`[DEBUG] Request body:`, body)
  }

  globalThis.fetch(urlWithPrefix, options)
    .then((res: any) => {
      console.log(`[DEBUG] Response status:`, res.status)
      
      if (!/^(2|3)\d{2}$/.test(res.status)) {
        // Clone the response for reading the error details
        const errorResponse = res.clone()
        
        // Read and log the error details
        errorResponse.text().then((text: string) => {
          console.error(`[DEBUG] Error response (Status: ${res.status}):`, text.substring(0, 500) + '...')
          try {
            const errorData = JSON.parse(text)
            Toast.notify({ type: 'error', message: errorData.message || 'Server Error' })
          } catch (e) {
            console.error(`[DEBUG] Failed to parse error response, showing truncated text`)
            Toast.notify({ type: 'error', message: `API Error (${res.status})` })
          }
        }).catch((e: any) => {
          console.error(`[DEBUG] Failed to read error response:`, e)
          Toast.notify({ type: 'error', message: `Server Error (${res.status})` })
        })
        
        onError?.()
        return
      }
      
      return handleStream(res, ((str: string, isFirstMessage: boolean, moreInfo: IOnDataMoreInfo) => {
        if (moreInfo.errorMessage) {
          console.error(`[DEBUG] Stream error:`, moreInfo.errorMessage)
          Toast.notify({ type: 'error', message: moreInfo.errorMessage })
          return
        }
        onData?.(str, isFirstMessage, moreInfo as any)
      }) as IOnData, () => {
        onCompleted?.()
      }, onThought, onMessageEnd, onMessageReplace, onFile, onWorkflowStarted, onWorkflowFinished, onNodeStarted, onNodeFinished)
    }).catch((e) => {
      console.error(`[DEBUG] Request error:`, e)
      Toast.notify({ type: 'error', message: e?.message || 'Network Error' })
      onError?.()
    })
}

export const request = (url: string, options = {}, otherOptions?: IOtherOptions) => {
  return baseFetch(url, options, otherOptions || {})
}

export const get = (url: string, { params }: { params?: Record<string, any> }) => {
  // CORSエラー回避のため、すべてのDify APIリクエストをサーバーサイドプロキシ経由に変更
  if (url.startsWith('conversations') || url.startsWith('messages') || url.startsWith('parameters')) {
    // Dify APIリクエストはサーバーサイドプロキシ経由に変更
    // /api/{dify_endpoint} 形式でサーバーサイドプロキシにリクエストする
    const apiUrl = `${window.location.origin}${API_PREFIX}/${url}`
    const queryParams = new URLSearchParams()
    
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null)
          queryParams.append(key, params[key])
      })
    }
    
    const urlWithParams = queryParams.toString() ? `${apiUrl}?${queryParams}` : apiUrl
    
    console.log(`[DEBUG] GET Request to proxy: ${urlWithParams}`)
    
    return fetch(urlWithParams, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          console.error(`[DEBUG] Error response from proxy API: ${response.status}`)
          throw new Error(`Proxy API returned ${response.status}`)
        }
        return response.json()
      })
      .catch(error => {
        console.error(`[DEBUG] Fetch error:`, error)
        throw error
      })
  } else {
    // ローカルAPIエンドポイント用（変更なし）
    const urlInstance = new URL(`${window.location.origin}${API_PREFIX}/${url}`)
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null)
          urlInstance.searchParams.append(key, params[key])
      })
    }
    
    console.log(`[DEBUG] GET Request to local API: ${urlInstance.toString()}`)
    
    return fetch(urlInstance)
      .then(response => {
        if (!response.ok) {
          console.error(`[DEBUG] Error response from local API: ${response.status}`)
          throw new Error(`Local API returned ${response.status}`)
        }
        return response.json()
      })
      .catch(error => {
        console.error(`[DEBUG] Fetch error:`, error)
        throw error
      })
  }
}

export const post = (url: string, { body }: { body: Record<string, any> }) => {
  // CORSエラー回避のため、すべてのDify APIリクエストをサーバーサイドプロキシ経由に変更
  if (url.startsWith('conversations') || url.startsWith('messages') || url.startsWith('parameters')) {
    // サーバーサイドプロキシ経由でDify APIにアクセス
    const apiUrl = `${window.location.origin}${API_PREFIX}/${url}`
    
    console.log(`[DEBUG] POST Request to proxy API: ${apiUrl}`)
    console.log(`[DEBUG] Body:`, body)
    
    return fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => {
        if (!response.ok) {
          console.error(`[DEBUG] Error response from proxy API: ${response.status}`)
          throw new Error(`Proxy API returned ${response.status}`)
        }
        return response.json()
      })
      .catch(error => {
        console.error(`[DEBUG] Fetch error:`, error)
        throw error
      })
  } else {
    // ローカルAPIエンドポイント（変更なし）
    const apiUrl = `${window.location.origin}${API_PREFIX}/${url}`
    
    console.log(`[DEBUG] POST Request to local API: ${apiUrl}`)
    console.log(`[DEBUG] Body:`, body)
    
    return fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    })
      .then(response => {
        if (!response.ok) {
          console.error(`[DEBUG] Error response from local API: ${response.status}`)
          throw new Error(`Local API returned ${response.status}`)
        }
        return response.json()
      })
      .catch(error => {
        console.error(`[DEBUG] Fetch error:`, error)
        throw error
      })
  }
}

export const put = (url: string, options = {}, otherOptions?: IOtherOptions) => {
  return request(url, Object.assign({}, options, { method: 'PUT' }), otherOptions)
}

export const del = (url: string, options = {}, otherOptions?: IOtherOptions) => {
  return request(url, Object.assign({}, options, { method: 'DELETE' }), otherOptions)
}
