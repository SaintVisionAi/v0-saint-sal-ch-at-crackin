import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import OpenAI from 'openai'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { messages, model = 'claude', systemPrompt } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      )
    }

    if (model === 'claude' || model === 'anthropic') {
      // Use Claude API
      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4096,
        system: systemPrompt || 'You are a helpful AI assistant with capabilities to help with coding, image generation, business automation, and more.',
        messages: messages.map((msg: any) => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content,
        })),
      })

      const content = response.content[0]
      const text = content.type === 'text' ? content.text : ''

      return NextResponse.json({
        success: true,
        message: text,
        model: 'claude-3-5-sonnet',
        provider: 'anthropic',
      })
    } else if (model === 'gpt' || model === 'openai') {
      // Use GPT API
      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: systemPrompt || 'You are a helpful AI assistant with capabilities to help with coding, image generation, business automation, and more.',
          },
          ...messages,
        ],
        max_tokens: 4096,
      })

      const message = response.choices[0]?.message?.content || ''

      return NextResponse.json({
        success: true,
        message,
        model: 'gpt-4-turbo',
        provider: 'openai',
      })
    } else if (model === 'azure-gpt5') {
      // Use Azure GPT-5 deployment
      const azureOpenAI = new OpenAI({
        apiKey: process.env.AZURE_COGNITIVE_SERVICES_KEY,
        baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_DEPLOYMENT_GPT5_CORE}`,
        defaultQuery: { 'api-version': '2024-02-01' },
        defaultHeaders: { 'api-key': process.env.AZURE_COGNITIVE_SERVICES_KEY },
      })

      const response = await azureOpenAI.chat.completions.create({
        model: process.env.AZURE_DEPLOYMENT_GPT5_CORE || 'gpt-5-core',
        messages: [
          {
            role: 'system',
            content: systemPrompt || 'You are a helpful AI assistant.',
          },
          ...messages,
        ],
        max_tokens: 4096,
      })

      const message = response.choices[0]?.message?.content || ''

      return NextResponse.json({
        success: true,
        message,
        model: 'gpt-5-core',
        provider: 'azure',
      })
    }

    return NextResponse.json(
      { error: 'Invalid model specified' },
      { status: 400 }
    )
  } catch (error: any) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process chat request' },
      { status: 500 }
    )
  }
}
