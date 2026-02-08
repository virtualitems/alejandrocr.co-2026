import { useState } from 'react'
import type { Message } from '../components/chat'

type UseChatbotOptions = {
	initialMessages?: Message[]
	apiUrl: string
}

type UseChatbotReturn = {
	messages: Message[]
	isLoading: boolean
	sendMessage: (message: string) => Promise<void>
}

async function streamChatResponse(
	apiUrl: string,
	message: string,
	onChunk: (chunk: string) => void
): Promise<void> {
	const formdata = new FormData()
	formdata.append('q', message)

	const response = await fetch(apiUrl, {
		method: 'POST',
		body: formdata,
	})

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`)
	}

	const reader = response.body?.getReader()
	if (!reader) {
		throw new Error('No reader available')
	}

	const decoder = new TextDecoder()

	while (true) {
		const { done, value } = await reader.read()
		if (done) break

		const chunk = decoder.decode(value, { stream: true })
		onChunk(chunk)
	}
}

export function useChatbot(options: UseChatbotOptions): UseChatbotReturn {
	const { initialMessages = [], apiUrl } = options
	const [messages, setMessages] = useState<Message[]>(initialMessages)
	const [isLoading, setIsLoading] = useState(false)

	const sendMessage = async (message: string): Promise<void> => {
		// Add user message
		const userMessage: Message = {
			id: Date.now().toString(),
			text: message,
			sender: 'user',
			timestamp: new Date()
		}

		setMessages((prev) => [...prev, userMessage])
		setIsLoading(true)

		// Create bot message placeholder
		const botMessageId = (Date.now() + 1).toString()
		const botMessage: Message = {
			id: botMessageId,
			text: '',
			sender: 'bot',
			timestamp: new Date()
		}

		setMessages((prev) => [...prev, botMessage])

		try {
			await streamChatResponse(apiUrl, message, (chunk) => {
				setMessages((prev) => {
					return prev.map((msg) => {
						if (msg.id === botMessageId) {
							return { ...msg, text: msg.text + chunk }
						}
						return msg
					})
				})
			})
		} catch (error) {
			console.error('Error sending message:', error)
			setMessages((prev) => {
				return prev.map((msg) => {
					if (msg.id === botMessageId) {
						return { ...msg, text: 'Sorry, there was an error processing your message.' }
					}
					return msg
				})
			})
		} finally {
			setIsLoading(false)
		}
	}

	return {
		messages,
		isLoading,
		sendMessage
	}
}
