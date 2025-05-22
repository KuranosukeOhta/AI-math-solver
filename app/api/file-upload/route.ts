import { type NextRequest } from 'next/server'
import { client, getInfo } from '@/app/api/utils/common'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const { user } = getInfo(request)
    formData.append('user', user)
    const res = await client.fileUpload(formData)
    return new Response(res.data.id as string)
  }
  catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred'
    return new Response(errorMessage)
  }
}
