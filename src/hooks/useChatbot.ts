import { useState, useEffect, useCallback } from 'react'
import type { Message } from '../components/chat'

type UseChatbotOptions = {
	baseUrl: string
	sessionId?: string
}

type UseChatbotReturn = {
	messages: Message[]
	isLoading: boolean
	sendMessage: (message: string) => Promise<void>
	clearMessages: () => Promise<void>
	refreshMessages: () => Promise<void>
}

type ApiMessage = {
	type: 'human' | 'ai'
	content: string
}

type HistoryResponse = {
	data: ApiMessage[]
}

async function fetchHistory(baseUrl: string, sessionId: string): Promise<Message[]> {
	const response = await fetch(`${baseUrl}/chatbot/history`, {
		headers: {
			'X-Session-Id': sessionId
		}
	})

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`)
	}

	const json: HistoryResponse = await response.json()

	return json.data.map((msg, index) => ({
		id: `${index}-${Date.now()}`,
		text: msg.content,
		sender: msg.type === 'human' ? 'user' as const : 'bot' as const,
		timestamp: new Date()
	}))
}

async function streamChatResponse(
	apiUrl: string,
	message: string,
	sessionId: string,
	onChunk: (chunk: string) => void
): Promise<void> {
	const formdata = new FormData()
	formdata.append('q', message)

	const response = await fetch(apiUrl, {
		method: 'POST',
		body: formdata,
		headers: {
			'X-Session-Id': sessionId
		}
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
	const { baseUrl, sessionId = 'default' } = options
	const [messages, setMessages] = useState<Message[]>([])
	const [isLoading, setIsLoading] = useState(false)

	const refreshMessages = useCallback(async () => {
		try {
			const history = await fetchHistory(baseUrl, sessionId)
			setMessages(history)
		} catch (error) {
			console.error('Error fetching history:', error)
		}
	}, [baseUrl, sessionId])

	useEffect(() => {
		refreshMessages()
	}, [refreshMessages])

	const sendMessage = async (message: string): Promise<void> => {
		setIsLoading(true)

		// Add user message optimistically
		const userMessage: Message = {
			id: Date.now().toString(),
			text: message,
			sender: 'user',
			timestamp: new Date()
		}

		setMessages(prev => [...prev, userMessage])

		// Add bot message placeholder
		const botMessageId = (Date.now() + 1).toString()
		const botMessage: Message = {
			id: botMessageId,
			text: '',
			sender: 'bot',
			timestamp: new Date()
		}

		setMessages(prev => [...prev, botMessage])

		try {
			let accumulatedText = ''
			const apiUrl = `${baseUrl}/chatbot/text-to-text`

			await streamChatResponse(apiUrl, message, sessionId, (chunk) => {
				accumulatedText += chunk
				setMessages(prev =>
					prev.map(msg =>
						msg.id === botMessageId
							? { ...msg, text: accumulatedText }
							: msg
					)
				)
			})

			// Refresh from server after streaming completes
			await refreshMessages()
		} catch (error) {
			console.error('Error sending message:', error)
			setMessages(prev =>
				prev.map(msg =>
					msg.id === botMessageId
						? { ...msg, text: 'Sorry, there was an error processing your message.' }
						: msg
				)
			)
		} finally {
			setIsLoading(false)
		}
	}

	const clearMessages = async (): Promise<void> => {
		try {
			const clearUrl = `${baseUrl}/chatbot/clear-history`

			const response = await fetch(clearUrl, {
				method: 'POST',
				headers: {
					'X-Session-Id': sessionId
				}
			})

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}

			// Refresh messages from server after clearing
			await refreshMessages()
		} catch (error) {
			console.error('Error clearing chat history:', error)
		}
	}

	return {
		messages,
		isLoading,
		sendMessage,
		clearMessages,
		refreshMessages
	}
}
