import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { prompt, size = '1024x1024', quality = 'standard', provider = 'openai' } = await req.json()

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    if (provider === 'openai') {
      // Generate image using OpenAI DALL-E 3
      const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: size as '1024x1024' | '1024x1792' | '1792x1024',
        quality: quality as 'standard' | 'hd',
      })

      const imageUrl = response.data?.[0]?.url

      if (!imageUrl) {
        return NextResponse.json(
          { error: 'Failed to generate image' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        imageUrl,
        provider: 'openai',
        model: 'dall-e-3',
        prompt,
      })
    } else if (provider === 'azure') {
      // Use Azure OpenAI for image generation
      const azureOpenAI = new OpenAI({
        apiKey: process.env.AZURE_COGNITIVE_SERVICES_KEY,
        baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/dall-e-3`,
        defaultQuery: { 'api-version': '2024-02-01' },
        defaultHeaders: { 'api-key': process.env.AZURE_COGNITIVE_SERVICES_KEY },
      })

      const response = await azureOpenAI.images.generate({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: size as '1024x1024' | '1024x1792' | '1792x1024',
        quality: quality as 'standard' | 'hd',
      })

      const imageUrl = response.data?.[0]?.url

      if (!imageUrl) {
        return NextResponse.json(
          { error: 'Failed to generate image' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        imageUrl,
        provider: 'azure',
        model: 'dall-e-3',
        prompt,
      })
    }

    return NextResponse.json(
      { error: 'Invalid provider specified' },
      { status: 400 }
    )
  } catch (error: any) {
    console.error('Image generation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate image' },
      { status: 500 }
    )
  }
}
