import { useState, useRef, useEffect } from 'react'
import { X, Send, Bot, User, Sparkles } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function AiChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Dobrý deň! Som AI asistent IT-DK.sk. Ako vám môžem pomôcť s otázkami o našich službách?',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          history: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      const data = await response.json()
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.response },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Prepáčte, nastala chyba. Skúste to znova alebo nás kontaktujte telefonicky na +421 911 085 838.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-600 to-purple-600 px-5 py-4 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 ${
          isOpen ? 'hidden' : ''
        }`}
      >
        <Sparkles className="h-5 w-5" />
        <span className="font-semibold">AI Asistent</span>
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200 overflow-hidden flex flex-col max-h-[600px]">
          {/* Header */}
          <div className="bg-gradient-primary px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/20 p-2">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">AI Asistent</h3>
                <p className="text-xs text-primary-200">IT-DK.sk</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 min-h-[300px]">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`flex-shrink-0 rounded-full p-2 ${
                    message.role === 'user'
                      ? 'bg-primary-100'
                      : 'bg-purple-100'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="h-4 w-4 text-primary-600" />
                  ) : (
                    <Bot className="h-4 w-4 text-purple-600" />
                  )}
                </div>
                <div
                  className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-primary-600 text-white rounded-br-md'
                      : 'bg-white text-gray-700 shadow-sm ring-1 ring-gray-100 rounded-bl-md'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 rounded-full bg-purple-100 p-2">
                  <Bot className="h-4 w-4 text-purple-600" />
                </div>
                <div className="rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm ring-1 ring-gray-100">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Napíšte správu..."
                className="flex-1 rounded-xl border-gray-200 px-4 py-3 text-sm focus:border-primary-500 focus:ring-primary-500 transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="rounded-xl bg-primary-600 px-4 py-3 text-white hover:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
