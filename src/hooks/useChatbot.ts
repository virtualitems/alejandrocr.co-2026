import type { Message } from '../components/chat'
import { useChatStore } from '../stores/chatStore'

type UseChatbotOptions = {
	apiUrl: string
}

type UseChatbotReturn = {
	messages: Message[]
	isLoading: boolean
	sendMessage: (message: string) => Promise<void>
	clearMessages: () => void
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
	const { apiUrl } = options
	const { messages, isLoading, addMessage, updateMessage, setLoading, clearMessages } = useChatStore()

	const sendMessage = async (message: string): Promise<void> => {
		// Add user message
		const userMessage: Message = {
			id: Date.now().toString(),
			text: message,
			sender: 'user',
			timestamp: new Date()
		}

		addMessage(userMessage)
		setLoading(true)

		// Create bot message placeholder
		const botMessageId = (Date.now() + 1).toString()
		const botMessage: Message = {
			id: botMessageId,
			text: '',
			sender: 'bot',
			timestamp: new Date()
		}

		addMessage(botMessage)

		try {
			let accumulatedText = ''
			await streamChatResponse(apiUrl, message, (chunk) => {
				accumulatedText += chunk
				updateMessage(botMessageId, accumulatedText)
			})
		} catch (error) {
			console.error('Error sending message:', error)
			updateMessage(botMessageId, 'Sorry, there was an error processing your message.')
		} finally {
			setLoading(false)
		}
	}

	return {
		messages,
		isLoading,
		sendMessage,
		clearMessages
	}
}
