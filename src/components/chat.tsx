import { useState, useRef, useEffect } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { Avatar } from './catalyst-ui-kit/avatar'
import { Button } from './catalyst-ui-kit/button'
import { Input } from './catalyst-ui-kit/input'
import './chat.css'

export type Message = {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

type ChatHeight = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'screen'

type Props = {
  user: {
    name: string
    imageUrl: string
  }
  bot: {
    name: string
    imageUrl: string
  }
  messages: Message[]
  onSendMessage: (message: string) => void
  onClear?: () => void
  height: ChatHeight
  isLoading?: boolean
}

const heightClasses = {
  sm: 'h-64',
  md: 'h-96',
  lg: 'h-[32rem]',
  xl: 'h-[40rem]',
  '2xl': 'h-[48rem]',
  full: 'h-full',
  screen: 'h-screen'
}

export function Chat(props: Props) {
  const {
    user,
    bot,
    messages,
    onSendMessage,
    onClear,
    height,
    isLoading = false
  } = props
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (inputValue.trim() === '' || isLoading) return

    const message = inputValue
    setInputValue('')
    onSendMessage(message)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <div className={`flex flex-col ${heightClasses[height]}`}>
      {/* Chat Header */}
      <div className="flex items-center gap-3 border-b border-gray-200 pb-4 dark:border-gray-700">
        <Avatar src={bot.imageUrl} className="size-10" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            {bot.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {isLoading ? 'Thinking...' : 'Online'}
          </p>
        </div>
        {onClear && (
          <button
            onClick={onClear}
            className="cursor-pointer select-none rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            title="New chat"
          >
            <PlusCircleIcon className="size-5" />
          </button>
        )}
      </div>

      {/* Messages Container */}
      <div className="chat-messages-container flex-1 overflow-y-auto py-4 space-y-4 min-h-0 pr-2">
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No messages yet. Start a conversation!
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <Avatar
              src={message.sender === 'user' ? user.imageUrl : bot.imageUrl}
              className="size-8"
            />
            <div
              className={`rounded-lg px-4 py-2 max-w-xs ${
                message.sender === 'user'
                  ? 'bg-indigo-600 text-white dark:bg-indigo-700'
                  : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex gap-2 border-t border-gray-200 pt-4 dark:border-gray-700">
        <Input
          type="text"
          placeholder={isLoading ? 'Loading...' : 'Type a message...'}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
          disabled={isLoading}
        />
        <Button
          onClick={handleSend}
          color="indigo"
          disabled={isLoading || inputValue.trim() === ''}
          className={`select-none ${
            isLoading || inputValue.trim() === ''
              ? 'cursor-not-allowed'
              : 'cursor-pointer'
          }`}
        >
          Send
        </Button>
      </div>
    </div>
  )
}
