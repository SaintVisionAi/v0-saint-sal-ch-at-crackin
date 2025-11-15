'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Loader2, Image as ImageIcon, MessageSquare, FileText, CreditCard } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [imagePrompt, setImagePrompt] = useState('')
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [imageLoading, setImageLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState<'claude' | 'gpt' | 'azure-gpt5'>('claude')

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const newMessage: Message = { role: 'user', content: input }
    setMessages((prev) => [...prev, newMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, newMessage],
          model: selectedModel,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.message },
        ])
      } else {
        console.error('Chat error:', data.error)
      }
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) return

    setImageLoading(true)
    setGeneratedImage(null)

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: imagePrompt,
          size: '1024x1024',
          quality: 'hd',
          provider: 'openai',
        }),
      })

      const data = await response.json()

      if (data.success) {
        setGeneratedImage(data.imageUrl)
      } else {
        console.error('Image generation error:', data.error)
      }
    } catch (error) {
      console.error('Failed to generate image:', error)
    } finally {
      setImageLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">
            SaintVision AI Agent
          </h1>
          <p className="text-gray-300 text-lg">
            Powerful AI with Image Generation, Chat, and Business Automation
          </p>
        </div>

        <Tabs defaultValue="chat" className="w-full max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50 backdrop-blur">
            <TabsTrigger value="chat" className="data-[state=active]:bg-purple-600">
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="image" className="data-[state=active]:bg-purple-600">
              <ImageIcon className="w-4 h-4 mr-2" />
              Image Gen
            </TabsTrigger>
            <TabsTrigger value="forms" className="data-[state=active]:bg-purple-600">
              <FileText className="w-4 h-4 mr-2" />
              Forms
            </TabsTrigger>
            <TabsTrigger value="payments" className="data-[state=active]:bg-purple-600">
              <CreditCard className="w-4 h-4 mr-2" />
              Payments
            </TabsTrigger>
          </TabsList>

          {/* Chat Tab */}
          <TabsContent value="chat" className="mt-6">
            <div className="bg-gray-800/50 backdrop-blur rounded-lg p-6 shadow-2xl">
              <div className="mb-4">
                <label className="text-white text-sm mb-2 block">Select AI Model</label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value as any)}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2"
                >
                  <option value="claude">Claude 3.5 Sonnet (Anthropic)</option>
                  <option value="gpt">GPT-4 Turbo (OpenAI)</option>
                  <option value="azure-gpt5">GPT-5 Core (Azure)</option>
                </select>
              </div>

              <div className="h-96 overflow-y-auto mb-4 space-y-4 bg-gray-900/50 rounded-lg p-4">
                {messages.length === 0 && (
                  <div className="text-center text-gray-400 py-20">
                    Start a conversation with your AI agent
                  </div>
                )}
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xl rounded-lg px-4 py-3 ${
                        msg.role === 'user'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-700 text-gray-100'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-700 rounded-lg px-4 py-3">
                      <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  placeholder="Type your message... (Shift+Enter for new line)"
                  className="flex-1 bg-gray-700 text-white border-gray-600"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={loading || !input.trim()}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send'}
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Image Generation Tab */}
          <TabsContent value="image" className="mt-6">
            <div className="bg-gray-800/50 backdrop-blur rounded-lg p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-4">AI Image Generation</h2>
              <p className="text-gray-300 mb-6">
                Powered by DALL-E 3 - Generate high-quality images from text descriptions
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-white text-sm mb-2 block">
                    Image Description
                  </label>
                  <Textarea
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    placeholder="Describe the image you want to generate..."
                    className="bg-gray-700 text-white border-gray-600"
                    rows={4}
                  />
                </div>

                <Button
                  onClick={handleGenerateImage}
                  disabled={imageLoading || !imagePrompt.trim()}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {imageLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-5 h-5 mr-2" />
                      Generate Image
                    </>
                  )}
                </Button>

                {generatedImage && (
                  <div className="mt-6">
                    <h3 className="text-white text-lg mb-3">Generated Image:</h3>
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={generatedImage}
                        alt="Generated image"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <Button
                      onClick={() => window.open(generatedImage, '_blank')}
                      className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                    >
                      Download Image
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Forms Tab */}
          <TabsContent value="forms" className="mt-6">
            <div className="bg-gray-800/50 backdrop-blur rounded-lg p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-4">Business Forms</h2>
              <p className="text-gray-300 mb-6">
                Integrated forms for all your business needs
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={() => window.location.href = '/forms/credit-pull'}
                  className="bg-green-600 hover:bg-green-700 h-auto py-6 flex-col"
                >
                  <CreditCard className="w-8 h-8 mb-2" />
                  <span className="text-lg">Credit Pull Application</span>
                  <span className="text-sm opacity-80">Check credit scores</span>
                </Button>

                <Button
                  onClick={() => window.location.href = '/forms/investment'}
                  className="bg-blue-600 hover:bg-blue-700 h-auto py-6 flex-col"
                >
                  <FileText className="w-8 h-8 mb-2" />
                  <span className="text-lg">Investment Offering</span>
                  <span className="text-sm opacity-80">Investment intake form</span>
                </Button>

                <Button
                  onClick={() => window.location.href = '/forms/merchant-services'}
                  className="bg-purple-600 hover:bg-purple-700 h-auto py-6 flex-col"
                >
                  <CreditCard className="w-8 h-8 mb-2" />
                  <span className="text-lg">Merchant Services</span>
                  <span className="text-sm opacity-80">Payment processing & payroll</span>
                </Button>

                <Button
                  onClick={() => window.location.href = '/forms/tech-intake'}
                  className="bg-orange-600 hover:bg-orange-700 h-auto py-6 flex-col"
                >
                  <FileText className="w-8 h-8 mb-2" />
                  <span className="text-lg">Tech Development</span>
                  <span className="text-sm opacity-80">Project intake form</span>
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="mt-6">
            <div className="bg-gray-800/50 backdrop-blur rounded-lg p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-4">Payment Processing</h2>
              <p className="text-gray-300 mb-6">
                Secure payment integration powered by Stripe
              </p>
              <div className="text-center py-20">
                <CreditCard className="w-16 h-16 mx-auto text-purple-400 mb-4" />
                <p className="text-gray-400">Payment integration coming soon...</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
